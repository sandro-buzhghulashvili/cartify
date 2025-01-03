export const validateCompanyProfile = (profileData) => {
  const validationFuncs = {
    address_data: (val) => val && val.trim().length > 0,
    description: (val) => val && val.trim().length > 50,
    tags: (val) => {
      const arr = val.split(',');
      if (arr.length > 0 && arr.every((str) => str.length > 0)) {
        return true;
      } else {
        return false;
      }
    },
  };

  return Object.entries(profileData).every(([key, value]) => {
    const fn = validationFuncs[key];
    return fn ? fn(value) : true;
  });
};

export const validateProduct = (product) => {
  console.log('validation :', product);
  const parsedColors = JSON.parse(product.colors || '[]');
  const parsedTypes = JSON.parse(product.types || '[]');
  const parsedSpecifications = JSON.parse(product.specifications);
  const parsedDiscount = product.discount && JSON.parse(product.discount);

  // Validation functions
  const validateAboutProduct = (data) =>
    data.title?.trim().length > 0 && data.description?.trim().length > 50;

  const validateProductDetails = (data) =>
    data.price?.trim().length > 0 &&
    !isNaN(Number(data.price)) &&
    Number(data.price) > 0 &&
    data.product_type?.trim().length > 0;

  const validateMainTypes = (data) => {
    const areTypesValid =
      Array.isArray(parsedTypes) &&
      parsedTypes.length > 0 &&
      parsedTypes.every(
        (val) =>
          val.type.trim().length > 0 &&
          !isNaN(Number(val.addition)) &&
          Number(val.addition) >= 0 &&
          Number(val.addition) < 100
      );

    const areColorsValid = Array.isArray(data.colors) && data.colors.length > 0;

    const isStockValid =
      data.stock && !isNaN(Number(data.stock)) && Number(data.stock) > 0;

    return areTypesValid && areColorsValid && isStockValid;
  };

  const validateSpecifications = (data) => {
    // console.log(data);

    return (
      Array.isArray(data.specifications) &&
      data.specifications.length > 0 &&
      data.specifications.every(
        (item) =>
          item.detail?.trim().length > 0 && item.value?.trim().length > 0
      ) &&
      data.specifications.some((item) => item.detail.toLowerCase() === 'brand')
    );
  };

  const aboutProductValid = validateAboutProduct(product);
  const productDetailsValid = validateProductDetails(product);
  const mainTypesValid = validateMainTypes({
    types: parsedTypes,
    colors: parsedColors,
    stock: product.stock,
  });
  const specificationsValid = validateSpecifications({
    specifications: parsedSpecifications,
  });
  const discountIsValid =
    parsedDiscount === '0' || !parsedDiscount
      ? true
      : !isNaN(Number(parsedDiscount.percentage)) &&
        Number(parsedDiscount.percentage > 0) &&
        Number(parsedDiscount.percentage < 100) &&
        new Date(parsedDiscount.endDate) instanceof Date &&
        new Date(parsedDiscount.endDate).getTime() > new Date().getTime();
  const categoryIsValid =
    product.category && product.category.trim().length > 0;

  const isValid =
    aboutProductValid &&
    productDetailsValid &&
    mainTypesValid &&
    specificationsValid &&
    discountIsValid &&
    categoryIsValid;

  const errors = [];
  if (!aboutProductValid) errors.push('Invalid title or description');
  if (!productDetailsValid) errors.push('Invalid product details');
  if (!mainTypesValid) errors.push('Invalid types, colors, or stock');
  if (!specificationsValid)
    errors.push('Invalid specifications or missing brand');
  if (!discountIsValid) errors.push('Invalid discount');
  if (!categoryIsValid) errors.push('Invalid category');

  return {
    isValid,
    errors,
  };
};
