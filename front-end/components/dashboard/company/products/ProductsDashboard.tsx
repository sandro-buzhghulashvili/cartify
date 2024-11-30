'use client';

import { getProducts } from '@/api/products';
import LoadingScreen from '@/components/shared/loaders/LoadingScreen';
import { useQuery } from 'react-query';
import SortNav from './SortNav';
import FilterMenu from './FilterMenu';
import { createPriceRanges } from '@/helpers/ranges';
import ProductList from './ProductList';

import Image from 'next/image';
import Link from 'next/link';
import { IconPlus, IconSuitcase } from '@/components/icons/Icons';
import { useEffect, useState } from 'react';

const ProductsDashboard: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const [filters, setFilters] = useState<any>(null);
  const {
    data: products,
    isLoading: productsAreLoading,
    isError: productsHasError,
    error: productsError,
  } = useQuery({
    queryFn: getProducts,
  });

  const handleSearch = (searchTerm: string) => {
    const searchFn = (title: string) =>
      title.toLowerCase().includes(searchTerm.toLowerCase());
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      title: searchFn,
    }));
  };

  const handleSort = (sortOption: any) => {
    setFilteredProducts((products: any[]) => sortOption.sortFn(products));
  };

  useEffect(() => {
    if (filters) {
      let filteredProducts =
        filters &&
        products.filter((product: any) => {
          const filterEntries = Object.entries(product).filter(
            ([key, value]) => key in filters
          );

          if (
            filterEntries.every(([key, value]: [key: string, value: any]) => {
              if (key === 'types') {
                return value.some((val: any) => filters[key](val));
              } else {
                return filters[key](value);
              }
            })
          ) {
            return product;
          }
        });
      setFilteredProducts(filteredProducts);
    }
  }, [filters]);

  if (products?.length === 0) {
    return (
      <div className="w-full flex flex-col gap-5 justify-center items-center">
        <Image
          src="/illustrations/not-found.png"
          width={350}
          height={350}
          alt="not found illustration"
        />
        <h1 className="text-2xl w-1/2 text-center text-primary-black font-bold leading-9">
          Found no products.
        </h1>
        <p className="text-secondary-gray text-sm font-medium">
          Maybe add one ?
        </p>
        <Link
          replace={true}
          href="/company-add-product"
          className={`px-8 py-2 duration-300 text-white text-sm rounded-lg font-bold bg-primary-indigo relative flex items-center gap-5`}
        >
          Add new product <IconPlus className="fill-white size-5" />
        </Link>
      </div>
    );
  }

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
        Error occured : {productsError as string}
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

  const handleFilter = (data: any) => {
    setFilters(data);
  };

  //   console.log(productTypes);
  //   console.log(JSON.parse(products[0]?.specifications));
  return (
    <div className="w-full px-[5%]">
      <SortNav onSearch={handleSearch} onSort={handleSort} />
      <FilterMenu
        categories={productTypes}
        priceRange={priceRanges}
        productClasses={productClasses}
        onFilter={handleFilter}
      />
      <ProductList products={filteredProducts || []} />
    </div>
  );
};

export default ProductsDashboard;
