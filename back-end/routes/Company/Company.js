import { Router } from 'express';
import { authenticateToken } from '../../middleware/auth.js';
import Company from '../../models/Company.js';
const router = Router();

router.get('/company-details', authenticateToken, async (req, res) => {
  try {
    const companyId = req.user.userId;
    const { companyDetails } = await Company.findById(companyId).select(
      'companyDetails'
    );

    res.status(200).json({
      success: true,
      message: 'Successfully fetched company details',
      companyDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Could not get company details',
    });
  }
});

export default router;
