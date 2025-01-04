import { IconProps } from './Icons';

export const IconStore: React.FC<IconProps> = ({ className }) => {
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
        d="M4.39991 8.0001H3.99991C2.94582 8.0001 2.09131 7.14559 2.09131 6.0915C2.09131 5.91415 2.11602 5.73768 2.16474 5.56716L3.04952 2.47043C3.19671 1.95527 3.66758 1.6001 4.20335 1.6001H15.7965C16.3322 1.6001 16.8031 1.95527 16.9503 2.47043L17.8351 5.56716C18.1247 6.5807 17.5378 7.63708 16.5242 7.92666C16.3537 7.97538 16.1773 8.0001 15.9999 8.0001H15.5999C14.9457 8.0001 14.3648 7.68596 13.9999 7.20029C13.635 7.68596 13.0542 8.0001 12.3999 8.0001H11.5999C10.9457 8.0001 10.3648 7.68596 9.99991 7.20029C9.63502 7.68596 9.05415 8.0001 8.39991 8.0001H7.59991C6.94567 8.0001 6.3648 7.68596 5.99991 7.20029C5.63502 7.68596 5.05415 8.0001 4.39991 8.0001ZM3.99991 18.4001H3.59991C2.93717 18.4001 2.39991 17.8628 2.39991 17.2001V8.27725C2.84822 8.60597 3.4014 8.8001 3.99991 8.8001H4.39991C4.98416 8.8001 5.53905 8.61951 5.99991 8.29831C6.46078 8.61951 7.01566 8.8001 7.59991 8.8001H8.39991C8.98417 8.8001 9.53905 8.61951 9.99991 8.29831C10.4608 8.61951 11.0157 8.8001 11.5999 8.8001H12.3999C12.9842 8.8001 13.539 8.61951 13.9999 8.29831C14.4608 8.61951 15.0157 8.8001 15.5999 8.8001H15.9999C16.2516 8.8001 16.502 8.76502 16.744 8.69588C17.061 8.60532 17.3486 8.4619 17.5999 8.27793V17.2001C17.5999 17.8628 17.0627 18.4001 16.3999 18.4001H9.59991V11.2001C9.59991 10.7583 9.24174 10.4001 8.79991 10.4001H4.79991C4.35809 10.4001 3.99991 10.7583 3.99991 11.2001V18.4001ZM11.9999 10.4001C11.5581 10.4001 11.1999 10.7583 11.1999 11.2001V14.4001C11.1999 14.8419 11.5581 15.2001 11.9999 15.2001H15.1999C15.6417 15.2001 15.9999 14.8419 15.9999 14.4001V11.2001C15.9999 10.7583 15.6417 10.4001 15.1999 10.4001H11.9999ZM4.79991 18.4001V11.2001H8.79991V18.4001H4.79991ZM11.9999 14.4001V11.2001H15.1999V14.4001H11.9999Z"
        fill={className ? undefined : '#919EAB'}
      />
    </svg>
  );
};
