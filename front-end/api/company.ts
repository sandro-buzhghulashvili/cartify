import { errorHandler } from '@/utils/errorHandler';
import { axiosInstance } from './axiosInstance';

export const getCompanyDetails = async () => {
  try {
    const res = await axiosInstance.get('company/company-details');

    return res.data;
  } catch (error: any) {
    throw errorHandler(error);
  }
};
