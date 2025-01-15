import { errorHandler } from '@/utils/errorHandler';
import { axiosInstance } from './axiosInstance';

export const getAllItems = async (
  filters: { [key: string]: string },
  page: number,
  itemsPerPage: number,
  searchTerm?: string
) => {
  try {
    const res = await axiosInstance.get('/items/all-items', {
      params: {
        filters,
        page,
        itemsPerPage,
        searchTerm,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
    throw errorHandler(error);
  }
};

export const getItemCategories = async () => {
  try {
    const res = await axiosInstance.get('/items/item-categories');

    return res.data;
  } catch (error) {
    console.error(error);
    throw errorHandler(error);
  }
};
