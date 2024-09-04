import { IconProps } from './Icons';

export const IconTV: React.FC<IconProps> = ({ className }) => {
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
        d="M51.52 29.1205H4.47998V7.84047C4.47998 5.98479 5.9843 4.48047 7.83998 4.48047H48.16C50.0157 4.48047 51.52 5.98479 51.52 7.84047V29.1205ZM43.68 38.0805C47.6296 38.0805 50.8971 35.1598 51.4406 31.3605H4.55938C5.10283 35.1598 8.37033 38.0805 12.32 38.0805H43.68ZM22.4 44.8005H19.04C15.9472 44.8005 13.44 47.3077 13.44 50.4005C13.44 51.019 13.9414 51.5205 14.56 51.5205H41.44C42.0585 51.5205 42.56 51.019 42.56 50.4005C42.56 47.3077 40.0528 44.8005 36.96 44.8005H33.6V40.3205H22.4V44.8005Z"
        fill={className ? undefined : '#454F5B'}
      />
    </svg>
  );
};
