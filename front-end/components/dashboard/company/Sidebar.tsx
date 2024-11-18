'use client';

import {
  IconSuitcase,
  IconTasks,
  IconMessages,
  IconPrivacySettings,
  IconCalendar,
  IconSpeedometer,
} from '@/components/icons/Icons';
import { useDashboardContext } from '@/contexts/DashboardContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const SIDEBAR_LINKS = [
  {
    title: 'Dashboard',
    icon: IconSpeedometer,
  },
  {
    title: 'Products',
    icon: IconSuitcase,
  },
  {
    title: 'Tasks',
    icon: IconTasks,
  },
  {
    title: 'Calendar',
    icon: IconCalendar,
  },
  {
    title: 'Messages',
    icon: IconMessages,
  },
  {
    title: 'Personal',
    icon: IconPrivacySettings,
  },
];

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="flex flex-col gap-10">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/cartify.png"
          width={50}
          height={50}
          alt="cartify logo"
          priority
        />
        <h1 className="text-xl font-semibold text-primary-black">Cartify</h1>
      </Link>
      <ul className="flex flex-col gap-8">
        {SIDEBAR_LINKS.map((link, index) => (
          <li
            key={index}
            className={`flex items-center px-5 py-2 gap-5 cursor-pointer group hover:bg-[rgba(94,129,244,0.1)] duration-300 relative ${
              activeTab === link.title ? 'bg-[rgba(94,129,244,0.1)]' : null
            }`}
            onClick={() => setActiveTab(link.title)}
          >
            <link.icon className="size-[22px] fill-secondary-blue" />
            <p
              className={`text-base text-secondary-gray duration-300 ${
                activeTab === link.title ? 'font-bold' : null
              }`}
            >
              {link.title}
            </p>
            {activeTab === link.title && (
              <span className="absolute top-0 bottom-0 my-auto -right-5 h-full w-1 bg-secondary-blue animate-wiggle"></span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
