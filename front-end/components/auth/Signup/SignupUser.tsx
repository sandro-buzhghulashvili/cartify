import { IconChevronRight } from '@/components/icons/IconChevronRight';
import {
  IconTwitter,
  IconFacebook,
  IconGoogle,
} from '@/components/icons/Icons';
import Link from 'next/link';

const SignupUser: React.FC = () => {
  return (
    <div className="py-10 pt-20 flex items-start justify-center gap-10">
      <form className="flex flex-col gap-5">
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
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="name"
              className="text-sm text-primary-black mb-2 font-normal"
            >
              Your name
            </label>
            <input
              id="name"
              className="px-5 py-2 text-base outline-none text-primary-black"
              type="text"
              placeholder="Type your name"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="email"
              className="text-sm text-primary-black mb-2 font-normal"
            >
              Email
            </label>
            <input
              id="email"
              className="px-5 py-2 text-base outline-none text-primary-black"
              type="email"
              placeholder="name@mail.com"
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
              className="px-5 py-2 !pl-20 text-base focus:outline-none text-primary-black"
              type="text"
              placeholder="000 000 000 000"
            />
            <input
              type="text"
              defaultValue="+995"
              className="max-w-[40px] absolute focus:outline-none top-0 bottom-0 my-auto left-0 placeholder:text-primary-black placeholder:font-regular"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="password"
              className="text-sm text-primary-black mb-2 font-normal"
            >
              Password
            </label>
            <input
              id="password"
              className="px-5 py-2 text-base outline-none text-primary-black"
              type="password"
              placeholder="Type your password"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="confirm_password"
              className="text-sm text-primary-black mb-2 font-normal"
            >
              Repeat password
            </label>
            <input
              id="confirm_password"
              className="px-5 py-2 text-base outline-none text-primary-black"
              type="password"
              placeholder="repeat password"
            />
          </div>
        </div>
      </form>
      <section>
        <h1>This is a slider section</h1>
      </section>
    </div>
  );
};

export default SignupUser;
