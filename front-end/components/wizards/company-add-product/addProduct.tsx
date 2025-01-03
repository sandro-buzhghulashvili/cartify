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
          ({ val }: any) =>
            typeof val.type === 'string' &&
            val.type.trim().length > 0 &&
            val.addition >= 0 &&
            val.addition < 100
        );

      const areColorsValid =
        Array.isArray(data.colors) &&
        data.colors.every(({ val }: any) => colorValidation(val));

      const isStockValid =
        data.stock &&
        data.stock[0].val.trim().length > 0 &&
        !isNaN(Number(data.stock[0].val));

      const categoryISValid =
        data.category && data.category[0].val.trim().length > 0;

      return areTypesValid && areColorsValid && isStockValid && categoryISValid;
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
      ) &&
      data.specifications.some(
        (item: any) => item.detail.toLowerCase() === 'brand'
      ),
    errorMessage: 'Please provide brand and additional specifications',
  },
  {
    title: 'finish',
    component: <FinishProduct />,
  },
];
