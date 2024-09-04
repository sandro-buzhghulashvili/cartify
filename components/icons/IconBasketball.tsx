import { IconProps } from './Icons';

export const IconBasketball: React.FC<IconProps> = ({
  className,
  ...props
}) => {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.9058 29.1422H27.0369V50.4211C21.0862 50.1625 15.7372 47.5858 11.8707 43.5718C15.4317 39.412 17.2144 34.2776 17.2425 29.1422H17.9058ZM17.9058 26.9L27.0369 26.9V5.62109C20.6105 5.90031 14.8858 8.88313 10.9723 13.4602C14.6175 17.2433 16.6814 22.0073 17.1431 26.9L17.9058 26.9ZM14.8893 26.9C14.4458 22.6744 12.6726 18.567 9.58608 15.2573C7.27196 18.5927 5.83992 22.5861 5.62744 26.9H14.8893ZM5.62744 29.1422C5.86327 33.9301 7.6014 38.3232 10.3804 41.8601C13.4391 38.1669 14.9722 33.6555 14.9997 29.1422H5.62744ZM37.4884 26.9L29.2796 26.9V5.63398C35.5996 5.98169 41.2223 8.94534 45.0826 13.4602C41.4379 17.2428 39.3736 22.0068 38.9117 26.9L37.4884 26.9ZM37.4884 29.1422H29.2796V50.4082C35.1254 50.0866 40.3745 47.5269 44.1842 43.5718C40.6226 39.4112 38.8404 34.277 38.8123 29.1422H37.4884ZM41.0551 29.1422C41.0825 33.655 42.6153 38.1662 45.6744 41.8601C48.4535 38.3232 50.1916 33.9301 50.4274 29.1422H41.0551ZM50.4274 26.9C50.215 22.5861 48.7829 18.5927 46.4688 15.2573C43.3828 18.5665 41.6092 22.6741 41.1656 26.9H50.4274Z"
        fill={className ? undefined : '#454F5B'}
      />
    </svg>
  );
};
