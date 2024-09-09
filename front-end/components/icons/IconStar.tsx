import { IconProps } from './Icons';

export const IconStar: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.00038 12.2244L4.33789 14.666C4.10774 14.8195 3.80448 14.6284 3.8436 14.3545L4.46097 10.0329L1.37411 6.94606C1.18765 6.7596 1.29409 6.44029 1.55513 6.403L5.8571 5.78843L7.70626 1.47373C7.81709 1.21514 8.18369 1.21514 8.29451 1.47373L10.1437 5.78843L14.4456 6.403C14.7067 6.44029 14.8131 6.7596 14.6267 6.94606L11.5398 10.0329L12.1572 14.3545C12.1963 14.6284 11.893 14.8195 11.6629 14.666L8.00038 12.2244Z"
        fill="#EEC200"
      />
    </svg>
  );
};
