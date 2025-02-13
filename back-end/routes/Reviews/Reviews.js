import { Router } from 'express';
import { authenticateToken } from '../../middleware/auth.js';
import {
  addReview,
  getReviews,
  rateReview,
  removeFeeback,
} from '../../controllers/Reviews/Reviews.js';
const router = Router();

router.get('/get-reviews', getReviews);
router.delete('/remove-feedback', authenticateToken, removeFeeback);
router.post('/rate-review/:reviewId', authenticateToken, rateReview);
router.post('/add-review', authenticateToken, addReview);

export default router;
