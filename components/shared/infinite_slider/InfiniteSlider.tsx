import classes from './infinite_slider.module.css';
import Slide from './Slide';

interface InfiniteSliderProps {
  sliderData: any[];
}

import Image from 'next/image';

const InfiniteSlider: React.FC<InfiniteSliderProps> = ({ sliderData }) => {
  return (
    <div
      className={`py-[60px] overflow-hidden whitespace-nowrap ${classes.main_slider}`}
    >
      <div className={classes.sliders}>
        {sliderData.map((sliderItem, index) => (
          <Slide key={index}>
            <Image
              src={sliderItem.image}
              width={120}
              height={120}
              alt="company logo"
            />
          </Slide>
        ))}
      </div>
      <div className={classes.sliders}>
        {sliderData.map((sliderItem, index) => (
          <Slide key={index}>
            <Image
              src={sliderItem.image}
              width={120}
              height={120}
              alt="company logo"
            />
          </Slide>
        ))}
      </div>
    </div>
  );
};

export default InfiniteSlider;
