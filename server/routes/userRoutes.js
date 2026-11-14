import express from 'express';
import {
  getProfile,
  updateProfile,
  uploadAvatar,
  uploadResume,
  changePassword,
  getSavedJobs,
  toggleSaveJob,
  getJobAlerts,
  createJobAlert,
  deleteJobAlert,
  getRecommendedJobs,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/upload-avatar', upload.single('avatar'), uploadAvatar);
router.post('/upload-resume', upload.single('resume'), uploadResume);
router.put('/change-password', changePassword);

// Saved jobs
router.get('/saved-jobs', getSavedJobs);
router.post('/saved-jobs/:jobId', toggleSaveJob);

// Job alerts
router.get('/job-alerts', getJobAlerts);
router.post('/job-alerts', createJobAlert);
router.delete('/job-alerts/:id', deleteJobAlert);

// AI recommendations
router.get('/recommended-jobs', getRecommendedJobs);

export default router;

