'use client';

import { ReactNode, useEffect } from 'react';
import Image from 'next/image';
import { IconChevronRight } from '@/components/icons/Icons';
import {
  useWizardsContext,
  WizardsContextProvider,
} from '@/contexts/WizardsContext';

interface WizardsLayoutProps {
  children: ReactNode;
}

const WizardsLayout: React.FC<WizardsLayoutProps> = ({ children }) => {
  const { wizardsData, onNext, onPrevious, activePage, onSetWizardsData } =
    useWizardsContext();

  return (
    <div className="relative w-full min-h-screen bg-white  flex flex-col justify-between items-center px-[10%]">
      {/* header section */}
      <section className="w-full">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-2 w-full py-10">
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
          </div>
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

      <div className="w-full h-[500px]">{children}</div>
      <div className="py-10 w-full flex justify-between items-center">
        <button onClick={onPrevious} disabled={activePage - 1 === 0}>
          <IconChevronRight
            className={`rotate-[180deg] size-20 ${
              activePage - 1 === 0 ? 'opacity-70 cursor-not-allowed' : null
            }`}
          />
        </button>
        <button
          disabled={activePage === wizardsData.length}
          className={`px-12 py-3 text-white font-medium text-lg bg-primary-indigo rounded-[30px] ${
            activePage === wizardsData.length
              ? 'opacity-70 cursor-not-allowed'
              : null
          }`}
        >
          Skip
        </button>
        <button onClick={onNext} disabled={activePage === wizardsData.length}>
          <IconChevronRight
            className={`size-20  ${
              activePage === wizardsData.length
                ? 'opacity-70 cursor-not-allowed'
                : null
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default WizardsLayout;
