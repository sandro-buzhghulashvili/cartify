'use client';

import { IconHeadset, IconTruck, IconWallet } from '@/components/icons/Icons';
import InputGroup from '@/components/shared/inputs/InputGroup';
import {
  companyAuthorizationSchema,
  CompanyAuthorizationType,
} from '@/schemas/CompanyAuthorizationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { Input } from 'postcss';
import Link from 'next/link';

const Select = dynamic(() => import('react-select'), { ssr: false });

type OptionType = { value: string; label: string }; // Define your option type

const options: OptionType[] = [
  { value: 'tech', label: 'Technology' },
  { value: 'clothing', label: 'Fashion & Clothing' },
  { value: 'sports', label: 'Sports' },
];

const SignupCompany: React.FC = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<CompanyAuthorizationType>({
    resolver: zodResolver(companyAuthorizationSchema),
  });

  const onSubmit: SubmitHandler<CompanyAuthorizationType> = (data) => {
    console.log(data);
    console.log('submitted');
  };

  return (
    <div className="py-20 flex items-start justify-center gap-20">
      {/* // services tab */}
      <section className="w-1/2">
        <h1 className="text-[32px] mb-5 font-medium text-primary-black">
          Join companies offering top-tier products and services to customers
          nationwide. Grow your business with our platform and reach new markets
          today!
        </h1>
        <p className="text-sm font-normal text-teritary-gray mb-16">
          Sign up now and get all big benefit from Cartify e-commerce :
        </p>
        <ul className="text-primary-black flex flex-col gap-10">
          <li className="flex gap-5">
            <IconTruck className="size-[34px] fill-secondary-gray" />
            <div className="w-4/5">
              <h1 className="text-lg font-medium mb-2">
                Logistics and Fulfillment Support
              </h1>
              <p className="text-sm font-normal text-primary-gray">
                No more shipping headaches! Enjoy seamless logistics
                integration, order tracking, and inventory management tools.
                Whether it's express shipping, warehousing, or dropshipping
                support, we handle the hard stuff so you can focus on growing
                your business.
              </p>
            </div>
          </li>
          <li className="flex gap-5">
            <IconWallet className="size-[34px] fill-secondary-gray" />
            <div className="w-4/5">
              <h1 className="text-lg font-medium mb-2">
                Advanced Analytics and Insights
              </h1>
              <p className="text-sm font-normal text-primary-gray">
                Dive deep into the data that matters! Track sales performance,
                customer trends, and product behavior with our powerful
                analytics tools. Make data-driven decisions and stay ahead of
                the competition with custom reports made just for you.
              </p>
            </div>
          </li>
          <li className="flex gap-5">
            <IconHeadset className="size-[34px] fill-secondary-gray" />
            <div className="w-4/5">
              <h1 className="text-lg font-medium mb-2">
                Dedicated Support Team
              </h1>
              <p className="text-sm font-normal text-primary-gray">
                Got questions? We’ve got answers! Our dedicated support team is
                here for you 24/7. Whether it's onboarding assistance, technical
                help, or strategy advice, you’ll always have an expert on hand
                to guide you every step of the way.
              </p>
            </div>
          </li>
        </ul>
      </section>
      {/* // form tab */}
      <section className="text-primary-black w-2/5">
        <h1 className="text-[28px] font-medium mb-2">New Member on here?</h1>
        <p className="text-sm font-normal mb-5 text-teritary-gray">
          Register your company with us and start selling your products to
          customers nationwide. Follow all the steps to complete your
          registration and grow your business on our platform.
        </p>
        <form
          className="flex flex-col py-10 gap-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputGroup
            id="companyName"
            label="Company Name"
            labelStyles="text-sm text-primary-black mb-2 font-normal"
            type="text"
            placeholder="e.g Cartify"
            register={register('companyName')}
            error={errors.companyName}
            className="px-5 py-2 text-base outline-none text-primary-black"
            errorStyles="!max-w-full"
          />
          <InputGroup
            id="email"
            label="Business Email"
            labelStyles="text-sm text-primary-black mb-2 font-normal"
            placeholder="business@gmail.com"
            register={register('email')}
            error={errors.email}
            className="px-5 py-2 text-base outline-none text-primary-black"
            errorStyles="!max-w-full"
          />
          <div>
            <label
              className="text-sm text-primary-black mb-2 font-normal inline-block"
              htmlFor="industryType"
            >
              Industry
            </label>
            <Controller
              name="industryType"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Select industry type"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: errors.industryType ? 'red' : 'none',
                    }),
                  }}
                  {...field}
                  options={options}
                  onChange={(selectedOption: any) =>
                    field.onChange(selectedOption?.value)
                  }
                  value={
                    options.find(
                      (option: any) => option.value === field.value
                    ) || null
                  }
                  id="industryType"
                />
              )}
            />
            {errors.industryType && (
              <p className=" px-5 text-sm font-medium text-red-600">
                {errors.industryType.message}
              </p>
            )}
          </div>
          <InputGroup
            id="password"
            label="Password"
            type="password"
            labelStyles="text-sm text-primary-black mb-2 font-normal"
            placeholder="****"
            register={register('password')}
            error={errors.password}
            className="px-5 py-2 text-base outline-none text-primary-black"
            errorStyles="!max-w-full"
          />
          <div className="flex items-center justify-between">
            <button className="w-1/2 rounded-lg text-base font-regular py-3 text-white bg-primary-purple">
              Create your account
            </button>
            <Link
              href="/signin"
              replace
              className="w-1/2 text-center text-teritary-gray text-base font-medium"
            >
              Login
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignupCompany;
