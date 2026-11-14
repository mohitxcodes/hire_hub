import mongoose from 'mongoose';

const jobAlertSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    location: String,
    jobType: String,
    minSalary: Number,
    frequency: {
      type: String,
      enum: ['daily', 'weekly'],
      default: 'daily',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobAlert = mongoose.model('JobAlert', jobAlertSchema);
export default JobAlert;

