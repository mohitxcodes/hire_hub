import Application from '../models/Application.js';
import Job from '../models/Job.js';
import Notification from '../models/Notification.js';

// @desc    Apply for a job
// @route   POST /api/applications/:jobId
// @access  Private (Jobseeker)
export const applyForJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { coverLetter, resumeUrl } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    if (job.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'This job posting is no longer accepting applications',
      });
    }

    // Check if user already applied
    const existing = await Application.findOne({
      job: jobId,
      candidate: req.user.id,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job',
      });
    }

    // Use attached resumeUrl or user's saved resume
    const finalResume = resumeUrl || (req.user.resume && req.user.resume.url);
    if (!finalResume) {
      return res.status(400).json({
        success: false,
        message: 'Please provide or upload a resume to apply',
      });
    }

    // Calculate match score based on candidate skills vs job requirements
    let matchScore = 70;
    if (job.skills && job.skills.length > 0 && req.user.skills && req.user.skills.length > 0) {
      const jobSkillsLower = job.skills.map((s) => s.toLowerCase());
      const userSkillsLower = req.user.skills.map((s) => s.toLowerCase());
      const common = userSkillsLower.filter((s) => jobSkillsLower.includes(s));
      const ratio = common.length / Math.max(1, jobSkillsLower.length);
      matchScore = Math.round(60 + ratio * 38);
    }

    const application = await Application.create({
      job: jobId,
      candidate: req.user.id,
      recruiter: job.recruiter,
      company: job.company,
      resumeUrl: finalResume,
      coverLetter: coverLetter || '',
      status: 'Applied',
      matchScore: Math.min(99, Math.max(60, matchScore)),
      statusHistory: [
        {
          status: 'Applied',
          note: 'Application submitted successfully',
          updatedBy: req.user.id,
          updatedAt: new Date(),
        },
      ],
    });

    // Increment applicantsCount on Job
    job.applicantsCount += 1;
    await job.save();

    // Send notification to Recruiter
    await Notification.create({
      recipient: job.recruiter,
      sender: req.user.id,
      title: 'New Job Application',
      message: `${req.user.name} applied for "${job.title}"`,
      type: 'application',
      link: `/recruiter/applicants/${application._id}`,
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      application,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get candidate's applications
// @route   GET /api/applications/my-applications
// @access  Private (Jobseeker)
export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ candidate: req.user.id })
      .populate({
        path: 'job',
        populate: { path: 'company', select: 'name logo location industry' },
      })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get applicants for a specific job
// @route   GET /api/applications/job/:jobId
// @access  Private (Recruiter / Admin)
export const getJobApplicants = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { status, skill } = req.query;

    const query = { job: jobId };
    if (status) query.status = status;

    const applications = await Application.find(query)
      .populate('candidate', 'name email avatar title phone skills location experience education resume')
      .populate('job', 'title location jobType')
      .sort('-createdAt');

    // Filter by candidate skill in-memory if requested
    let filtered = applications;
    if (skill) {
      filtered = applications.filter((app) =>
        app.candidate?.skills?.some((s) => s.toLowerCase().includes(skill.toLowerCase()))
      );
    }

    res.status(200).json({
      success: true,
      count: filtered.length,
      applications: filtered,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all applicants for current recruiter
// @route   GET /api/applications/recruiter/all
// @access  Private (Recruiter)
export const getAllRecruiterApplicants = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const query = { recruiter: req.user.id };
    if (status) query.status = status;

    const applications = await Application.find(query)
      .populate('candidate', 'name email avatar title phone skills location resume')
      .populate('job', 'title location jobType')
      .sort('-createdAt');

    let result = applications;
    if (search) {
      result = applications.filter((app) => {
        const candidateName = app.candidate?.name?.toLowerCase() || '';
        const jobTitle = app.job?.title?.toLowerCase() || '';
        return candidateName.includes(search.toLowerCase()) || jobTitle.includes(search.toLowerCase());
      });
    }

    res.status(200).json({
      success: true,
      count: result.length,
      applications: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private (Recruiter / Admin)
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status, note, interviewDate, interviewMeetingLink, feedback } = req.body;

    const application = await Application.findById(req.params.id)
      .populate('job', 'title')
      .populate('candidate', 'name email');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    application.status = status;
    if (interviewDate) application.interviewDate = interviewDate;
    if (interviewMeetingLink) application.interviewMeetingLink = interviewMeetingLink;
    if (feedback) application.feedback = feedback;

    application.statusHistory.push({
      status,
      note: note || `Status updated to ${status}`,
      updatedBy: req.user.id,
      updatedAt: new Date(),
    });

    await application.save();

    // Notify candidate
    await Notification.create({
      recipient: application.candidate._id,
      sender: req.user.id,
      title: 'Application Status Update',
      message: `Your application status for "${application.job.title}" has been updated to "${status}"`,
      type: 'status_change',
      link: `/seeker/applications`,
    });

    res.status(200).json({
      success: true,
      message: `Application marked as ${status}`,
      application,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Withdraw application
// @route   DELETE /api/applications/:id
// @access  Private (Jobseeker)
export const withdrawApplication = async (req, res, next) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      candidate: req.user.id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    await Application.findByIdAndDelete(req.params.id);

    // Decrement applicants count on Job
    await Job.findByIdAndUpdate(application.job, { $inc: { applicantsCount: -1 } });

    res.status(200).json({
      success: true,
      message: 'Application withdrawn successfully',
    });
  } catch (error) {
    next(error);
  }
};

