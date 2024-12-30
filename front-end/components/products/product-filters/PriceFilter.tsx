import { IconDollar } from '@/components/icons/IconDollar';
import { useEffect, useState } from 'react';

interface PriceFilterProps {
  ranges: string[];
  onUpdate: (filter: string, value: string | number | boolean) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ ranges, onUpdate }) => {
  const [priceFilter, setPriceFilter] = useState({
    min: 0,
    max: 0,
  });

  const handlePriceFilter = (minimum: number, maximum: number) => {
    setPriceFilter({
      min: minimum,
      max: maximum,
    });
  };

  useEffect(() => {
    onUpdate('price', JSON.stringify(priceFilter));
  }, [priceFilter]);
  return (
    <div className="text-primary-black">
      <h1 className="text-sm font-medium mb-5">Price Value</h1>
      <div className="flex flex-col gap-3 mb-5">
        <div className="relative">
          <input
            type="number"
            placeholder="Set Min. Price"
            className="pl-12 pr-8 py-2 focus:outline-none border-[1px] border-[#F4F6F8] rounded-lg"
            min={0}
            onChange={(e) =>
              handlePriceFilter(Number(e.target.value), priceFilter.max)
            }
            value={priceFilter.min}
          />
          <span className="absolute top-0 bottom-0 left-0 my-auto !size-10 flex justify-center items-center bg-[#F4F6F8] rounded-lg">
            <IconDollar className="size-5" />
          </span>
        </div>
        <div className="relative">
          <input
            type="number"
            placeholder="Set Max. Price"
            min={0}
            className="pl-12 pr-8 py-2 focus:outline-none border-[1px] border-[#F4F6F8] rounded-lg"
            onChange={(e) =>
              handlePriceFilter(priceFilter.min, Number(e.target.value))
            }
            value={priceFilter.max}
          />
          <span className="absolute top-0 bottom-0 left-0 my-auto !size-10 flex justify-center items-center bg-[#F4F6F8] rounded-lg">
            <IconDollar className="size-5" />
          </span>
        </div>
      </div>
      <ul className="flex flex-wrap gap-3">
        {ranges.map((range, index) => (
          <li key={index}>
            <button
              onClick={() => {
                handlePriceFilter(
                  Number(range.split('-')[0].replace('$', '')),
                  Number(range.split('-')[1].replace('$', ''))
                );
              }}
              className="px-4 py-2 text-teritary-gray border-[1px] border-[#F4F6F8] rounded-xl hover:text-primary-indigo"
            >
              {range}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceFilter;
