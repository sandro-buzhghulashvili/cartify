'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const ChooseAccType: React.FC = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div className="py-10 flex flex-col items-center">
      <h1 className="text-[30px] w-1/2 font-medium text-center mb-5">
        Become part of a network of over 2 million sellers delivering
        exceptional products nationwide.
      </h1>
      <p className="text-sm font-medium text-teritary-gray mb-20">
        Sign up now and get all big benefit from Cartify e-commerce :
      </p>
      <section className="flex items-center justify-center gap-40 mb-20">
        <Link href="?role=user" className="flex flex-col items-center">
          <div className="size-[150px] p-2 rounded-full border-2  shadow-flash-sale-shadow mb-5">
            <Image
              src="/auth_assets/user.png"
              alt="user illustration"
              width={130}
              height={130}
              className="rounded-full"
            />
          </div>
          <p className="text-xl font-medium text-primary-black">
            Join as a User
          </p>
        </Link>
        <Link href="?role=company" className="flex flex-col items-center">
          <div className="size-[150px] p-2 rounded-full border-2  shadow-flash-sale-shadow mb-5">
            <Image
              src="/auth_assets/company.png"
              alt="user illustration"
              width={130}
              height={130}
              className="rounded-full"
            />
          </div>
          <p className="text-xl font-medium text-primary-black">
            Join as a Company
          </p>
        </Link>
      </section>
      <p className="text-base font-medium">
        ALREADY HAVE AN ACCOUNT?{' '}
        <Link href="signin" className="ml-3 font-bold text-light-blue">
          Login
        </Link>
      </p>
    </div>
  );
};

export default ChooseAccType;
