import { colorValidation } from '@/utils/validateColor';
import AboutProduct from './AboutProduct';
import FinishProduct from './FinishProduct';
import MainTypes from './MainTypes';
import ProductDetails from './ProductDetails';
import ProductSpecifications from './ProductSpecifications';

export const addProductsWizardsData = [
  {
    title: 'about_company',
    component: <AboutProduct />,
    answer: null,
    validationFn: (data: any) =>
      data &&
      data.title.trim().length > 0 &&
      data.description.trim().length > 50,
    errorMessage: 'Please provide title and description',
  },
  {
    title: 'product_details',
    component: <ProductDetails />,
    answer: null,
    validationFn: (data: any) =>
      data &&
      data.product_price.trim().length > 0 &&
      Number(data.product_price) &&
      data.images.length > 0 &&
      data.product_type.trim().length > 0,
    errorMessage: 'Please provide product details',
  },
  {
    title: 'main_types',
    component: <MainTypes />,
    answer: null,
    validationFn: (data: any) => {
      if (!data) return false;

      const areTypesValid =
        Array.isArray(data.types) &&
        data.types.every(
          ({ val }: any) => typeof val === 'string' && val.trim().length > 0
        );

      const areColorsValid =
        Array.isArray(data.colors) &&
        data.colors.every(({ val }: any) => colorValidation(val));

      const isStockValid =
        data.stock &&
        data.stock[0].val.trim().length > 0 &&
        !isNaN(Number(data.stock[0].val));

      return areTypesValid && areColorsValid && isStockValid;
    },
    errorMessage: 'Please provide all neccessary features',
  },
  {
    title: 'specifications',
    component: <ProductSpecifications />,
    answer: null,
    validationFn: (data: any) =>
      data &&
      data.specifications.every(
        (item: any) =>
          item.detail.trim().length > 0 && item.value.trim().length > 0
      ),
    errorMessage: 'Please provide specifications correctly',
  },
  {
    title: 'finish',
    component: <FinishProduct />,
  },
];
