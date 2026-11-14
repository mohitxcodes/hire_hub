import Job from '../models/Job.js';
import Company from '../models/Company.js';
import Application from '../models/Application.js';

// @desc    Get all jobs with search and advanced filters
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req, res, next) => {
  try {
    const {
      keyword,
      location,
      jobType,
      workplaceType,
      experienceLevel,
      industry,
      minSalary,
      maxSalary,
      skills,
      datePosted,
      sort = 'newest',
      page = 1,
      limit = 10,
    } = req.query;

    const query = { status: 'active' };

    // Search keyword
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { skills: { $in: [new RegExp(keyword, 'i')] } },
      ];
    }

    // Location
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Job Type (array or single)
    if (jobType) {
      const types = jobType.split(',');
      query.jobType = { $in: types };
    }

    // Workplace Type
    if (workplaceType) {
      const workplaces = workplaceType.split(',');
      query.workplaceType = { $in: workplaces };
    }

    // Experience Level
    if (experienceLevel) {
      const levels = experienceLevel.split(',');
      query.experienceLevel = { $in: levels };
    }

    // Industry
    if (industry) {
      query.industry = { $regex: industry, $options: 'i' };
    }

    // Salary Range
    if (minSalary) {
      query.salaryMax = { $gte: Number(minSalary) };
    }
    if (maxSalary) {
      query.salaryMin = { $lte: Number(maxSalary) };
    }

    // Skills
    if (skills) {
      const skillArr = skills.split(',').map((s) => s.trim());
      query.skills = { $in: skillArr.map((s) => new RegExp(s, 'i')) };
    }

    // Date Posted filter
    if (datePosted) {
      const now = new Date();
      let days = 30;
      if (datePosted === '24h') days = 1;
      else if (datePosted === '7d') days = 7;
      else if (datePosted === '14d') days = 14;
      else if (datePosted === '30d') days = 30;

      query.createdAt = { $gte: new Date(now - days * 24 * 60 * 60 * 1000) };
    }

    // Sorting
    let sortOptions = { createdAt: -1 };
    if (sort === 'salary-high') sortOptions = { salaryMax: -1 };
    if (sort === 'salary-low') sortOptions = { salaryMin: 1 };
    if (sort === 'popular') sortOptions = { applicantsCount: -1, views: -1 };
    if (sort === 'oldest') sortOptions = { createdAt: 1 };

    // Pagination
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const total = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .populate('company', 'name logo location industry rating')
      .populate('recruiter', 'name email avatar')
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company')
      .populate('recruiter', 'name email avatar');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found',
      });
    }

    // Increment view count
    job.views += 1;
    await job.save();

    // Fetch related jobs from same industry
    const relatedJobs = await Job.find({
      _id: { $ne: job._id },
      industry: job.industry,
      status: 'active',
    })
      .populate('company', 'name logo location')
      .limit(4);

    res.status(200).json({
      success: true,
      job,
      relatedJobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new job posting
// @route   POST /api/jobs
// @access  Private (Recruiter)
export const createJob = async (req, res, next) => {
  try {
    let companyId = req.body.company;

    // If recruiter doesn't specify company, use the one linked to their account
    if (!companyId) {
      const company = await Company.findOne({ user: req.user.id });
      if (!company) {
        return res.status(400).json({
          success: false,
          message: 'Please complete your company profile before posting a job',
        });
      }
      companyId = company._id;
    }

    const jobData = {
      ...req.body,
      company: companyId,
      recruiter: req.user.id,
    };

    const job = await Job.create(jobData);
    await job.populate('company');

    res.status(201).json({
      success: true,
      message: 'Job posted successfully!',
      job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update job posting
// @route   PUT /api/jobs/:id
// @access  Private (Recruiter / Admin)
export const updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found',
      });
    }

    // Make sure user is recruiter of this job or admin
    if (job.recruiter.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this job',
      });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('company');

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete job posting
// @route   DELETE /api/jobs/:id
// @access  Private (Recruiter / Admin)
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found',
      });
    }

    if (job.recruiter.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this job',
      });
    }

    await Job.findByIdAndDelete(req.params.id);
    // Delete all applications for this job
    await Application.deleteMany({ job: req.params.id });

    res.status(200).json({
      success: true,
      message: 'Job posting deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recruiter's posted jobs
// @route   GET /api/jobs/recruiter/my-jobs
// @access  Private (Recruiter)
export const getRecruiterJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ recruiter: req.user.id })
      .populate('company')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured jobs
// @route   GET /api/jobs/featured
// @access  Public
export const getFeaturedJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ status: 'active' })
      .populate('company')
      .sort({ featured: -1, createdAt: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get job statistics & categories
// @route   GET /api/jobs/stats/overview
// @access  Public
export const getJobStats = async (req, res, next) => {
  try {
    const totalJobs = await Job.countDocuments({ status: 'active' });
    const totalCompanies = await Company.countDocuments();
    const totalApplications = await Application.countDocuments();

    // Aggregate category counts
    const categories = await Job.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$industry', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalJobs,
        totalCompanies,
        totalApplications,
      },
      categories: categories.map((c) => ({ name: c._id, count: c.count })),
    });
  } catch (error) {
    next(error);
  }
};

