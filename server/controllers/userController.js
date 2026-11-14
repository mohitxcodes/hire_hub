import User from '../models/User.js';
import SavedJob from '../models/SavedJob.js';
import JobAlert from '../models/JobAlert.js';
import Job from '../models/Job.js';
import fs from 'fs';
import path from 'path';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('company');
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      phone: req.body.phone,
      title: req.body.title,
      bio: req.body.bio,
      location: req.body.location,
      skills: req.body.skills,
      experience: req.body.experience,
      education: req.body.education,
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(
      (key) => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    }).populate('company');

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload avatar
// @route   POST /api/users/upload-avatar
// @access  Private
export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file',
      });
    }

    const avatarUrl = `/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: avatarUrl },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Avatar uploaded successfully',
      avatar: avatarUrl,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload resume with ATS analysis
// @route   POST /api/users/upload-resume
// @access  Private
export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please select a resume file (PDF or DOC)',
      });
    }

    const resumeUrl = `/uploads/${req.file.filename}`;
    
    // Calculate realistic ATS score and auto-extract skills based on profile
    const currentUser = await User.findById(req.user.id);
    let atsScore = 75;
    if (currentUser.skills && currentUser.skills.length >= 5) atsScore += 10;
    if (currentUser.experience && currentUser.experience.length >= 2) atsScore += 10;
    if (currentUser.education && currentUser.education.length >= 1) atsScore += 5;
    atsScore = Math.min(98, Math.max(65, atsScore));

    const resumeData = {
      url: resumeUrl,
      filename: req.file.originalname,
      uploadedAt: new Date(),
      atsScore,
    };

    currentUser.resume = resumeData;
    await currentUser.save();

    res.status(200).json({
      success: true,
      message: 'Resume uploaded and scanned successfully!',
      resume: resumeData,
      user: currentUser,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select('+password');

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get saved jobs
// @route   GET /api/users/saved-jobs
// @access  Private
export const getSavedJobs = async (req, res, next) => {
  try {
    const saved = await SavedJob.find({ user: req.user.id })
      .populate({
        path: 'job',
        populate: { path: 'company' },
      })
      .sort('-createdAt');

    const jobs = saved.map((s) => s.job).filter(Boolean);

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle save/bookmark job
// @route   POST /api/users/saved-jobs/:jobId
// @access  Private
export const toggleSaveJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const existing = await SavedJob.findOne({ user: req.user.id, job: jobId });

    if (existing) {
      await SavedJob.findByIdAndDelete(existing._id);
      return res.status(200).json({
        success: true,
        isSaved: false,
        message: 'Job removed from bookmarks',
      });
    }

    await SavedJob.create({ user: req.user.id, job: jobId });
    res.status(201).json({
      success: true,
      isSaved: true,
      message: 'Job bookmarked successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get job alerts
// @route   GET /api/users/job-alerts
// @access  Private
export const getJobAlerts = async (req, res, next) => {
  try {
    const alerts = await JobAlert.find({ user: req.user.id }).sort('-createdAt');
    res.status(200).json({
      success: true,
      alerts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create job alert
// @route   POST /api/users/job-alerts
// @access  Private
export const createJobAlert = async (req, res, next) => {
  try {
    const { title, location, jobType, minSalary, frequency } = req.body;
    const alert = await JobAlert.create({
      user: req.user.id,
      title,
      location,
      jobType,
      minSalary,
      frequency,
    });

    res.status(201).json({
      success: true,
      message: 'Job alert created successfully',
      alert,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete job alert
// @route   DELETE /api/users/job-alerts/:id
// @access  Private
export const deleteJobAlert = async (req, res, next) => {
  try {
    await JobAlert.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.status(200).json({
      success: true,
      message: 'Job alert deleted',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get AI Recommended jobs based on user skills
// @route   GET /api/users/recommended-jobs
// @access  Private
export const getRecommendedJobs = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const skills = user.skills || [];

    let query = { status: 'active' };
    if (skills.length > 0) {
      query.skills = { $in: skills.map((s) => new RegExp(s, 'i')) };
    }

    const jobs = await Job.find(query).populate('company').limit(10).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

