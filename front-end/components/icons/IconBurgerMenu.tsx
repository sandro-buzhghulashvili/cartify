import { IconProps } from './Icons';

export const IconBurgerMenu: React.FC<IconProps> = ({
  className,
  ...props
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.8002 4.4002C3.46882 4.4002 3.2002 4.13157 3.2002 3.8002C3.2002 3.46882 3.46882 3.2002 3.8002 3.2002H16.6002C16.9316 3.2002 17.2002 3.46882 17.2002 3.8002C17.2002 4.13157 16.9316 4.4002 16.6002 4.4002H3.8002ZM3.8002 15.6002C3.46882 15.6002 3.2002 15.3316 3.2002 15.0002C3.2002 14.6688 3.46882 14.4002 3.8002 14.4002H16.6002C16.9316 14.4002 17.2002 14.6688 17.2002 15.0002C17.2002 15.3316 16.9316 15.6002 16.6002 15.6002H3.8002ZM3.2002 9.4002C3.2002 9.73157 3.46882 10.0002 3.8002 10.0002H16.6002C16.9316 10.0002 17.2002 9.73157 17.2002 9.4002C17.2002 9.06882 16.9316 8.8002 16.6002 8.8002H3.8002C3.46882 8.8002 3.2002 9.06882 3.2002 9.4002Z"
        fill="#454F5B"
      />
    </svg>
  );
};