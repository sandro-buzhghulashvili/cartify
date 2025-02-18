import { cookies } from 'next/headers';
import axios from 'axios';
import { errorHandler } from '@/utils/errorHandler';

export const getProduct = async (productId: string) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/products/get-product/${productId}`
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw errorHandler(error);
  }
};
