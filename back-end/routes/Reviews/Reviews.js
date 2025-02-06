import { Router } from 'express';
import { authenticateToken } from '../../middleware/auth.js';
import {
  addReview,
  getReviews,
  rateReview,
} from '../../controllers/Reviews/Reviews.js';
const router = Router();

router.get('/get-reviews', getReviews);
router.delete('/remove-feedback', authenticateToken, async (req, res) => {
  try {
    res.json('remove feedback route works');
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Could not remove feedback', success: false });
  }
});
router.post('/rate-review/:reviewId', authenticateToken, rateReview);
router.post('/add-review', authenticateToken, addReview);

export default router;
