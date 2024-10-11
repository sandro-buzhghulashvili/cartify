'use client';

import { useWizardsContext } from '@/contexts/WizardsContext';
import { ChangeEvent, useEffect, useState } from 'react';

const Address: React.FC = () => {
  const [isTouched, setIsTouched] = useState(false);
  const { wizardsData, activePage, onSetWizardsData } = useWizardsContext();
  const [addressValue, setAddressValue] = useState<string>(
    wizardsData[activePage - 1].answer || ''
  );

  const handleAddressValue = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressValue(event.target.value);
  };

  useEffect(() => {
    const updatedWizardsData = wizardsData?.map((data, index) => {
      if (index === activePage - 1 && isTouched) {
        if (data.validationFn(addressValue)) {
          return {
            ...data,
            error: null,
            answer: addressValue,
          };
        } else {
          return {
            ...data,
            error: true,
            answer: addressValue,
          };
        }
      } else {
        return data;
      }
    });
    onSetWizardsData(updatedWizardsData);
  }, [addressValue, isTouched, activePage]);

  return (
    <div className="flex flex-col gap-10 h-full justify-center">
      <div>
        <h1 className="text-3xl mb-3 font-medium text-primary-black">
          Enter Your Company's Location
        </h1>
        <p className="text-base font-medium text-primary-gray">
          Please provide your company's address for accurate shipping and
          billing purposes.
        </p>
      </div>
      <div>
        <input
          value={addressValue}
          onChange={handleAddressValue}
          onBlur={() => setIsTouched(true)}
          type="text"
          placeholder="Enter address"
          className={`w-1/2 px-8 py-3 rounded-[30px] focus:outline-none border-[1px] border-primary-gray mb-3 ${
            wizardsData[activePage - 1].error && '!border-2 border-red-500'
          }`}
        />
        {wizardsData[activePage - 1].error && (
          <p className={`max-w-[200px] px-5 text-sm font-medium text-red-600`}>
            {wizardsData[activePage - 1].error &&
              `${wizardsData[activePage - 1].errorMessage}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Address;
