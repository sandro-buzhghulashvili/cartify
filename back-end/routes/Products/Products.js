import { Router } from 'express';
import {
  deleteProduct,
  getCategories,
  getCompanyProducts,
  getProductTypes,
  updateProduct,
} from '../../controllers/Products/productsController.js';
import { authenticateToken } from '../../middleware/auth.js';
import upload from '../../utils/multer.js';
const router = Router();

router.get('/product-types', getProductTypes);
router.get('/company-products', authenticateToken, getCompanyProducts);
router.get('/get-categories', getCategories);
router.put(
  '/update-product',
  authenticateToken,
  upload.array('files'),
  updateProduct
);
router.delete('/delete-product/:productId', authenticateToken, deleteProduct);

export default router;
