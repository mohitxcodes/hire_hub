import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide job title'],
      trim: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide job description'],
    },
    responsibilities: [
      {
        type: String,
      },
    ],
    requirements: [
      {
        type: String,
      },
    ],
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship'],
      default: 'full-time',
    },
    workplaceType: {
      type: String,
      enum: ['remote', 'on-site', 'hybrid'],
      default: 'remote',
    },
    experienceLevel: {
      type: String,
      enum: ['entry', 'mid', 'senior', 'lead', 'executive'],
      default: 'mid',
    },
    industry: {
      type: String,
      required: [true, 'Please specify industry'],
    },
    location: {
      type: String,
      required: [true, 'Please specify location'],
    },
    salaryMin: {
      type: Number,
      required: [true, 'Please specify minimum salary'],
    },
    salaryMax: {
      type: Number,
      required: [true, 'Please specify maximum salary'],
    },
    salaryCurrency: {
      type: String,
      default: 'USD',
    },
    isSalaryNegotiable: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'paused', 'closed'],
      default: 'active',
    },
    views: {
      type: Number,
      default: 0,
    },
    applicantsCount: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    urgent: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  },
  {
    timestamps: true,
  }
);

jobSchema.index({
  title: 'text',
  description: 'text',
  skills: 'text',
  location: 'text',
});

const Job = mongoose.model('Job', jobSchema);
export default Job;

