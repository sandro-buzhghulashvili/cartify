import { HTMLAttributes } from 'react';
import classes from './LoadingScreen.module.css';

interface LoadingScreenTypes extends HTMLAttributes<HTMLDivElement> {}

const LoadingScreen: React.FC<LoadingScreenTypes> = ({ ...props }) => {
  return (
    <div {...props}>
      <span className={classes.loader}></span>
    </div>
  );
};

export default LoadingScreen;
