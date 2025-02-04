import Client from '../../models/Client.js';
import Company from '../../models/Company.js';
import Review from '../../models/Review.js';
import Product from '../../models/Product.js';

import { validateReview } from './validate.js';

export const addReview = async (req, res) => {
  try {
    const clientExists = await Client.findById(req.user.userId);
    const companyExists = await Company.findById(req.user.userId);
    const productExists = await Product.findById(req.body.productId);

    const reviewIsValid = validateReview(req.body);
    const user = clientExists || companyExists;

    if (!user) {
      return res
        .status(400)
        .json({ message: 'User does not exist', success: false });
    }
    if (!productExists) {
      return res
        .status(400)
        .json({ message: 'Product does not exist', success: false });
    }

    if (!reviewIsValid.success) {
      return res
        .status(400)
        .json({ message: reviewIsValid.errors.join(', '), success: false });
    }

    const newReview = new Review({
      review: req.body.reviewBody,
      rating: {
        count: 1,
        average: req.body.rating,
      },
      userDetails: {
        name: user.username || user.companyName,
        reviewedAt: req.body.reviewedAt,
        userLogo: user.profileLogo || user.companyDetails.logo || '',
      },
      productId: req.body.productId,
    });

    await newReview.save();

    res
      .status(200)
      .json({ message: 'Review added successfully', success: true, newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not add a review', success: false });
  }
};
