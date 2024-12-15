import { errorHandler } from '@/utils/errorHandler';
import { axiosInstance } from './axiosInstance';
import { MutationFunction } from 'react-query';
import { Product } from '@/utils/validateProduct';

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

export const updateProduct: MutationFunction<
  any,
  { productId: any; product: Product }
> = async ({ productId, product }) => {
  try {
    const formData = new FormData();

    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('stock', String(product.stock));
    formData.append('price', String(product.price));
    formData.append('product_type', product.product_type);

    // serialized data:
    formData.append('colors', JSON.stringify(product.colors));
    formData.append('types', JSON.stringify(product.types));
    formData.append('specifications', product.specifications);
    formData.append(
      'images',
      JSON.stringify(product.images.filter((img) => typeof img === 'string'))
    );
    formData.append('discount', String(product.discount));

    // handling new images as blobs:
    product.images.forEach((image: any) => {
      if (image.file) {
        formData.append('files', image.file);
      }
    });

    const res = await axiosInstance.put('/products/update-product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        productId,
      },
    });

    return res.data;
  } catch (error) {
    throw errorHandler(error);
  }
};

export const deleteProduct: MutationFunction<
  any,
  { productId: string }
> = async ({ productId }) => {
  try {
    const res = await axiosInstance.delete(
      `/products/delete-product/${productId}`
    );

    return res.data;
  } catch (error) {
    return errorHandler(error);
  }
};
