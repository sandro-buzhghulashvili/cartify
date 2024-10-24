import AboutProduct from './AboutProduct';

export const addProductsWizardsData = [
  {
    title: 'about',
    component: <AboutProduct />,
    answer: null,
    validationFn: (data: any) =>
      data &&
      data.title.trim().length > 0 &&
      data.description.trim().length > 50,
    errorMessage: 'Please provide title and description',
  },
];
