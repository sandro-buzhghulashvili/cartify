'use client';

import { getProducts } from '@/api/products';
import LoadingScreen from '@/components/shared/loaders/LoadingScreen';
import { useQuery } from 'react-query';
import SortNav from './SortNav';
import FilterMenu from './FilterMenu';
import { createPriceRanges } from '@/helpers/ranges';

const ProductsDashboard: React.FC = () => {
  const {
    data: products,
    isLoading: productsAreLoading,
    isError: productsHasError,
    error: productsError,
  } = useQuery({
    queryFn: getProducts,
  });

  if (productsAreLoading || !products?.length) {
    return (
      <div className="w-full flex justify-center items-center">
        <LoadingScreen />
      </div>
    );
  }

  if (productsHasError) {
    // Handle error state or empty products
    return (
      <div className="w-full flex justify-center items-center">
        No products found.
      </div>
    );
  }

  const productTypes = Array.from(
    new Set(products?.flatMap((prod: any) => prod.types))
  );

  const priceRanges = createPriceRanges(
    Math.min(...products.map((prod: any) => Math.floor(prod.price))),
    Math.max(...products.map((prod: any) => Math.ceil(prod.price))),
    4
  );

  const productClasses = Array.from(
    new Set(products.map((prod: any) => prod.product_type))
  );
  console.log(productClasses);

  //   console.log(productTypes);
  //   console.log(JSON.parse(products[0]?.specifications));
  return (
    <div className="w-full px-[5%]">
      <SortNav />
      <FilterMenu
        categories={productTypes}
        priceRange={priceRanges}
        productClasses={productClasses}
      />
    </div>
  );
};

export default ProductsDashboard;
