'use client';

import { ProductType } from '@/components/wizards/company-add-product/MainTypes';
import ProductPricePanel from './ProductPricePanel';
import ProductTypes from './ProductTypes';
import { DiscountObject } from '@/components/dashboard/company/update_product/Discount';
import { useState } from 'react';

interface ProductActionsProps {
  types: ProductType[];
  colors: string[];
  stock: number;
  price: number;
  discount: number | DiscountObject;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  types,
  colors,
  stock,
  price,
  discount,
}) => {
  const [activeType, setActiveType] = useState<null | ProductType>(types[0]);

  const handleUpdateActiveType = (newType: ProductType) => {
    setActiveType(newType);
  };

  // console.log('Inside top actions compoennet : ', activeType);
  return (
    <>
      <ProductTypes
        types={types}
        colors={colors}
        quantitiy={stock}
        onUpdateType={handleUpdateActiveType}
      />
      <ProductPricePanel price={price} discount={discount} />
    </>
  );
};

export default ProductActions;
