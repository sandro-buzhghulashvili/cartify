import { errorHandler } from '@/utils/errorHandler';
import { axiosInstance } from './axiosInstance';

export const getProductTypes = async (searchTerm: string | null) => {
  try {
    const res = await axiosInstance.get('products/product-types');

    const filteredProductTypes = res.data.product_types.filter((item: any) =>
      item.label.toLowerCase().includes(searchTerm?.toLowerCase() || '')
    );

    return filteredProductTypes.map((item: any) => ({
      value: item.value,
      label: item.label,
    }));
  } catch (error) {
    throw errorHandler(error);
  }
};

export const getProducts = async () => {
  try {
    const res = await axiosInstance.get('products/company-products');

    return res.data?.products;
  } catch (error: any) {
    throw errorHandler(error);
  }
};
