import { ReactNode } from 'react';
import classes from './infinite_slider.module.css';

import Image from 'next/image';

interface SlideProps {
  children: ReactNode;
}

const Slide: React.FC<SlideProps> = ({ children }) => {
  return <div className={classes.slider}>{children}</div>;
};

export default Slide;
