import Client from '../../models/Client.js';
import Company from '../../models/Company.js';
import Review from '../../models/Review.js';
import Product from '../../models/Product.js';
import ReviewFeedback from '../../models/ReviewFeedback.js';

import { validateReview } from './validate.js';

export const rateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { feedback } = req.body;

    if (!(feedback === 'like' || feedback === 'dislike')) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect feedback' });
    }

    const existingFeedback = await ReviewFeedback.findOne({
      reviewId,
      userId: req.user.userId,
    });

    if (existingFeedback) {
      if (existingFeedback.feedback !== feedback) {
        // updating feedback to a new type

        await ReviewFeedback.findByIdAndUpdate(existingFeedback._id, {
          feedback,
        });

        // updating review's likes or dislikes count

        const existingReview = await Review.findById(reviewId);

        const update = {};

        if (existingFeedback.feedback === 'like' && feedback === 'dislike') {
          update.likes = Math.max(0, existingReview.likes - 1);
          update.dislikes = (existingReview.dislikes || 0) + 1;
        } else if (
          existingFeedback.feedback === 'dislike' &&
          feedback === 'like'
        ) {
          update.likes = (existingReview.likes || 0) + 1;
          update.dislikes = Math.max(0, existingReview.dislikes - 1);
        }

        if (Object.keys(update).length > 0) {
          await Review.findByIdAndUpdate(reviewId, { $set: update });
        }

        return res.status(200).json({
          message: 'Successfully updated your feedback.',
          success: true,
        });
      }

      return res.status(200).json({
        message: 'You already gave this feedback.',
        success: true,
      });
    }

    const reviewFeeback = new ReviewFeedback({
      reviewId,
      userId: req.user.userId,
      feedback,
    });

    await reviewFeeback.save();

    await Review.findByIdAndUpdate(reviewId, {
      $inc: { [feedback === 'like' ? 'likes' : 'dislikes']: 1 },
    });

    res
      .status(200)
      .json({ message: 'Successfully rated the review', success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Could not rate a review' });
  }
};

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

export const getReviews = async (req, res) => {
  try {
    const { username, userId } = req.query;
    const productId = req.query.productId;
    const page = Math.max(1, Number(req.query.page) || 1);
    const itemsPerPage = Math.max(1, Number(req.query.itemsPerPage) || 10);

    let [reviews, totalReviews] = await Promise.all([
      Review.find({ productId: productId })
        .sort({ 'userDetails.reviewedAt': -1 })
        .limit(itemsPerPage * page),
      Review.countDocuments({ productId: productId }),
    ]);

    if (username && userId) {
      reviews = await Promise.all(
        reviews.map(async (review) => {
          const foundFeedback = await ReviewFeedback.findOne({
            reviewId: review._id,
            userId,
          });

          if (foundFeedback) {
            return {
              ...review._doc,
              [foundFeedback.feedback === 'like' ? 'liked' : 'disliked']: true,
            };
          } else {
            return review;
          }
        })
      );
    }

    res.status(200).json({
      message: 'Successfully fetched reviews',
      success: true,
      reviews,
      totalPages: Math.ceil(totalReviews / itemsPerPage),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || 'Could not fetch reviews',
      success: false,
    });
  }
};
