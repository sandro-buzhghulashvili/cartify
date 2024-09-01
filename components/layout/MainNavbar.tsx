'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  IconCart,
  IconHeart,
  IconLoupe,
  IconSelectArrows,
  IconUser,
} from '../icons/Icons';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

const MainNavbar: React.FC = () => {
  const [fillBackground, setFillBackground] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 200) {
      setFillBackground(true);
    } else {
      setFillBackground(false);
    }
  });
  return (
    <nav
      className={`px-[10%] w-full h-[110px] py-5 z-10 flex items-center justify-between fixed top-0 left-0 duration-300 ${
        fillBackground ? 'bg-white' : null
      }`}
    >
      {/* left section */}
      <section className="flex items-center">
        {/* logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/cartify.png"
            width={70}
            height={70}
            alt="cartify logo"
            priority
          />
          <h1 className="text-medium font-semibold text-primary-black">
            Cartify
          </h1>
        </Link>
        {/* filter bar */}
        <div className="flex items-center ml-20">
          <input
            className="max-w-[300px] text-sm py-2 px-5 rounded-3xl border-none focus:outline-none placeholder:text-primary-gray"
            type="text"
            placeholder="Search something"
          />
          <div className="relative">
            <select className="appearance-none focus:outline-none bg-transparent border-none px-5 pr-16">
              <option value="All Categories">All Categories</option>
              {/* Add more options here */}
            </select>
            <IconSelectArrows className="absolute top-0 bottom-0 right-5 my-auto fill-secondary-gray pointer-events-none" />
          </div>
          <button className="size-11 bg-primary-black flex justify-center items-center rounded-md">
            <IconLoupe />
          </button>
        </div>
      </section>
      {/* right section */}
      <section className="flex items-center gap-8">
        {/* cart */}
        <button className="relative">
          <IconCart />
          <span className="absolute -top-4 text-[12px] font-medium -right-4 flex justify-center items-center rounded-full size-[19px] bg-primary-red text-white">
            3
          </span>
        </button>
        {/* favorites */}
        <button>
          <IconHeart />
        </button>
        <button className="flex items-center gap-5">
          <IconUser />
          <p>Sandro</p>
        </button>
        {/* <button className="bg-primary-red py-2 px-10 text-white font-semibold rounded-3xl">
          JOIN
        </button> */}
      </section>
    </nav>
  );
};

export default MainNavbar;
