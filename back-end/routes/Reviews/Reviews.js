import { Router } from 'express';
import { authenticateToken } from '../../middleware/auth.js';
import { addReview } from '../../controllers/Reviews/Reviews.js';
const router = Router();

router.post('/add-review', authenticateToken, addReview);

export default router;
