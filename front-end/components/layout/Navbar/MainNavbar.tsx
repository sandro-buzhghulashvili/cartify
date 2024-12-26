'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  IconCart,
  IconHeart,
  IconLoupe,
  IconSelectArrows,
  IconUser,
} from '../../icons/Icons';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import UserTab from './UserTab';
import useOutsideClick from '@/hooks/useOutsideClick';
import Categories from '@/components/categories_menu/Categories';

const MainNavbar: React.FC = () => {
  const { userData, logout } = useAuthContext();
  const { scrollY } = useScroll();
  const [fillBackground, setFillBackground] = useState(false);
  const [openUserTab, setOpenUserTab] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [closingCategories, setClosingCategories] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 50) {
      setFillBackground(true);
    } else {
      setFillBackground(false);
    }
  });

  const toggleUserTab = () => {
    setOpenUserTab((prev) => !prev);
  };

  const handleOpenCategories = () => {
    setOpenCategories(true);
  };

  const handleCloseCategories = () => {
    setClosingCategories(true);
    setTimeout(() => {
      setOpenCategories(false);
      setClosingCategories(false);
    }, 300);
  };

  const logoutHandler = () => {
    setOpenUserTab(false);
    logout();
  };

  const userTabRef = useOutsideClick(() => setOpenUserTab(false));
  const categoriesRef = useOutsideClick(handleCloseCategories);

  useEffect(() => {
    if (openCategories) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openCategories]);

  return (
    <nav
      className={`px-[10%] w-full h-[110px] py-5 z-10 flex items-center justify-between fixed top-0 left-0 duration-300 ${
        fillBackground ? 'bg-white' : null
      }`}
    >
      {openCategories && (
        <Categories
          ref={categoriesRef}
          closeCategories={handleCloseCategories}
          closing={closingCategories}
        />
      )}
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
            className="min-w-[350px] text-sm py-2 px-5 rounded-3xl border-none focus:outline-none placeholder:text-primary-gray"
            type="text"
            placeholder="Search something"
          />
          <button
            className="relative  px-5 pr-16"
            onClick={
              openCategories ? handleCloseCategories : handleOpenCategories
            }
          >
            All Categories
            <IconSelectArrows className="absolute top-0 bottom-0 right-5 my-auto fill-secondary-gray pointer-events-none" />
          </button>
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
        {userData ? (
          <div className="relative" ref={userTabRef}>
            <button
              className="relative flex items-center gap-5"
              onClick={toggleUserTab}
            >
              <IconUser />
              {userData.username || userData.companyName}
              {/* // user tab */}
            </button>
            {openUserTab && (
              <UserTab
                username={userData.username || userData.companyName}
                email={userData.email}
                onLogout={logoutHandler}
                onToggle={toggleUserTab}
              />
            )}
          </div>
        ) : (
          <Link href="/signin" className="flex items-center gap-5">
            <IconUser />
            <p>Sign in</p>
          </Link>
        )}
      </section>
    </nav>
  );
};

export default MainNavbar;
