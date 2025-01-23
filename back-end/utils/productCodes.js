import { v4 as uuidv4 } from 'uuid';

export const calculateSkuNumber = (title, category) => {
  const uniqueId = uuidv4().split('-')[0];
  const skuNumber = `${title.substring(0, 3).toUpperCase()}-${category
    .substring(0, 3)
    .toUpperCase()}-${uniqueId}`;
  return skuNumber;
};

export const calculateProductCode = (productType) => {
  const uniqueId = uuidv4().split('-')[0];
  const productCode = `${productType
    .substring(0, 3)
    .toUpperCase()}-${uniqueId}`;
  return productCode;
};

export const calculateEan = (title, category, productType) => {
  const uniqueId = uuidv4().split('-')[0];
  const ean = `${title.substring(0, 3).toUpperCase()}-${category
    .substring(0, 3)
    .toUpperCase()}-${productType.substring(0, 3).toUpperCase()}-${uniqueId}`;
  return ean;
};
