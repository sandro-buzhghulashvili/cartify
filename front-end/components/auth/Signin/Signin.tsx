'use client';

import { IconChevronRight } from '@/components/icons/IconChevronRight';
import {
  IconTwitter,
  IconFacebook,
  IconGoogle,
} from '@/components/icons/Icons';
import InputGroup from '@/components/shared/inputs/InputGroup';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import Image from 'next/image';
import {
  clientAuthenticationSchema,
  ClientAuthenticationType,
} from '@/schemas/ClientAuthentication';
import { useMutation } from 'react-query';
import { login } from '@/api/auth';
import { useAuthContext } from '@/contexts/AuthContext';

const SigninUser: React.FC = () => {
  const authContext = useAuthContext();
  const {
    mutate: loginUser,
    isLoading: logging,
    isError: loginHasError,
    error: loginError,
    data: loginData,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      authContext.login(data);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientAuthenticationType>({
    resolver: zodResolver(clientAuthenticationSchema),
  });

  const onSubmit: SubmitHandler<ClientAuthenticationType> = (data) => {
    console.log(data);
    loginUser({
      userData: data,
    });
  };

  return (
    <div className="py-10 flex items-center justify-center gap-10 h-fit">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex mb-5 justify-between items-center">
          <h1 className="text-[28px] text-primary-black font-medium">
            Sign in to Elma
          </h1>
          <Link
            href="/signup"
            className="flex text-base font-medium text-primary-indigo items-center"
          >
            Register here <IconChevronRight />
          </Link>
        </div>
        <div className="flex mb-16 items-center gap-5 pr-5">
          <button
            type="button"
            className="flex rounded-lg gap-5 text-base items-center px-12 bg-fill-gray text-white py-2"
          >
            <IconGoogle />
            <p>Login with Google</p>
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
        <InputGroup
          id="name"
          label="Username or Email"
          type="text"
          placeholder="Type here"
          labelStyles="text-sm text-primary-black mb-2 font-normal"
          register={register('name')}
          error={errors.name}
          className="px-5 py-2 text-base outline-none text-primary-black"
        />
        <InputGroup
          id="password"
          label="Password"
          type="password"
          placeholder="****"
          labelStyles="text-sm text-primary-black mb-2 font-normal"
          register={register('password')}
          error={errors.password}
          className="px-5 py-2 text-base outline-none text-primary-black"
        />
        {loginHasError && (
          <p className="text-sm text-primary-red font-normal">
            {`${loginError}`}
          </p>
        )}
        <button className="w-full rounded-lg text-base font-regular py-3 text-white bg-primary-purple">
          {logging ? 'Logging in ...' : 'Sign In'}
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

export default SigninUser;
