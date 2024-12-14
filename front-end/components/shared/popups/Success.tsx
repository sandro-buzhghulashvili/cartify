import Link from 'next/link';
import Image from 'next/image';
import Lottie from 'lottie-react';
import successLottie from '@/components/lotties/success.json';
import { useEffect, useRef } from 'react';

interface SuccessProps {
  text: string;
  link: string;
}

const Success: React.FC<SuccessProps> = ({ text, link }) => {
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.addEventListener('complete', () => {
        lottieRef.current.goToAndStop(lottieRef.current.totalFrames, true);
      });
    }
  }, []);

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-screen">
      <Link
        href="/"
        className="absolute top-10 left-20 flex items-center gap-2"
      >
        <Image
          src="/cartify.png"
          width={70}
          height={70}
          alt="cartify logo"
          priority
        />
        <h1 className="text-medium font-semibold text-primary-black">
          Cartify
        </h1>
      </Link>
      <Image
        src="/illustrations/confetti.png"
        width={500}
        height={500}
        alt="confetti"
        className="absolute bottom-0 -left-20 rounded-r-[80%]"
      />
      <Image
        src="/illustrations/star.png"
        width={250}
        height={250}
        alt="star"
        className="absolute top-10 right-20 rounded-r-[80%]"
      />
      {/* // content */}
      <div className="absolute flex flex-col gap-5 items-center w-fit h-fit top-0 bottom-0 right-0 left-0 m-auto">
        <Lottie
          className="size-[200px]"
          animationData={successLottie}
          ref={lottieRef}
          autoPlay
          loop={false}
        />
        <h1 className="text-4xl font-medium text-primary-black">
          Congratulations!
        </h1>
        <p className="text-base text-center font-medium text-primary-gray">
          {text}
        </p>
        <div className="text-center mt-10">
          <Link
            href={link}
            className="px-8 py-3 w-fit rounded-[30px] bg-primary-purple text-white text-base font-medium"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
