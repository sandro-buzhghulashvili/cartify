import { IconDiscount } from '@/components/icons/Icons';
import useInput from '@/hooks/useInput';
import { useEffect } from 'react';

interface DiscountProps {
  availableDiscount: null | string;
  onDiscountChange: (newDiscount: string) => void;
}

const Discount: React.FC<DiscountProps> = ({
  availableDiscount,
  onDiscountChange,
}) => {
  const {
    value: discount,
    hasError: discountHasError,
    isValid: discountIsValid,
    handleValueChange: handleDiscountChange,
    blurHandler: handleDiscountBlur,
  } = useInput({
    validationFn: (val: string) =>
      !isNaN(Number(val)) && Number(val) > 0 && Number(val) < 100,
    defaultValue: availableDiscount || '0',
  });

  useEffect(() => {
    onDiscountChange(discount);
  }, [discount]);
  return (
    <div className="flex items-center flex-col gap-5 text-primary-black">
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
    </div>
  );
};

export default Discount;
