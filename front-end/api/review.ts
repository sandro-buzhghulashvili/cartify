import { MutationFunction } from 'react-query';
import { axiosInstance } from './axiosInstance';
import { errorHandler } from '@/utils/errorHandler';

export const addReview: MutationFunction<
  any,
  {
    rating: number;
    reviewBody: string;
    productId: string;
  }
> = async ({ rating, reviewBody, productId }) => {
  try {
    const reviewData = {
      rating,
      reviewBody,
      productId,
      reviewedAt: new Date(),
    };
    const res = await axiosInstance.post('/reviews/add-review', reviewData);

    return res.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const rateReview: MutationFunction<
  any,
  {
    reviewId: string;
    feedback: string;
  }
> = async ({ reviewId, feedback }) => {
  try {
    const res = await axiosInstance.post(`/reviews/rate-review/${reviewId}`, {
      feedback,
    });

    return res.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const getReviews = async ({
  page,
  itemsPerPage,
  productId,
  username,
  userId,
}: {
  page: number;
  itemsPerPage: number;
  productId: string;
  username?: string;
  userId?: string;
}) => {
  try {
    const res = await axiosInstance.get('/reviews/get-reviews', {
      params: {
        page,
        itemsPerPage,
        productId,
        username,
        userId,
      },
    });

    return res.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const removeRating: MutationFunction<
  any,
  { reviewId: string; feedback: string }
> = async ({ reviewId }) => {
  try {
    const res = await axiosInstance.delete('/reviews/remove-feedback', {
      params: {
        reviewId,
      },
    });

    return res.data;
  } catch (error) {
    throw errorHandler(error);
  }
};
