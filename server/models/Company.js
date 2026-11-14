import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide company name'],
      trim: true,
      unique: true,
    },
    logo: {
      type: String,
      default: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=200&q=80',
    },
    website: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide company description'],
    },
    industry: {
      type: String,
      required: [true, 'Please specify industry'],
    },
    location: {
      type: String,
      required: [true, 'Please specify headquarters location'],
    },
    companySize: {
      type: String,
      enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
      default: '11-50',
    },
    foundedYear: {
      type: Number,
    },
    socialLinks: {
      linkedin: String,
      twitter: String,
      facebook: String,
      github: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'approved',
    },
    verified: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    reviewsCount: {
      type: Number,
      default: 12,
    },
  },
  {
    timestamps: true,
  }
);

companySchema.index({ name: 'text', industry: 'text', location: 'text' });

const Company = mongoose.model('Company', companySchema);
export default Company;

