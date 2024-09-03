'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import { EffectCards, Autoplay, Pagination } from 'swiper/modules';

import Image from 'next/image';
import Timer from '../shared/Timer';

interface FlashSaleItem {
  image: any;
  saleStartedAt: any;
  title: string;
  description: string;
  price: number;
  oldPrice: number;
}

const DUMMY_FLASHSALES_DATA: FlashSaleItem[] = [
  {
    image: '/flash_sale.png',
    saleStartedAt: new Date(),
    title: 'Lenovo Yoga X',
    description:
      ' Smarter and intuitive with the same expert design and detail.Plus combine innovative latest AI features',
    price: 750,
    oldPrice: 1500,
  },
  {
    image: '/flash_sale2.png',
    saleStartedAt: new Date(),
    title: 'Smart Watch',
    description: 'Fitness tracking with heart rate monitor.',
    price: 120,
    oldPrice: 200,
  },
  {
    image: '/flash_sale3.png',
    saleStartedAt: new Date(),
    title: 'Bluetooth Speaker',
    description: 'Portable speaker with deep bass and long battery life.',
    price: 40,
    oldPrice: 70,
  },
];

const FlashSales: React.FC = () => {
  return (
    <>
      <Image
        src="/wave.png"
        alt="wave"
        width={1080}
        height={400}
        className="w-full h-[450px]"
      />
      <div className="relative py-40 flex flex-col justify-center items-center overflow-hidden bg-black_to_purple text-white">
        <div className="mb-40 text-center w-1/3">
          <h1 className="text-[56px] mb-5 text-white font-bold uppercase">
            🚨 Flash Sales 🚨
          </h1>
          <p>
            These exclusive deals are here for a short time only, with
            unbeatable discounts on your favorite products. Whether you're
            looking for the latest tech gadgets 📱, stylish fashion 👗, or
            must-have accessories 🎒, our Flash Sales have something for
            everyone. But hurry—once they're gone, they're gone for good! 🏃‍♂️💨
          </p>
        </div>
        <Swiper
          effect={'cards'}
          grabCursor={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: true,
          }}
          pagination={{
            clickable: true,
            bulletClass:
              'swiper-pagination-bullet !bg-light-blue !translate-y-16 !w-10 !h-2 !rounded-none',
          }}
          modules={[EffectCards, Autoplay, Pagination]}
          className="relative z-10 w-[500px] h-[720px] !m-0"
        >
          {DUMMY_FLASHSALES_DATA.map((sale, index) => (
            <SwiperSlide
              key={index}
              className="bg-primary-black p-5 rounded-[30px] border-2 shadow-flash-sale-shadow !overflow-visible"
            >
              <div
                className={`relative mb-20 flex ${
                  index % 2 !== 0 ? 'justify-end' : 'justify-start'
                } `}
              >
                <Image
                  src={sale.image}
                  alt="flash sale item"
                  width={350}
                  height={340}
                  className={`${
                    index % 2 !== 0
                      ? 'translate-x-36'
                      : '-translate-x-36 !max-h-[340px] w-auto'
                  }`}
                />
                <div
                  className={`absolute text-center top-0 bottom-0 my-auto ${
                    index % 2 !== 0 ? 'left-0' : 'right-0'
                  } h-fit`}
                >
                  <h1 className="text-2xl mb-5 uppercase">Time left</h1>
                  <Timer />
                </div>
              </div>

              <div className="flex flex-col gap-5 items-center">
                <h1 className="text-4xl font-bold text-white">{sale.title}</h1>
                <p className="text-base text-center font-medium text-light-blue">
                  {sale.description}
                </p>
                <div className="flex flex-col items-center">
                  <button className="px-5 py-2 mb-3 text-white text-base bg-light-blue">
                    Buy Now for ${sale.price}
                  </button>
                  <span className="text-[20px] text-white line-through">
                    ${sale.oldPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Image
        src="/wave-reverse.png"
        alt="wave-reverse"
        width={1080}
        height={400}
        className="w-full h-[450px]"
      />
    </>
  );
};

export default FlashSales;