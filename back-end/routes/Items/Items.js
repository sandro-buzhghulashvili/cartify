import { Router } from 'express';
import {
  getAllItems,
  getItemCategories,
} from '../../controllers/Items/Items.js';
const router = Router();

router.get('/all-items', getAllItems);
router.get('/item-categories', getItemCategories);

export default router;
