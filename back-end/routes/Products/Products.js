import { Router } from 'express';
import {
  getCompanyProducts,
  getProductTypes,
} from '../../controllers/Products/productsController.js';
import { authenticateToken } from '../../middleware/auth.js';
const router = Router();

router.get('/product-types', authenticateToken, getProductTypes);
router.get('/company-products', authenticateToken, getCompanyProducts);

export default router;
