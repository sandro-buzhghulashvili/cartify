import Lottie from 'lottie-react';
import { HTMLAttributes, ReactElement, useEffect, useRef } from 'react';

interface LottiePopupProps extends HTMLAttributes<HTMLDivElement> {
  lottieData: any;
  lottieClass?: string;
  text: string;
}

const LottiePopup: React.FC<LottiePopupProps> = ({
  lottieData,
  lottieClass,
  text,
  ...props
}) => {
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.addEventListener('complete', () => {
        lottieRef.current.goToAndStop(lottieRef.current.totalFrames, true);
      });
    }
  }, []);
  return (
    <div {...props}>
      <Lottie
        className={lottieClass ? lottieClass : 'size-[200px]'}
        animationData={lottieData}
        autoPlay
        loop={false}
      />
      <h1 className="font-medium text-primary-black text-xl text-center">
        {text}
      </h1>
    </div>
  );
};

export default LottiePopup;
