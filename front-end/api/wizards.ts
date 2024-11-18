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
    const formData = new FormData();

    formData.append('title', wizardsData.about_company.title);
    formData.append('description', wizardsData.about_company.description);
    formData.append('stock', wizardsData.main_types.stock[0].val);
    formData.append('price', wizardsData.product_details.product_price);
    formData.append('product_type', wizardsData.product_details.product_type);

    // serialized data:
    formData.append(
      'colors',
      JSON.stringify(
        wizardsData.main_types.colors.map((color: any) => color.val)
      )
    );
    formData.append(
      'types',
      JSON.stringify(
        wizardsData.main_types.types.map((color: any) => color.val)
      )
    );
    formData.append(
      'specifications',
      JSON.stringify(
        wizardsData.specifications.specifications.map((spec: any) => ({
          detail: spec.detail,
          value: spec.value,
        }))
      )
    );

    // handling image blobs:
    wizardsData.product_details.images.forEach((file: File, index: number) => {
      formData.append(`files`, file);
    });

    const res = await axiosInstance.post('wizards/add-product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error: any) {
    throw errorHandler(error);
  }
};
