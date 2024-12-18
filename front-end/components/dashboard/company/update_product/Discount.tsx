import { IconDiscount } from '@/components/icons/Icons';
import useInput from '@/hooks/useInput';
import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import { string } from 'zod';

export interface DiscountObject {
  percentage: string;
  endDate: Date;
}

interface DiscountProps {
  availableDiscount: string | DiscountObject;
  onDiscountChange: (newDiscount: string | DiscountObject) => void;
}

interface endDateType {
  date: Date;
  isTouched: boolean;
}

const Discount: React.FC<DiscountProps> = ({
  availableDiscount,
  onDiscountChange,
}) => {
  const [endDate, setEndDate] = useState<endDateType>({
    date:
      typeof availableDiscount !== 'string'
        ? availableDiscount.endDate
        : new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    isTouched: false,
  });
  const {
    value: discount,
    hasError: discountHasError,
    isValid: discountIsValid,
    handleValueChange: handleDiscountChange,
    blurHandler: handleDiscountBlur,
  } = useInput({
    validationFn: (val: string) =>
      !isNaN(Number(val)) && Number(val) >= 0 && Number(val) < 100,
    defaultValue:
      typeof availableDiscount === 'string'
        ? '0'
        : availableDiscount.percentage,
  });

  const dateIsValid =
    endDate.date instanceof Date &&
    endDate.date.getTime() > new Date().getTime();

  const handleEndDate = (date: Date | null) => {
    if (date) {
      setEndDate((prevDate) => ({ ...prevDate, date }));
    }
  };

  useEffect(() => {
    if (discount === '0') {
      onDiscountChange(discount);
    } else {
      onDiscountChange({
        percentage: discount,
        endDate: endDate.date,
      });
    }
  }, [discount, endDate]);
  return (
    <div className="flex items-center flex-col gap-5 text-primary-black shadow-2xl px-3 py-5 rounded-xl">
      <div className="flex gap-3 items-center">
        <IconDiscount className="size-7" />
        <h1 className="text-lg font-medium">Apply discount:</h1>
      </div>
      <div className="w-1/3 flex items-center gap-2">
        <p className="text-xl font-bold">%</p>
        <input
          type="number"
          value={discount}
          onChange={handleDiscountChange}
          onBlur={handleDiscountBlur}
          className={`border-[1px] border-primary-black w-full p-1 px-2 rounded-lg focus:outline-none ${
            discountHasError ? 'border-red-500 !border-2' : null
          }`}
        />
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-lg font-medium">End date : </p>
        <div className=" text-center">
          <DatePicker
            className={`focus:outline-none text-center p-3 border-[1px] border-primary-black w-2/3 rounded-lg cursor-pointer disabled:opacity-50 disabled:!cursor-not-allowed ${
              endDate.isTouched && !dateIsValid
                ? 'border-red-500 !border-2'
                : null
            }`}
            disabled={!discountIsValid || discount == '0'}
            selected={endDate.date}
            onChange={(date) => handleEndDate(date)}
            onBlur={() =>
              setEndDate((prevDate) => ({ ...prevDate, isTouched: true }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Discount;
