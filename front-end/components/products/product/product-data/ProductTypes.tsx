'use client';

import { ProductType } from '@/components/wizards/company-add-product/MainTypes';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Select = dynamic(() => import('react-select'), { ssr: false });

interface ProductTypesProps {
  types: ProductType[];
  colors: string[];
  quantitiy: number;
  onUpdateType: (newType: ProductType) => void;
  onUpdateQuantity: (newQuantity: number) => void;
}

const ProductTypes: React.FC<ProductTypesProps> = ({
  types,
  colors,
  quantitiy,
  onUpdateType,
  onUpdateQuantity,
}) => {
  const [amount, setAmount] = useState(1);
  const typeOptions = types
    .map((type) => ({
      label: type.type,
      value: {
        ...type,
      },
    }))
    .sort((a, b) => a.value.addition - b.value.addition);

  const [activeType, setActiveType] = useState<any>(typeOptions[0]);

  const handleChangeAmount = (amount: string) => {
    const am = Number(amount);
    if (!isNaN(am)) {
      if (am <= quantitiy && am >= 1) {
        setAmount(am);
      }
    }
  };

  useEffect(() => {
    onUpdateType(activeType.value);
  }, [activeType]);

  useEffect(() => {
    onUpdateQuantity(amount);
  }, [amount]);

  return (
    <div className="flex items-center gap-10 py-5">
      <section className="flex flex-col gap-2">
        <label>Type</label>
        <Select
          value={activeType}
          onChange={(selected: any) => setActiveType(selected)}
          options={typeOptions}
          styles={{
            container: (base) => ({
              ...base,
              width: '150px',
            }),
            control: (styles: any) => ({
              ...styles,
              outline: 'none',
              boxShadow: 'none',
              padding: '0 5px',
              border: '1px solid #F9FAFB',
              backgroundColor: '#F9FAFB',

              '&:hover': {
                border: '1px solid #F9FAFB',
              },
            }),
            option: (styles, state) => ({
              ...styles,
              backgroundColor:
                state.isFocused || state.isSelected
                  ? '#43467F'
                  : styles.backgroundColor,
              color: state.isFocused ? 'white' : styles.color,
              '&:hover': {
                backgroundColor: '#43467F',
              },
            }),
          }}
        />
      </section>
      <section className="flex flex-col gap-2">
        <label htmlFor="type">Quantity</label>
        <input
          type="number"
          className="w-[60px] min-h-[38px] bg-[#F9FAFB] px-[13px] py-[2px] focus:outline-none"
          value={amount}
          onChange={(e) => handleChangeAmount(e.target.value)}
        />
      </section>
      <section className="flex flex-col gap-2 px-3">
        <label htmlFor="type">Color{colors.length > 1 ? 's' : ''}</label>
        <ul className="flex items-center gap-5">
          {colors.map((color, index) => (
            <li
              key={index}
              className="flex items-center gap-5 min-h-[38px] px-5 py-2 rounded-lg bg-[#F9FAFB]"
            >
              <span
                style={{
                  backgroundColor: color,
                }}
                className="size-5 rounded-full border-[1px] border-primary-black"
              ></span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ProductTypes;
