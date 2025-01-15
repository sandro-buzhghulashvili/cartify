import { errorHandler } from '@/utils/errorHandler';
import { axiosInstance } from './axiosInstance';
import { MutationFunction } from 'react-query';

export const getPopularSearches = async () => {
  try {
    const res = await axiosInstance.get('/searches/popular-searches');

    return res.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const searchProducts = async (searchTerm: string) => {
  try {
    const res = await axiosInstance.get('/searches/search-product', {
      params: {
        searchTerm,
      },
    });

    return res.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const addSearch: MutationFunction<
  any,
  {
    searchTerm: string;
  }
> = async ({ searchTerm }) => {
  try {
    const res = await axiosInstance.post(
      '/searches/add-search',
      {},
      {
        params: {
          searchTerm,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw errorHandler(error);
  }
};
