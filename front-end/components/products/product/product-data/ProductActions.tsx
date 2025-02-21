'use client';

import { ProductType } from '@/components/wizards/company-add-product/MainTypes';
import ProductPricePanel from './ProductPricePanel';
import ProductTypes from './ProductTypes';
import { useState } from 'react';
import { Product } from '@/utils/validateProduct';
import { useCartContext } from '@/contexts/CartContext';

interface ProductActionsProps {
  product: Product;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const cartContext = useCartContext();

  const [activeType, setActiveType] = useState<ProductType>(product.types[0]);
  const [quantitiy, setQuantity] = useState<number>(1);

  const discount =
    typeof product.discount !== 'number' &&
    !isNaN(Number(product.discount.percentage)) &&
    Number(product.discount.percentage);

  const basePrice = discount
    ? product.price * ((100 - discount) / 100)
    : product.price;

  const price =
    typeof activeType?.addition === 'number' && activeType?.addition > 0
      ? basePrice * ((activeType.addition + 100) / 100)
      : basePrice;

  const handleUpdateActiveType = (newType: ProductType) => {
    setActiveType(newType);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    cartContext?.addToCart(product, quantitiy, price, activeType.type);
  };

  // console.log('Inside top actions compoennet : ', activeType);
  return (
    <>
      <ProductTypes
        types={product.types}
        colors={product.colors}
        quantitiy={product.stock}
        onUpdateType={handleUpdateActiveType}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <ProductPricePanel
        price={price}
        discount={product.discount}
        originalPrice={product.price}
        addition={activeType?.addition}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default ProductActions;
