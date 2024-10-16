import { Router } from 'express';
import { addCompanyDetails } from '../../controllers/Wizards/companyWizards.js';
import upload from '../../utils/multer.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = Router();

router.post(
  '/fill-company-profile',
  authenticateToken,
  upload.single('logo'),
  addCompanyDetails
);

export default router;
