'use client';

import {
  IconSuitcase,
  IconTasks,
  IconMessages,
  IconPrivacySettings,
  IconCalendar,
} from '@/components/icons/Icons';
import Image from 'next/image';
import { useState } from 'react';

const SIDEBAR_LINKS = [
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
    title: 'Personal Info',
    icon: IconPrivacySettings,
  },
];

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Products');
  return (
    <div>
      <Image
        src="/cartify.png"
        alt="company logo"
        width={50}
        height={50}
        className="ml-2 mb-5"
      />
      <ul className=" max-w-[66px]">
        {SIDEBAR_LINKS.map((link, index) => (
          <li
            onClick={() => setActiveTab(link.title)}
            className="p-5 group hover:bg-hover-light-blue duration-300 w-fit cursor-pointer overflow-hidden flex relative z-2"
          >
            <link.icon
              className={`w-5 h-5 fill-secondary-fill-gray group-hover:!fill-primary-blue duration-300 ${
                activeTab === link.title ? '!fill-primary-blue' : null
              }`}
            />
            <p className="max-w-0 overflow-hidden whitespace-nowrap hover:max-w-xs group-hover:ml-3 group-hover:text-primary-blue group-hover:max-w-xs duration-300 transition-all ease-in-out">
              {link.title}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
