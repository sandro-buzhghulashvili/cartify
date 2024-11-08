import { Router } from 'express';
import { getProductTypes } from '../../controllers/Products/productsController.js';
import { authenticateToken } from '../../middleware/auth.js';
const router = Router();

router.get('/product-types', authenticateToken, getProductTypes);

export default router;
