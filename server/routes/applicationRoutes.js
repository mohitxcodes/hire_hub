import express from 'express';
import {
  applyForJob,
  getMyApplications,
  getJobApplicants,
  getAllRecruiterApplicants,
  updateApplicationStatus,
  withdrawApplication,
} from '../controllers/applicationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/:jobId', authorize('jobseeker'), applyForJob);
router.get('/my-applications', authorize('jobseeker'), getMyApplications);
router.get('/job/:jobId', authorize('recruiter', 'admin'), getJobApplicants);
router.get('/recruiter/all', authorize('recruiter', 'admin'), getAllRecruiterApplicants);
router.put('/:id/status', authorize('recruiter', 'admin'), updateApplicationStatus);
router.delete('/:id', authorize('jobseeker'), withdrawApplication);

export default router;

