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
  const parsedColors = JSON.parse(product.colors || '[]');
  const parsedTypes = JSON.parse(product.types || '[]');
  const parsedSpecifications = JSON.parse(product.specifications || '[]');

  // Validation functions
  const validateAboutProduct = (data) =>
    data.title?.trim().length > 0 && data.description?.trim().length > 50;

  const validateProductDetails = (data) =>
    data.price?.trim().length > 0 &&
    !isNaN(Number(data.price)) &&
    data.product_type?.trim().length > 0;

  const validateMainTypes = (data) => {
    const areTypesValid =
      Array.isArray(data.types) &&
      data.types.every(
        (val) => typeof val === 'string' && val.trim().length > 0
      );

    const areColorsValid = Array.isArray(data.colors);

    const isStockValid = data.stock && !isNaN(Number(data.stock));

    return areTypesValid && areColorsValid && isStockValid;
  };

  const validateSpecifications = (data) =>
    Array.isArray(data.specifications) &&
    data.specifications.every(
      (item) => item.detail?.trim().length > 0 && item.value?.trim().length > 0
    ) &&
    data.specifications.some((item) => item.detail.toLowerCase() === 'brand');

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

  const isValid =
    aboutProductValid &&
    productDetailsValid &&
    mainTypesValid &&
    specificationsValid;

  const errors = [];
  if (!aboutProductValid) errors.push('Invalid title or description');
  if (!productDetailsValid) errors.push('Invalid product details');
  if (!mainTypesValid) errors.push('Invalid types, colors, or stock');
  if (!specificationsValid)
    errors.push('Invalid specifications or missing brand');

  return {
    isValid,
    errors,
  };
};
