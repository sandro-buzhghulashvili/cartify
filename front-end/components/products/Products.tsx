'use client';

import { getAllItems } from '@/api/items';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from 'react-query';
import ProductHeader from './ProductsHeader';
import ProductsFilter from './product-filters/ProductsFilter';
import ProductList from './ProductsList';
import LoadingScreen from '../shared/loaders/LoadingScreen';
import LottiePopup from '../shared/popups/LottiePopup';
import ErrorLottie from '@/components/lotties/error.json';
import CompaniesList from './CompaniesList';

const Products: React.FC = () => {
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [layoutMode, setLayoutMode] = useState('grid');
  const [itemsType, setItemsType] = useState('products');

  const { searchTerm, ...filters } = queryParams;

  const {
    data: itemsData,
    isLoading: loadingProducts,
    refetch: refetchProducts,
    isSuccess: fetchedItems,
    isError: couldNotFetchProducts,
    error: productsError,
  } = useQuery({
    queryKey: ['products', filters, activePage, itemsPerPage, searchTerm],
    queryFn: () => getAllItems(filters, activePage, itemsPerPage, searchTerm),
  });

  const handlePageChange = (page: number) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLayoutChange = (layout: string) => {
    setLayoutMode(layout);
  };

  const handleItemsTypeChange = (type: string) => {
    setItemsType(type);
  };

  return (
    <div>
      <ProductHeader
        searchTerm={searchTerm}
        onLayoutChange={handleLayoutChange}
        layoutMode={layoutMode}
        activeItemsType={itemsType}
        onItemsTypeChange={handleItemsTypeChange}
      />
      <div className="py-16 flex justify-between">
        <ProductsFilter
          queryFilters={filters}
          onPageChange={handlePageChange}
          searchTerm={searchTerm}
        />
        {loadingProducts && (
          <div className="w-4/5 flex justify-center items-center h-full py-10">
            <LoadingScreen className="size-[100px]" />
          </div>
        )}
        {couldNotFetchProducts && (
          <div className="w-4/5 flex justify-center items-center h-full py-10">
            <LottiePopup
              className="flex flex-col items-center"
              lottieData={ErrorLottie}
              text={(productsError as Error).message}
            />
          </div>
        )}
        {fetchedItems &&
          (itemsType === 'products' ? (
            <ProductList
              products={itemsData.products}
              totalProducts={itemsData.productsCount}
              featuredCompanies={itemsData.featuredCompanies}
              activePage={activePage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              layoutMode={layoutMode}
            />
          ) : (
            <CompaniesList
              searchTerm={searchTerm}
              companies={itemsData.featuredCompanies}
              layoutMode={layoutMode}
            />
          ))}
      </div>
    </div>
  );
};

export default Products;
