'use client';

import { IconChevronRight } from '@/components/icons/IconChevronRight';
import {
  IconTwitter,
  IconFacebook,
  IconGoogle,
} from '@/components/icons/Icons';
import InputGroup from '@/components/shared/inputs/InputGroup';
import {
  clientAuthorizationSchema,
  ClientAuthorizationType,
} from '@/schemas/ClientAuthorizationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import Image from 'next/image';
import { useMutation } from 'react-query';
import { registerClient } from '@/api/auth';
import { useAuthContext } from '@/contexts/AuthContext';

const SignupUser: React.FC = () => {
  const authContext = useAuthContext();
  const {
    data: registerFeedback,
    mutate: registerClientFn,
    isLoading: registeringClient,
    error: registerError,
    isError: registerHasError,
  } = useMutation({
    mutationFn: registerClient,
    onSuccess: (data) => {
      authContext.login(data);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientAuthorizationType>({
    resolver: zodResolver(clientAuthorizationSchema),
  });

  const onSubmit: SubmitHandler<ClientAuthorizationType> = (data) => {
    registerClientFn({
      formData: data,
    });
    console.log('Form Data:', data);
  };
  return (
    <div className="py-10 flex items-center justify-center gap-10 h-fit">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex mb-5 justify-between items-center">
          <h1 className="text-[28px] text-primary-black font-medium">
            Register to Cartify
          </h1>
          <Link
            href="/signin"
            className="flex text-base font-medium text-primary-indigo items-center"
          >
            Sign in here <IconChevronRight />
          </Link>
        </div>
        <div className="flex mb-16 items-center gap-5 pr-5">
          <button
            type="button"
            className="flex rounded-lg gap-5 text-base items-center px-12 bg-fill-gray text-white py-2"
          >
            <IconGoogle />
            <p>Register with Google</p>
          </button>
          <button
            type="button"
            className="size-12 flex justify-center items-center"
          >
            <IconTwitter />
          </button>
          <button
            type="button"
            className="size-12 flex justify-center items-center"
          >
            <IconFacebook />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-1/2">
            <InputGroup
              label="Your name"
              id="name"
              type="text"
              placeholder="Type your name"
              labelStyles="text-sm text-primary-black mb-2 font-normal"
              register={register('name')}
              error={errors.name}
              className="px-5 py-2 text-base outline-none text-primary-black"
            />
          </div>
          <div className="w-1/2">
            <InputGroup
              label="Email"
              id="email"
              type="text"
              placeholder="name@mail.com"
              labelStyles="text-sm text-primary-black mb-2 font-normal"
              register={register('email')}
              error={errors.email}
              className="px-5 py-2 text-base outline-none text-primary-black"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="phone_number"
            className="text-sm text-primary-black mb-2 font-normal"
          >
            Phone number
          </label>
          <div className="relative">
            <input
              id="phone_number"
              className="px-5 py-2 w-full !pl-20 text-base focus:outline-none text-primary-black"
              type="text"
              {...register('phoneNumber')}
              placeholder=" 000 000 000"
            />
            <input
              type="text"
              {...register('phoneNumberExtension')}
              defaultValue="+995"
              className="max-w-[40px] absolute focus:outline-none top-0 bottom-0 my-auto left-5 placeholder:text-primary-black placeholder:font-regular"
            />
          </div>
          {errors.phoneNumberExtension && (
            <p className="px-5 text-sm font-medium text-red-600">
              {errors.phoneNumberExtension.message}
            </p>
          )}
          {errors.phoneNumber && (
            <p className="px-5 text-sm font-medium text-red-600">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className=" w-1/2">
            <InputGroup
              label="Password"
              id="password"
              type="password"
              placeholder="Type your password"
              labelStyles="text-sm text-primary-black mb-2 font-normal"
              register={register('password')}
              error={errors.password}
              className="px-5 py-2 text-base outline-none text-primary-black"
            />
          </div>
          <div className=" w-1/2">
            <InputGroup
              label="Repeat password"
              id="confirm_password"
              type="password"
              placeholder="Repeat password"
              labelStyles="text-sm text-primary-black mb-2 font-normal"
              register={register('confirmPassword')}
              error={errors.confirmPassword}
              className="px-5 py-2 text-base outline-none text-primary-black"
            />
          </div>
        </div>
        {registerHasError && (
          <p className="text-sm text-primary-red font-normal">
            {`${registerError}`}
          </p>
        )}
        <button className="w-full rounded-lg text-base font-regular py-3 text-white bg-primary-purple">
          {registeringClient ? 'Registering ...' : ' Create Elma account'}
        </button>
      </form>
      <Swiper
        pagination={{
          clickable: true,
          bulletClass:
            'swiper-pagination-bullet !bg-light-blue -translate-y-48 -translate-x-28 !size-2 !bg-transparent !border-2 !border-white',
        }}
        grabCursor={true}
        modules={[Pagination]}
        className="w-[350px] h-[660px] !m-0"
      >
        <SwiperSlide className="h-full p-5">
          {' '}
          <Image
            src="/auth_thumb.png"
            alt="flash sale item"
            width={350}
            height={340}
            className="h-full"
          />
        </SwiperSlide>
        <SwiperSlide className="h-full p-5">
          {' '}
          <Image
            src="/auth_thumb.png"
            alt="flash sale item"
            width={350}
            height={340}
            className="h-full"
          />
        </SwiperSlide>
        <SwiperSlide className="h-full p-5">
          <Image
            src="/auth_thumb.png"
            alt="flash sale item"
            width={350}
            height={340}
            className="h-full"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SignupUser;
