import User from '../models/User.js';
import Job from '../models/Job.js';
import Company from '../models/Company.js';
import Application from '../models/Application.js';
import Report from '../models/Report.js';

// @desc    Get admin dashboard platform analytics
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
export const getAdminDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobSeekers = await User.countDocuments({ role: 'jobseeker' });
    const totalRecruiters = await User.countDocuments({ role: 'recruiter' });
    const totalJobs = await Job.countDocuments();
    const activeJobs = await Job.countDocuments({ status: 'active' });
    const totalCompanies = await Company.countDocuments();
    const pendingCompanies = await Company.countDocuments({ status: 'pending' });
    const totalApplications = await Application.countDocuments();
    const pendingReports = await Report.countDocuments({ status: 'pending' });

    // Status breakdown
    const applicationStatusCounts = await Application.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Monthly signups mock/aggregated for charts
    const monthlyStats = [
      { month: 'Jan', users: 65, jobs: 28, applications: 120 },
      { month: 'Feb', users: 85, jobs: 45, applications: 190 },
      { month: 'Mar', users: 120, jobs: 60, applications: 280 },
      { month: 'Apr', users: 160, jobs: 82, applications: 390 },
      { month: 'May', users: 210, jobs: 110, applications: 540 },
      { month: 'Jun', users: 280, jobs: 145, applications: 720 },
    ];

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalJobSeekers,
        totalRecruiters,
        totalJobs,
        activeJobs,
        totalCompanies,
        pendingCompanies,
        totalApplications,
        pendingReports,
      },
      applicationStatusCounts,
      monthlyStats,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
export const getAllUsers = async (req, res, next) => {
  try {
    const { role, status, search, page = 1, limit = 10 } = req.query;
    const query = {};

    if (role) query.role = role;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const total = await User.countDocuments(query);
    const users = await User.find(query).skip(skip).limit(limitNum).sort('-createdAt');

    res.status(200).json({
      success: true,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user status (active / suspended)
// @route   PUT /api/admin/users/:id/status
// @access  Private (Admin)
export const updateUserStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: `User status updated to ${status}`,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all jobs for admin management
// @route   GET /api/admin/jobs
// @access  Private (Admin)
export const getAllJobsAdmin = async (req, res, next) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    const query = {};

    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const total = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .populate('company', 'name logo')
      .populate('recruiter', 'name email')
      .skip(skip)
      .limit(limitNum)
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete job (Admin action on inappropriate/fake job)
// @route   DELETE /api/admin/jobs/:id
// @access  Private (Admin)
export const deleteJobAdmin = async (req, res, next) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    await Application.deleteMany({ job: req.params.id });

    res.status(200).json({
      success: true,
      message: 'Job removed by administrator',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get companies for admin review
// @route   GET /api/admin/companies
// @access  Private (Admin)
export const getAllCompaniesAdmin = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const query = {};
    if (status) query.status = status;
    if (search) query.name = { $regex: search, $options: 'i' };

    const companies = await Company.find(query).populate('user', 'name email').sort('-createdAt');

    res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve or reject company
// @route   PUT /api/admin/companies/:id/status
// @access  Private (Admin)
export const updateCompanyStatus = async (req, res, next) => {
  try {
    const { status, verified } = req.body;
    const update = {};
    if (status) update.status = status;
    if (typeof verified === 'boolean') update.verified = verified;

    const company = await Company.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: `Company status updated to ${status || 'updated'}`,
      company,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get platform reports
// @route   GET /api/admin/reports
// @access  Private (Admin)
export const getReports = async (req, res, next) => {
  try {
    const reports = await Report.find().populate('reporter', 'name email').sort('-createdAt');
    res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update report status
// @route   PUT /api/admin/reports/:id
// @access  Private (Admin)
export const updateReportStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const report = await Report.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.status(200).json({
      success: true,
      message: `Report marked as ${status}`,
      report,
    });
  } catch (error) {
    next(error);
  }
};

