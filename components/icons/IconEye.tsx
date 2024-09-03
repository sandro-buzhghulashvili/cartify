import { IconProps } from './Icons';

export const IconEye: React.FC<IconProps> = ({ className, ...props }) => {
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
        d="M9.4 3.6C9.4 3.26863 9.66863 3 10 3C10.3314 3 10.6 3.26863 10.6 3.6V5.2C10.6 5.53137 10.3314 5.8 10 5.8C9.66863 5.8 9.4 5.53137 9.4 5.2V3.6ZM10 12.8C10.6627 12.8 11.2 12.2627 11.2 11.6C11.2 10.9373 10.6627 10.4 10 10.4C9.33726 10.4 8.8 10.9373 8.8 11.6C8.8 12.2627 9.33726 12.8 10 12.8ZM16.8243 3.97574C16.5899 3.74142 16.21 3.74142 15.9757 3.97574L14.3757 5.57574C14.1414 5.81005 14.1414 6.18995 14.3757 6.42426C14.61 6.65858 14.9899 6.65858 15.2243 6.42426L16.8243 4.82426C17.0586 4.58995 17.0586 4.21005 16.8243 3.97574ZM4.02426 3.97574L5.62426 5.57574C5.85858 5.81005 5.85858 6.18995 5.62426 6.42426C5.38995 6.65858 5.01005 6.65858 4.77574 6.42426L3.17574 4.82426C2.94142 4.58995 2.94142 4.21005 3.17574 3.97574C3.41005 3.74142 3.78995 3.74142 4.02426 3.97574ZM3.23047 11.4469C4.49865 8.38647 7.09412 6.4 10 6.4C12.9059 6.4 15.5013 8.38647 16.7695 11.4469C16.8102 11.5449 16.8102 11.6551 16.7695 11.7531C15.5013 14.8135 12.9059 16.8 10 16.8C7.09412 16.8 4.49865 14.8135 3.23047 11.7531C3.18984 11.6551 3.18984 11.5449 3.23047 11.4469ZM10 13.6C8.89543 13.6 8 12.7046 8 11.6C8 10.4954 8.89543 9.6 10 9.6C11.1046 9.6 12 10.4954 12 11.6C12 12.7046 11.1046 13.6 10 13.6Z"
        fill="#919EAB"
      />
    </svg>
  );
};