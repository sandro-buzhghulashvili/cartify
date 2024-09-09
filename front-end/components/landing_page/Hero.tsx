'use client';

import Lottie from 'lottie-react';
import HeroAnimation from '@/components/lotties/ecommerce.json';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <div className="flex justify-between items-center min-h-[60vh] py-20">
      {/* intro text */}
      <section className="w-2/5">
        <p className="font-medium text-sm text-light-blue mb-2">
          Welcome to Cartify!
        </p>
        <h1 className="text-[56px] font-medium text-primary-black mb-5">
          Top Picks in Comfort and Durability
        </h1>
        <p className="mb-10 text-primary-gray text-base font-normal">
          Discover a seamless shopping experience with Cartify, your ultimate
          e-commerce companion. Whether you're browsing for the latest trends or
          stocking up on essentials, Cartify offers an intuitive and
          personalized shopping journey. Our user-friendly platform is designed
          to make finding, selecting, and purchasing your favorite products
          easier than ever.
        </p>
        <div className="flex items-center gap-10">
          <Link
            href="/signup"
            className="px-4 rounded-sm bg-primary-purple py-3 text-base font-regular text-white"
          >
            Get Started
          </Link>
          <button className="px-4 py-3 rounded-sm border-[1px] border-primary-purple text-primary-indigo">
            Learn More
          </button>
        </div>
      </section>
      <section>
        <Lottie
          className="size-[600px]"
          animationData={HeroAnimation}
          loop={true}
        />
      </section>
    </div>
  );
};

export default Hero;
