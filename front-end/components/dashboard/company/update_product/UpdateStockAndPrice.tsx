import useInput from '@/hooks/useInput';
import Discount, { DiscountObject } from './Discount';
import { useEffect, useState } from 'react';

interface UpdateStockAndPriceProps {
  defaultStock: string;
  defaultPrice: string;
  defaultDiscount: string | DiscountObject;
  onUpdate: (
    stock: number,
    price: number,
    discount: number | DiscountObject
  ) => void;
}

const UpdateStockAndPrice: React.FC<UpdateStockAndPriceProps> = ({
  defaultStock,
  defaultPrice,
  defaultDiscount,
  onUpdate,
}) => {
  const [discount, setDiscount] = useState(defaultDiscount);

  const {
    value: stock,
    hasError: stockHasError,
    isValid: stockIsValid,
    handleValueChange: handleStockChange,
    blurHandler: handleStockBlur,
  } = useInput({
    validationFn: (val: string) =>
      typeof Number(val) == 'number' && Number(val) > 0,
    defaultValue: defaultStock,
  });

  const {
    value: price,
    hasError: priceHasError,
    isValid: priceIsValid,
    handleValueChange: handlePriceChange,
    blurHandler: handlePriceBlur,
  } = useInput({
    validationFn: (val: string) =>
      typeof Number(val) == 'number' && Number(val) > 0,
    defaultValue: defaultPrice,
  });

  const handleDiscountChange = (newDiscount: string | DiscountObject) => {
    setDiscount(newDiscount);
  };

  useEffect(() => {
    if (typeof discount === 'string') {
      onUpdate(Number(stock), Number(price), Number(discount));
    } else {
      onUpdate(Number(stock), Number(price), discount);
    }
  }, [stock, price, discount]);

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex items-center justify-center gap-7">
        <h1 className="font-medium text-xl">Stock :</h1>
        <input
          type="number"
          value={stock}
          onChange={handleStockChange}
          onBlur={handleStockBlur}
          className={`w-1/3 border-[1px] border-primary-black outline-none px-3 py-1 rounded-xl ${
            stockHasError ? 'border-red-500' : null
          }`}
        />
      </div>
      <div className="flex items-center gap-7 justify-center">
        <h1 className="font-medium text-xl">Price :</h1>
        <div className="flex items-center gap-2 w-1/3">
          <p className="font-medium text-xl">$</p>
          <input
            type="number"
            value={price}
            onChange={handlePriceChange}
            onBlur={handlePriceBlur}
            className={`w-full border-[1px] border-primary-black outline-none px-3 py-1 rounded-xl ${
              priceHasError ? 'border-red-500' : null
            }`}
          />
        </div>
      </div>
      {/* // discount */}
      <Discount
        availableDiscount={discount}
        onDiscountChange={handleDiscountChange}
      />
    </div>
  );
};

export default UpdateStockAndPrice;
