'use client';

import { IconProps } from './Icons';

export const IconUser: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9998 11.5199C9.61393 11.5199 7.6798 9.58575 7.6798 7.19988C7.6798 4.81401 9.61393 2.87988 11.9998 2.87988C14.3857 2.87988 16.3198 4.81401 16.3198 7.19988C16.3198 9.58575 14.3857 11.5199 11.9998 11.5199ZM11.9998 12.4799C15.9763 12.4799 19.1998 15.7034 19.1998 19.6799V21.5999C19.1998 21.865 18.9849 22.0799 18.7198 22.0799H5.2798C5.01471 22.0799 4.7998 21.865 4.7998 21.5999V19.6799C4.7998 15.7034 8.02335 12.4799 11.9998 12.4799Z"
        fill="#919EAB"
      />
    </svg>
  );
};
