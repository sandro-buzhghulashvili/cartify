import { IconStar } from '@/components/icons/Icons';
import { useEffect, useState } from 'react';

interface PopularFilterProps {
  onUpdate: (filter: string, value: string | number | boolean) => void;
}

const PopularFilter: React.FC<PopularFilterProps> = ({ onUpdate }) => {
  const [popularFilters, setPopularFilters] = useState({
    rating: false,
    superSeller: false,
    sale: false,
  });

  useEffect(() => {
    onUpdate('popularFilters', JSON.stringify(popularFilters));
  }, [popularFilters]);

  return (
    <div>
      <p className="text-sm font-medium mb-5">Popular Filter</p>
      <ul className="flex flex-col gap-3">
        <li className="flex items-center gap-4">
          <input
            checked={popularFilters.rating}
            className="size-5 border-[1px] border-[#C4CDD5]"
            type="checkbox"
            id="rating-4+"
            onChange={() =>
              setPopularFilters((prevFilters) => ({
                ...prevFilters,
                rating: !prevFilters.rating,
              }))
            }
          />
          <label htmlFor="rating-4+" className="flex items-center gap-2">
            <IconStar className="size-4 fill-primary-yellow" />
            <span className="text-teritary-gray font-normal text-base">
              4 star or upper
            </span>
          </label>
        </li>

        <li className="flex items-center gap-4">
          <input
            checked={popularFilters.superSeller}
            className="size-5 border-[1px] border-[#C4CDD5]"
            type="checkbox"
            id="super-seller"
            onChange={() =>
              setPopularFilters((prevFilters) => ({
                ...prevFilters,
                superSeller: !prevFilters.superSeller,
              }))
            }
          />
          <label htmlFor="super-seller" className="flex items-center gap-2">
            <span className="text-teritary-gray font-normal text-base">
              Super Seller
            </span>
          </label>
        </li>
        <li className="flex items-center gap-4">
          <input
            checked={popularFilters.sale}
            className="size-5 border-[1px] border-[#C4CDD5]"
            type="checkbox"
            id="sale"
            onChange={() =>
              setPopularFilters((prevFilters) => ({
                ...prevFilters,
                sale: !prevFilters.sale,
              }))
            }
          />
          <label htmlFor="sale" className="flex items-center gap-2">
            <span className="text-teritary-gray font-normal text-base">
              Sale Products
            </span>
          </label>
        </li>
      </ul>
    </div>
  );
};

export default PopularFilter;
