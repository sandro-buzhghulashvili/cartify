import { DiscountObject } from '@/components/dashboard/company/update_product/Discount';
import { colorValidation } from './validateColor';
import { ProductType } from '@/components/wizards/company-add-product/MainTypes';

export type Product = {
  _id: string;
  title: string;
  description: string;
  stock: number;
  price: number;
  product_type: string;
  category: {
    id: string;
    name: string;
    logo: string;
    sells: number;
    averageRating: number;
  };
  colors: string[];
  types: ProductType[];
  specifications: string;
  images: string[];
  companyDetails: Record<string, any> | null;
  views: number;
  status: 'active' | 'disabled';
  discount: number | DiscountObject;
  createdAt?: Date;
  updatedAt?: Date;
  rating:
    | number
    | {
        total: number;
        average: number;
      };
};

export const validateProduct = (product: Product) => {
  // Validation functions
  const validateAboutProduct = (data: Product) =>
    data.title?.trim().length > 0 && data.description?.trim().length > 50;

  const validateProductDetails = (data: Product) =>
    !isNaN(Number(data.price)) &&
    Number(data.price) > 0 &&
    data.product_type?.trim().length > 0;

  const validateMainTypes = (data: Product) => {
    const areTypesValid =
      Array.isArray(data.types) &&
      data.types.length > 0 &&
      data.types.every(
        (val) =>
          val.type?.trim().length > 0 && val.addition >= 0 && val.addition < 100
      );

    const areColorsValid =
      Array.isArray(data.colors) &&
      data.colors.length > 0 &&
      data.colors.every((color) => colorValidation(color));

    const isStockValid =
      data.stock && !isNaN(Number(data.stock)) && Number(data.stock) > 0;

    return areTypesValid && areColorsValid && isStockValid;
  };

  const validateSpecifications = (data: Product) => {
    const parsedSpecifications = JSON.parse(data.specifications);
    return (
      Array.isArray(parsedSpecifications) &&
      parsedSpecifications.length > 0 &&
      parsedSpecifications.every(
        (item) =>
          item.detail?.trim().length > 0 && item.value?.trim().length > 0
      ) &&
      parsedSpecifications.some((item) => item.detail.toLowerCase() === 'brand')
    );
  };

  const aboutProductValid = validateAboutProduct(product);
  const productDetailsValid = validateProductDetails(product);
  const mainTypesValid = validateMainTypes(product);
  const specificationsValid = validateSpecifications(product);
  const discountIsValid =
    typeof product?.discount === 'number'
      ? !isNaN(Number(product.discount)) &&
        product.discount >= 0 &&
        product.discount < 100
      : !isNaN(Number(product.discount.percentage)) &&
        Number(product.discount.percentage) >= 0 &&
        Number(product.discount.percentage) < 100 &&
        product.discount.endDate instanceof Date &&
        product.discount.endDate.getTime() > new Date().getTime();
  const imagesAreValid = product.images.length > 0;

  const isValid =
    aboutProductValid &&
    productDetailsValid &&
    mainTypesValid &&
    specificationsValid &&
    discountIsValid &&
    imagesAreValid;

  const errors = [];
  if (!aboutProductValid) errors.push('Invalid title or description');
  if (!productDetailsValid) errors.push('Invalid product details');
  if (!mainTypesValid) errors.push('Invalid types, colors, or stock');
  if (!specificationsValid)
    errors.push('Invalid specifications or missing brand');
  if (!discountIsValid) errors.push('Invalid discount');
  if (!imagesAreValid) errors.push('Invalid images');

  return {
    isValid,
    errors,
  };
};
