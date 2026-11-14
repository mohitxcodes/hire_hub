import express from 'express';
import {
  getCompanies,
  getCompanyById,
  getMyCompany,
  updateCompanyProfile,
} from '../controllers/companyController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCompanies);
router.get('/me/profile', protect, authorize('recruiter'), getMyCompany);
router.get('/:id', getCompanyById);
router.post('/', protect, authorize('recruiter', 'admin'), updateCompanyProfile);

export default router;

