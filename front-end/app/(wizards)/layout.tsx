'use client';

import { ReactNode, use, useEffect, useState } from 'react';
import Image from 'next/image';
import { IconChevronRight } from '@/components/icons/Icons';
import {
  useWizardsContext,
  WizardsContextProvider,
} from '@/contexts/WizardsContext';
import Link from 'next/link';
import Success from '@/components/shared/popups/Success';

interface WizardsLayoutProps {
  children: ReactNode;
}

const WizardsLayout: React.FC<WizardsLayoutProps> = ({ children }) => {
  const { wizardsData, onNext, onPrevious, activePage, onSkip, finishFunc } =
    useWizardsContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<null | string>(null);

  const isValid = wizardsData
    .slice(0, activePage - 1)
    .every((val) => val.validationFn(val.answer));

  // last page is for finish page

  const handleFinish = async () => {
    try {
      setLoading(true);
      const profileHashMap: any = {};

      wizardsData.forEach((data) => {
        profileHashMap[data.title] = data.answer;
      });

      const mutator = finishFunc();
      const res = await mutator({
        companyProfile: profileHashMap,
      });

      setLoading(false);

      if (res.success) {
        setSuccess(res.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  if (success) {
    return <Success text={success} link="/dashboard" />;
  }

  return (
    <div className="relative w-full min-h-screen bg-white  flex flex-col justify-between items-center px-[10%]">
      {/* header section */}
      <section className="w-full">
        <div className="flex w-full justify-between items-center">
          <Link href="/" className="flex items-center w-fit gap-2 py-10">
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
          <div>
            <h1 className="text-2xl text-primary-black font-medium">
              {activePage}/{wizardsData?.length}
            </h1>
          </div>
        </div>
        {/* // steps */}
        <div className="flex gap-10">
          {wizardsData.map((step, index) => (
            <div
              key={index}
              className={`h-3 w-[150px] rounded-2xl duration-300 ${
                index + 1 > activePage ? 'bg-light-green' : 'bg-primary-green'
              }`}
            ></div>
          ))}
        </div>
      </section>

      <div className="w-full h-[500px] overflow-y-auto">{children}</div>
      {error && (
        <p className="text-left w-full font-medium text-red-500">{`${error}`}</p>
      )}
      <div className="py-10 w-full flex justify-between items-center">
        <button onClick={onPrevious} disabled={activePage - 1 === 0}>
          <IconChevronRight
            className={`rotate-[180deg] size-20 ${
              activePage - 1 === 0 ? 'opacity-70 cursor-not-allowed' : null
            }`}
          />
        </button>
        {activePage !== wizardsData.length ? (
          <>
            <button
              disabled={activePage === wizardsData.length}
              onClick={onSkip}
              className={`px-12 py-3 text-white font-medium text-lg bg-primary-indigo rounded-[30px] ${
                activePage === wizardsData.length
                  ? 'opacity-70 cursor-not-allowed'
                  : null
              }`}
            >
              Skip
            </button>
            <button
              onClick={onNext}
              disabled={activePage === wizardsData.length}
            >
              <IconChevronRight
                className={`size-20  ${
                  activePage === wizardsData.length
                    ? 'opacity-70 cursor-not-allowed'
                    : null
                }`}
              />
            </button>
          </>
        ) : (
          <button
            disabled={!isValid}
            onClick={handleFinish}
            className={`px-12 py-3 text-white font-medium text-lg bg-primary-indigo rounded-[30px] disabled:cursor-not-allowed disabled:opacity-50 `}
          >
            {loading ? 'Loading ...' : 'Finish'}
          </button>
        )}
      </div>
    </div>
  );
};

export default WizardsLayout;
