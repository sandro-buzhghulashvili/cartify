import { IconProps } from './Icons';

export const IconLinkedin: React.FC<IconProps> = ({ className, ...props }) => {
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
        d="M18.8263 1.75989H3.17371C2.81836 1.75496 2.47561 1.89141 2.22088 2.13921C1.96614 2.38701 1.8203 2.72587 1.81543 3.08122V18.9186C1.8203 19.2739 1.96614 19.6128 2.22088 19.8606C2.47561 20.1084 2.81836 20.2448 3.17371 20.2399H18.8263C19.1816 20.2448 19.5244 20.1084 19.7791 19.8606C20.0338 19.6128 20.1797 19.2739 20.1846 18.9186V3.08122C20.1797 2.72587 20.0338 2.38701 19.7791 2.13921C19.5244 1.89141 19.1816 1.75496 18.8263 1.75989ZM7.38715 17.2276H4.61515V8.91164H7.38715V17.2276ZM6.00115 7.7474C5.20506 7.7474 4.55971 7.10204 4.55971 6.30596C4.55971 5.50987 5.20506 4.86452 6.00115 4.86452C6.55509 4.8017 7.09604 5.06188 7.39276 5.53385C7.68948 6.00583 7.68948 6.60609 7.39276 7.07806C7.09604 7.55004 6.55509 7.81022 6.00115 7.7474ZM17.3848 17.2276H14.6128V12.7647C14.6128 11.6467 14.2155 10.9167 13.2084 10.9167C12.5699 10.9214 12.0021 11.3233 11.7854 11.9239C11.7131 12.1411 11.6818 12.3698 11.693 12.5984V17.2184H8.92099C8.92099 17.2184 8.92099 9.66008 8.92099 8.9024H11.693V10.0759C12.2062 9.18539 13.17 8.65194 14.197 8.68988C16.045 8.68988 17.3848 9.88184 17.3848 12.4413V17.2276Z"
        fill="#919EAB"
      />
    </svg>
  );
};