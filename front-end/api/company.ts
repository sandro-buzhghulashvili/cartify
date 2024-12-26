import { errorHandler } from '@/utils/errorHandler';
import { axiosInstance } from './axiosInstance';
import { MutationFunction } from 'react-query';

export const getCompanyDetails = async () => {
  try {
    const res = await axiosInstance.get('company/company-details');

    return res.data;
  } catch (error: any) {
    throw errorHandler(error);
  }
};

export const addCompanyProfile: MutationFunction<
  any,
  {
    wizardsData: any;
  }
> = async ({ wizardsData }) => {
  try {
    const formData = new FormData();
    formData.append('address_data', wizardsData.address_data);
    formData.append('description', wizardsData.description);
    formData.append('tags', wizardsData.tags);
    formData.append('logo', wizardsData.logo);

    const res = await axiosInstance.post(
      'wizards/fill-company-profile',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return res.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const getPopularCompanies = async () => {
  try {
    const res = await axiosInstance.get('/company/popular-companies');

    return res.data;
  } catch (error: any) {
    throw errorHandler(error);
  }
};
