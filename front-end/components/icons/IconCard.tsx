import { IconProps } from './Icons';

export const IconCard: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.2002 8H8.80019C5.7074 8 3.2002 10.5072 3.2002 13.6V14.4H36.8002V13.6C36.8002 10.5072 34.293 8 31.2002 8ZM3.2002 28V20.8H36.8002V28C36.8002 31.0928 34.293 33.6 31.2002 33.6H8.80019C5.7074 33.6 3.2002 31.0928 3.2002 28ZM31.2002 28.8H24.8002C24.3584 28.8 24.0002 28.4418 24.0002 28C24.0002 27.5582 24.3584 27.2 24.8002 27.2H31.2002C31.642 27.2 32.0002 27.5582 32.0002 28C32.0002 28.4418 31.642 28.8 31.2002 28.8ZM3.2002 19.2V16H36.8002V19.2H3.2002Z"
        fill="#5C6AC4"
      />
    </svg>
  );
};
