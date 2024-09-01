'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

import { EffectCards } from 'swiper/modules';

const FlashSales: React.FC = () => {
  return (
    <div className="py-36 flex justify-center">
      <Swiper
        effect={'cards'}
        grabCursor={true}
        autoplay
        modules={[EffectCards]}
        className="w-[600px] h-[720px] !m-0"
      >
        <SwiperSlide className="bg-red-500">Slide 1</SwiperSlide>
        <SwiperSlide className="bg-blue-500">Slide 2</SwiperSlide>
        <SwiperSlide className="bg-green-500">Slide 3</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default FlashSales;
