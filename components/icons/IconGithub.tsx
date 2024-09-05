import { IconProps } from './Icons';

export const IconGithub: React.FC<IconProps> = ({ className, ...props }) => {
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
        d="M11.0001 1.98828C6.46828 1.98847 2.60538 5.27516 1.87944 9.74848C1.1535 14.2218 3.77878 18.5614 8.07799 19.9947C8.53999 20.0756 8.71324 19.7984 8.71324 19.5558C8.71324 19.3364 8.70168 18.6087 8.70168 17.8349C6.38012 18.2622 5.77952 17.269 5.59472 16.7492C5.38966 16.2437 5.0646 15.7957 4.64762 15.444C4.32422 15.2708 3.86222 14.8434 4.63606 14.8319C5.23574 14.897 5.76599 15.2505 6.05672 15.779C6.31196 16.2375 6.73918 16.5756 7.24409 16.7186C7.749 16.8616 8.29006 16.7978 8.74785 16.5413C8.78785 16.0715 8.9972 15.6323 9.33692 15.3055C7.28102 15.0745 5.13272 14.2775 5.13272 10.7432C5.11974 9.82489 5.4586 8.9364 6.07982 8.25996C5.79734 7.46183 5.83039 6.58593 6.17222 5.81136C6.17222 5.81136 6.94604 5.5688 8.71322 6.75846C10.2252 6.34263 11.8213 6.34263 13.3332 6.75846C15.1004 5.55726 15.8742 5.81136 15.8742 5.81136C16.2161 6.58592 16.2492 7.46183 15.9666 8.25996C16.5897 8.93524 16.9289 9.82451 16.9137 10.7432C16.9137 14.289 14.7539 15.0745 12.698 15.3055C13.1442 15.7577 13.3718 16.3815 13.3217 17.0149C13.3217 18.2507 13.3101 19.244 13.3101 19.5559C13.3101 19.7984 13.4834 20.0872 13.9454 19.9948C18.2366 18.5499 20.8499 14.2095 20.119 9.74086C19.3881 5.27224 15.5281 1.99064 11.0001 1.98828Z"
        fill="#919EAB"
      />
    </svg>
  );
};
