import Company from '../models/Company.js';
import Job from '../models/Job.js';

// @desc    Get all companies with search and filters
// @route   GET /api/companies
// @access  Public
export const getCompanies = async (req, res, next) => {
  try {
    const { search, industry, location, page = 1, limit = 9 } = req.query;
    const query = { status: 'approved' };

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (industry) {
      query.industry = { $regex: industry, $options: 'i' };
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 9;
    const skip = (pageNum - 1) * limitNum;

    const total = await Company.countDocuments(query);
    const companies = await Company.find(query).skip(skip).limit(limitNum);

    // Get open jobs count for each company
    const enhancedCompanies = await Promise.all(
      companies.map(async (comp) => {
        const openJobsCount = await Job.countDocuments({ company: comp._id, status: 'active' });
        return {
          ...comp.toObject(),
          openJobsCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: enhancedCompanies.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      companies: enhancedCompanies,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get company by ID with its jobs
// @route   GET /api/companies/:id
// @access  Public
export const getCompanyById = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found',
      });
    }

    const jobs = await Job.find({ company: company._id, status: 'active' }).sort('-createdAt');

    res.status(200).json({
      success: true,
      company,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in recruiter's company
// @route   GET /api/companies/me/profile
// @access  Private (Recruiter)
export const getMyCompany = async (req, res, next) => {
  try {
    const company = await Company.findOne({ user: req.user.id });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'No company profile found for this recruiter',
      });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update recruiter's company profile
// @route   POST /api/companies
// @access  Private (Recruiter)
export const updateCompanyProfile = async (req, res, next) => {
  try {
    let company = await Company.findOne({ user: req.user.id });

    if (company) {
      company = await Company.findByIdAndUpdate(company._id, req.body, {
        new: true,
        runValidators: true,
      });
    } else {
      company = await Company.create({
        ...req.body,
        user: req.user.id,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Company profile saved successfully',
      company,
    });
  } catch (error) {
    next(error);
  }
};

