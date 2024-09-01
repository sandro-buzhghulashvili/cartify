interface Product {
  seller: string;
  title: string;
  price: number;
  rating: number;
  image: string;
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
];
