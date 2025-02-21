'use client';

import { Product } from '@/utils/validateProduct';
import { createContext, ReactNode, useContext, useState } from 'react';

export interface CartItem {
  quantity: number;
  product: Product;
  product_individual_type: string;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: Product,
    quantity: number,
    price: number,
    type: string
  ) => void;
  removeFromCart: (productId: string, productType: string) => void;
  updateQuantity: (
    productId: string,
    newQuantity: number,
    productType: string
  ) => void;
}

interface CartContextProviderProps {
  children: ReactNode;
}

const cartContext = createContext<CartContextType>({
  cart: [],
  addToCart: (product) => {},
  removeFromCart: (productId) => {},
  updateQuantity: (productId, newQuantity) => {},
});

export const CartContextProvider: React.FC<CartContextProviderProps> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  console.log('Cart : ', cart);

  const addToCart = (
    product: Product,
    quantitiy: number,
    price: number,
    type: string
  ) => {
    const alreadyInCart = cart.find(
      (item) =>
        item.product._id === product._id &&
        item.product_individual_type === type
    );

    if (alreadyInCart) {
      setCart((prevCart) =>
        prevCart.map((item) => {
          if (
            item.product._id === product._id &&
            item.product_individual_type === type
          ) {
            return {
              ...item,
              quantity:
                item.quantity + quantitiy <= product.stock
                  ? item.quantity + quantitiy
                  : product.stock,
              price: price,
              product_individual_type: type,
            };
          } else {
            return item;
          }
        })
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          quantity: quantitiy <= product.stock ? quantitiy : product.stock,
          product,
          price,
          product_individual_type: type,
        },
      ]);
    }
  };

  const removeFromCart = (productId: string, productType: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => {
        return !(
          item.product._id === productId &&
          item.product_individual_type === productType
        );
      })
    );
  };

  const updateQuantity = (
    productId: string,
    newQuantity: number,
    productType: string
  ) => {
    if (newQuantity === 0) {
      removeFromCart(productId, productType);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (
          item.product._id === productId &&
          item.product_individual_type === productType
        ) {
          return {
            ...item,
            quantity:
              newQuantity <= item.product.stock
                ? newQuantity
                : item.product.stock,
          };
        } else {
          return item;
        }
      })
    );
  };

  const contextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
  };

  return (
    <cartContext.Provider value={contextValue}>{children}</cartContext.Provider>
  );
};

export const useCartContext = () => {
  const ctx = useContext(cartContext);

  if (ctx) {
    return ctx;
  }
};
