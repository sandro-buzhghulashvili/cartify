import { errorHandler } from '@/utils/errorHandler';
import { axiosInstance } from './axiosInstance';

export const getCategories = async () => {
  try {
    const res = await axiosInstance.get('/products/get-categories');

    return res.data;
  } catch (error) {
    throw errorHandler(error);
  }
};
