import { colorValidation } from '@/utils/validateColor';
import AboutProduct from './AboutProduct';
import FinishProduct from './FinishProduct';
import MainTypes from './MainTypes';
import ProductImages from './ProductImages';

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

      // Validate colors array
      const areColorsValid =
        Array.isArray(data.colors) &&
        data.colors.every(({ val }: any) => colorValidation(val));

      // Validate stock array
      const isStockValid =
        data.stock &&
        data.stock[0].val.trim().length > 0 &&
        !isNaN(Number(data.stock[0].val));

      return areTypesValid && areColorsValid && isStockValid;
    },
    errorMessage: 'Please provide all neccessary features',
  },
  {
    title: 'images',
    component: <ProductImages />,
    answer: null,
    validationFn: () => {},
    errorMessage: 'Please provide images',
  },
  {
    title: 'finish',
    component: <FinishProduct />,
  },
];
