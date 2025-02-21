'use client';
import LottiePopup from '@/components/shared/popups/LottiePopup';
import ErrorLottie from '@/components/lotties/error.json';

interface GlobalErrorPageProps {
  error: Error;
}

const GlobalErrorPage = ({ error }: GlobalErrorPageProps) => {
  return (
    <div className="flex justify-center items-center h-[80vh] px-[10%]">
      <LottiePopup
        className="flex flex-col items-center"
        lottieData={ErrorLottie}
        text={error?.message || 'Something went wrong.'}
      />
    </div>
  );
};

export default GlobalErrorPage;
