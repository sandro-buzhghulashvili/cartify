'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface WizardsContextType {
  wizardsData: any[];
  activePage: number;
  finishFunc: any;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onSetWizardsData: (data: any) => void;
  onSetFinishFunc: (fn: any) => void;
  resetWizard: () => void;
}

interface WizardsContextProviderProps {
  children: ReactNode;
}

const wizardsContext = createContext<WizardsContextType>({
  wizardsData: [],
  activePage: 0,
  finishFunc: () => {},
  onNext: () => {},
  onPrevious: () => {},
  onSkip: () => {},
  onSetWizardsData: (data) => {},
  onSetFinishFunc: () => {},
  resetWizard: () => {},
});

export const WizardsContextProvider: React.FC<WizardsContextProviderProps> = ({
  children,
}) => {
  const [wizardsData, setWizardsData] = useState<any>([]);
  const [activePage, setActivePage] = useState(1);
  const [finishFunc, setFinishFunc] = useState<any>(null);

  // console.log(wizardsData);

  const current = wizardsData[activePage - 1];

  const onNext = () => {
    if (
      activePage < wizardsData.length &&
      current.validationFn(current.answer)
    ) {
      setActivePage((prevPage) => prevPage + 1);
      setWizardsData((prevData: any) =>
        prevData.map((item: any, index: number) => {
          if (index === activePage - 1) {
            return {
              ...item,
              error: null,
            };
          } else {
            return item;
          }
        })
      );
    } else {
      setWizardsData((prevData: any) =>
        prevData.map((item: any, index: number) => {
          if (index === activePage - 1) {
            return {
              ...item,
              error: true,
            };
          } else {
            return item;
          }
        })
      );
    }
  };

  const onPrevious = () => {
    if (activePage > 1) {
      setActivePage((prevPage) => prevPage - 1);
    }
  };

  const onSkip = () => {
    setActivePage((prevPage) => prevPage + 1);
  };

  const onSetWizardsData = (data: any) => {
    setWizardsData(data);
  };

  const onSetFinishFunc = (fn: any) => {
    setFinishFunc(() => fn);
  };

  const resetWizard = () => {
    setActivePage(1);
  };

  const contextValue: WizardsContextType = {
    wizardsData,
    activePage,
    onNext,
    onPrevious,
    onSkip,
    onSetWizardsData,
    finishFunc,
    onSetFinishFunc,
    resetWizard,
  };

  return (
    <wizardsContext.Provider value={contextValue}>
      {children}
    </wizardsContext.Provider>
  );
};

export const useWizardsContext = () => {
  const ctx: WizardsContextType = useContext(wizardsContext);

  return ctx;
};
