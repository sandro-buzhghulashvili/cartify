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
