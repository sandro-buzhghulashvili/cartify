import { Router } from 'express';
import { authenticateToken } from '../../middleware/auth.js';
import {
  getCompanyDetails,
  getPopularCompanies,
} from '../../controllers/Company/companyController.js';
const router = Router();

router.get('/company-details', authenticateToken, getCompanyDetails);
router.get('/popular-companies', getPopularCompanies);

export default router;
