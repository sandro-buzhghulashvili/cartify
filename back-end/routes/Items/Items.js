import { Router } from 'express';
import { authenticateToken } from '../../middleware/auth.js';
import {
  getAllItems,
  getItemCategories,
} from '../../controllers/Items/Items.js';
const router = Router();

router.get('/all-items', authenticateToken, getAllItems);
router.get('/item-categories', authenticateToken, getItemCategories);

export default router;
