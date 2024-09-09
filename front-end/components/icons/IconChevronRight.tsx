import { IconProps } from './Icons';

export const IconChevronRight: React.FC<IconProps> = ({
  className,
  ...props
}) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.9495 7.04034C8.6083 7.38357 8.6083 7.9379 8.9495 8.28114L12.0647 11.4403L8.9495 14.5555C8.6083 14.8988 8.6083 15.4531 8.9495 15.7963C9.11474 15.9629 9.33966 16.0566 9.5743 16.0566C9.80894 16.0566 10.0339 15.9629 10.1991 15.7963L13.9303 12.0651C14.0969 11.8999 14.1906 11.675 14.1906 11.4403C14.1906 11.2057 14.0969 10.9808 13.9303 10.8155L10.1991 7.04034C10.0339 6.87374 9.80894 6.78003 9.5743 6.78003C9.33966 6.78003 9.11474 6.87374 8.9495 7.04034Z"
        fill="#5C6AC4"
      />
    </svg>
  );
};
