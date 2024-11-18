import { Router } from 'express';
import { addCompanyDetails } from '../../controllers/Wizards/companyWizards.js';
import upload from '../../utils/multer.js';
import { authenticateToken } from '../../middleware/auth.js';
import { addProduct } from '../../controllers/Wizards/productWizards.js';

const router = Router();

router.post(
  '/fill-company-profile',
  authenticateToken,
  upload.single('logo'),
  addCompanyDetails
);

router.post(
  '/add-product',
  authenticateToken,
  upload.array('files'),
  addProduct
);

export default router;
