import { Router } from 'express';
import {
  getCompanyProducts,
  getProductTypes,
  updateProduct,
} from '../../controllers/Products/productsController.js';
import { authenticateToken } from '../../middleware/auth.js';
import upload from '../../utils/multer.js';
const router = Router();

router.get('/product-types', authenticateToken, getProductTypes);
router.get('/company-products', authenticateToken, getCompanyProducts);
router.put(
  '/update-product',
  authenticateToken,
  upload.array('files'),
  updateProduct
);

export default router;
