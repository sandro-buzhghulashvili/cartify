import { MutationFunction } from 'react-query';
import { axiosInstance } from './axiosInstance';
import Cookies from 'js-cookie';
import { errorHandler } from '@/utils/errorHandler';

const user_id = Cookies.get('_id');

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

export const addProduct: MutationFunction<
  any,
  {
    wizardsData: any;
  }
> = async ({ wizardsData }) => {
  try {
    console.log(wizardsData, 'Inside wizards api file');
  } catch (error: any) {
    throw errorHandler(error);
  }
};
