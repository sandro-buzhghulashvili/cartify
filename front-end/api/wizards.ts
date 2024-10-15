import { MutationFunction } from 'react-query';
import { axiosInstance } from './axiosInstance';
import Cookies from 'js-cookie';
import { errorHandler } from '@/utils/errorHandler';

const user_id = Cookies.get('_id');

export const addCompanyProfile: MutationFunction<
  any,
  {
    companyProfile: any;
  }
> = async ({ companyProfile }) => {
  try {
    const formData = new FormData();
    formData.append('address_data', companyProfile.address_data);
    formData.append('description', companyProfile.description);
    formData.append('tags', companyProfile.tags);
    formData.append('logo', companyProfile.logo);

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
