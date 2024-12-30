'use client';

import { getAllItems } from '@/api/items';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from 'react-query';
import ProductHeader from './ProductsHeader';
import ProductsFilter from './product-filters/ProductsFilter';

const Products: React.FC = () => {
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { searchTerm, ...filters } = queryParams;

  const {
    data: itemsData,
    isLoading: loadingProducts,
    refetch: refetchProducts,
    isSuccess: fetchedProducts,
  } = useQuery({
    queryKey: ['products', filters, activePage, itemsPerPage],
    queryFn: () => getAllItems(filters, activePage, itemsPerPage),
  });

  if (fetchedProducts) {
    console.log(itemsData);
  }

  return (
    <div>
      <ProductHeader searchTerm={searchTerm} />
      <div className="py-16 flex justify-between">
        <ProductsFilter queryFilters={filters} />
      </div>
    </div>
  );
};

export default Products;
