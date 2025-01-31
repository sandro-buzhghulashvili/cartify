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

export const DUMMY_MESSAGES = [
  {
    name: 'Nicholas Gordon',
    profileImage: '/profile_default.svg',
    message: 'Moreover the striking, brilliant and vivid colors',
    timestamp: '10m',
    online: true,
  },
  {
    name: 'Sophia Turner',
    profileImage: '/profile_default.svg',
    message: 'The presentation was very well received!',
    timestamp: '5m',
    online: false,
  },
  {
    name: 'Liam Johnson',
    profileImage: '/profile_default.svg',
    message: 'Can we schedule the meeting for tomorrow?',
    timestamp: '15m',
    online: true,
  },
  {
    name: 'Olivia Smith',
    profileImage: '/profile_default.svg',
    message: 'Thanks for the quick feedback on the proposal.',
    timestamp: '30m',
    online: false,
  },
  {
    name: 'Ethan Brown',
    profileImage: '/profile_default.svg',
    message: "I'll send over the documents shortly.",
    timestamp: '20m',
    online: true,
  },
];

export const DUMMY_PRODUCT_TYPES = [
  { value: 'clothing', label: 'Clothing' },
  { value: 'food_beverage', label: 'Food & Beverage' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'health_wellness', label: 'Health & Wellness' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'home_goods', label: 'Home Goods' },
  { value: 'toys_games', label: 'Toys & Games' },
  { value: 'sports_outdoors', label: 'Sports & Outdoors' },
  { value: 'books_media', label: 'Books & Media' },
  { value: 'office_supplies', label: 'Office Supplies' },
];
