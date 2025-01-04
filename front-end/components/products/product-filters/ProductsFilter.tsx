import LoadingScreen from '@/components/shared/loaders/LoadingScreen';
import { IconStar } from '../../icons/IconStar';
import CategoriesFilter from './CategoriesFilter';
import PopularFilter from './PopularFilter';
import { useQuery } from 'react-query';
import { getItemCategories } from '@/api/items';
import PriceFilter from './PriceFilter';
import ColorFilter from './ColorFilter';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { on } from 'events';

interface ProductsFilterProps {
  queryFilters: {
    [key: string]: string | number | boolean;
  };
  onPageChange: (page: number) => void;
}

const ProductsFilter: React.FC<ProductsFilterProps> = ({
  queryFilters,
  onPageChange,
}) => {
  const [filters, setFilters] = useState({ ...queryFilters });
  const router = useRouter();
  const {
    data: itemCategories,
    isLoading: fetchingCategories,
    error: categoriesError,
    isError: couldNotFetchCategories,
    isSuccess: fetchedCategories,
  } = useQuery({
    queryKey: ['item-categories'],
    queryFn: getItemCategories,
  });

  const onUpdateFilter = (filter: string, value: string | number | boolean) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: value,
    }));
  };

  const handleSearch = () => {
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    );

    const queryString = new URLSearchParams(
      validFilters as Record<string, string>
    ).toString();

    onPageChange(1);
    router.push(`/products?${queryString}`);
  };

  if (fetchingCategories) {
    return (
      <div className="py-5 flex justify-center">
        <LoadingScreen className="size-[50px]" />
      </div>
    );
  }

  if (couldNotFetchCategories) {
    return (
      <div className="py-5 flex items-center gap-3">
        <p className="font-medium text-base text-red-500">
          {(categoriesError as Error)?.message}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 text-primary-black w-1/5">
      <h1 className="font-medium text-[20px]">Filter Options</h1>
      <PopularFilter onUpdate={onUpdateFilter} />
      {fetchedCategories && (
        <>
          <CategoriesFilter
            categories={itemCategories.categories}
            onUpdate={onUpdateFilter}
          />
          <PriceFilter
            ranges={itemCategories.priceRanges}
            onUpdate={onUpdateFilter}
          />
          <ColorFilter
            colors={itemCategories.colors}
            onUpdate={onUpdateFilter}
          />
        </>
      )}
      <section className="flex justify-center py-5">
        <button
          className="px-10 py-2 bg-primary-purple text-white font-medium rounded-lg"
          onClick={handleSearch}
        >
          Search
        </button>
      </section>
    </div>
  );
};

export default ProductsFilter;
