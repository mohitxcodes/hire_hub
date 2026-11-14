import express from 'express';
import {
  getAdminDashboardStats,
  getAllUsers,
  updateUserStatus,
  getAllJobsAdmin,
  deleteJobAdmin,
  getAllCompaniesAdmin,
  updateCompanyStatus,
  getReports,
  updateReportStatus,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getAdminDashboardStats);
router.get('/users', getAllUsers);
router.put('/users/:id/status', updateUserStatus);
router.get('/jobs', getAllJobsAdmin);
router.delete('/jobs/:id', deleteJobAdmin);
router.get('/companies', getAllCompaniesAdmin);
router.put('/companies/:id/status', updateCompanyStatus);
router.get('/reports', getReports);
router.put('/reports/:id', updateReportStatus);

export default router;

