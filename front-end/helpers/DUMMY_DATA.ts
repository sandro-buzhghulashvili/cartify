import {
  IconPhone,
  IconCamera,
  IconTV,
  IconTop,
  IconGamepad,
  IconBasketball,
} from '@/components/icons/Icons';

interface Product {
  seller: string;
  title: string;
  price: number;
  rating: number;
  image: string;
}

interface Category {
  icon: any;
  categoryName: string;
  itemQuantity: number;
}

export const DUMMY_BEST_SELLERS: Product[] = [
  {
    seller: 'Men Fashion',
    title: 'Samsung Galaxy Watch 3',
    price: 1725,
    rating: 5,
    image: '/product_img.png',
  },
  {
    seller: 'Tech Hub',
    title: 'Apple AirPods Pro',
    price: 249,
    rating: 4.5,
    image: '/product_img.png',
  },
  {
    seller: 'Gadget World',
    title: 'Sony WH-1000XM4',
    price: 349,
    rating: 4.8,
    image: '/product_img.png',
  },
  {
    seller: 'Home Essentials',
    title: 'Dyson V11 Vacuum',
    price: 599,
    rating: 4.7,
    image: '/product_img.png',
  },
  {
    seller: 'Outdoor Gear',
    title: 'GoPro Hero 10',
    price: 399,
    rating: 4.6,
    image: '/product_img.png',
  },
  {
    seller: 'Fitness Gear',
    title: 'Fitbit Charge 5',
    price: 149,
    rating: 4.4,
    image: '/product_img.png',
  },
  {
    seller: 'Fitness Gear',
    title: 'Fitbit Charge 5',
    price: 149,
    rating: 4.4,
    image: '/product_img.png',
  },
  {
    seller: 'Fitness Gear',
    title: 'Fitbit Charge 5',
    price: 149,
    rating: 4.4,
    image: '/product_img.png',
  },
];

export const DUMMY_CATEGORIES: Category[] = [
  {
    icon: IconPhone,
    categoryName: 'Smartphones',
    itemQuantity: 2300,
  },
  {
    icon: IconCamera,
    categoryName: 'Cameras',
    itemQuantity: 2300,
  },
  {
    icon: IconTV,
    categoryName: 'Monitors',
    itemQuantity: 2300,
  },
  {
    icon: IconTop,
    categoryName: 'Clothing',
    itemQuantity: 2300,
  },
  {
    icon: IconGamepad,
    categoryName: 'Gaming',
    itemQuantity: 2300,
  },
  {
    icon: IconBasketball,
    categoryName: 'Sports',
    itemQuantity: 2300,
  },
];

export const DUMMY_PRODUCTS_LIST = [
  {
    title: 'Smartphones',
    products: [
      {
        title: 'Iphone 14',
        price: 1725,
        rating: 4.2,
        image: '/phone_thumb.png',
      },
      {
        title: 'Iphone 14',
        price: 1725,
        rating: 4.2,
        image: '/phone_thumb.png',
      },
      {
        title: 'Iphone 14',
        price: 1725,
        rating: 4.2,
        image: '/phone_thumb.png',
      },
    ],
  },
  {
    title: 'Sneakers',
    products: [
      {
        title: 'Iphone 14',
        price: 1725,
        rating: 4.2,
        image: '/sneaker_thumb.png',
      },
      {
        title: 'Iphone 14',
        price: 1725,
        rating: 4.2,
        image: '/sneaker_thumb.png',
      },
      {
        title: 'Iphone 14',
        price: 1725,
        rating: 4.2,
        image: '/sneaker_thumb.png',
      },
    ],
  },
  {
    title: 'Clothing',
    products: [
      {
        title: 'Iphone 14',
        price: 1725,
        rating: 4.2,
        image: '/jacket_thumb.png',
      },
      {
        title: 'Iphone 14',
        price: 1725,
        rating: 4.2,
        image: '/jacket_thumb.png',
      },
      {
        title: 'Iphone 14',
        price: 1725,
        rating: 4.2,
        image: '/jacket_thumb.png',
      },
    ],
  },
];

export const DUMMY_TRENDING_COMPANIES = [
  {
    image: '/trending_companies/asus.png',
  },
  {
    image: '/trending_companies/xiaomi.png',
  },
  {
    image: '/trending_companies/samsung.png',
  },
  {
    image: '/trending_companies/sony.png',
  },
  {
    image: '/trending_companies/wacom.png',
  },
  {
    image: '/trending_companies/apple.png',
  },
];
