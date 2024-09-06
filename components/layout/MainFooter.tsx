import Link from 'next/link';
import Image from 'next/image';
import {
  IconFacebook,
  IconTwitter,
  IconLinkedin,
  IconInstagram,
  IconGithub,
} from '../icons/Icons';

const MainFooter: React.FC = () => {
  return (
    <footer className="px-[10%] py-[60px] !absolute bottom-0 w-full left-0 right-0 mx-auto">
      <div className="flex justify-between items-start mb-20">
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
        <section className="flex flex-wrap text-primary-black gap-20">
          <ul className="text-sm flex flex-col gap-5">
            <li className="!text-base">First Menu</li>
            <li>Features</li>
            <li>Enterpise</li>
            <li>Security</li>
            <li>Customer Stories</li>
            <li>Pricing</li>
            <li>Demo</li>
          </ul>
          <ul className="text-sm flex flex-col gap-5">
            <li className="!text-base">Second Menu</li>
            <li>Engineering</li>
            <li>Financial Services</li>
            <li>Sales</li>
            <li>IT</li>
            <li>Customer Support</li>
            <li>Human Resources</li>
            <li>Media</li>
          </ul>
          <ul className="text-sm flex flex-col gap-5">
            <li className="!text-base">Third Menu</li>
            <li>Tips</li>
            <li>Blog</li>
            <li>Event</li>
            <li>Certified Program</li>
            <li>Help Center</li>
            <li>API</li>
            <li>Download Template</li>
          </ul>
          <ul className="text-sm flex flex-col gap-5">
            <li className="!text-base">Fourth Menu</li>
            <li>About Us</li>
            <li>Leadership</li>
            <li>News</li>
            <li>Media Kit</li>
            <li>Career</li>
            <li>Documentation</li>
          </ul>
        </section>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-teritary-gray">
          Cartify © Copyright 2024, Inc. All rights reserved
        </p>
        <ul className="flex items-center gap-5">
          <li>
            <IconFacebook />
          </li>
          <li>
            <IconTwitter />
          </li>
          <li>
            <IconLinkedin />
          </li>
          <li>
            <IconInstagram />
          </li>
          <li>
            <IconGithub />
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default MainFooter;
