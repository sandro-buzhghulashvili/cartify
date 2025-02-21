import { searchProducts } from '@/api/searches';
import Link from 'next/link';
import { useQuery } from 'react-query';
import LoadingScreen from '../shared/loaders/LoadingScreen';
import { Product } from '@/utils/validateProduct';
import Image from 'next/image';
import { IconChevronRight } from '../icons/IconChevronRight';
import { useEffect, useState } from 'react';

interface SearchedProductsProps {
  searchTerm: string;
  onClose: () => void;
}

const SearchedProducts: React.FC<SearchedProductsProps> = ({
  searchTerm,
  onClose,
}) => {
  const {
    data: searchedProducts,
    isError: couldNotFetchProducts,
    isLoading: fetchingProducts,
    error: productsError,
  } = useQuery({
    queryKey: ['searched-products-panel', searchTerm],
    queryFn: () => searchProducts(searchTerm),
  });

  const productCategoriesSet: any = new Set();
  const [activeCategory, setActiveCategory] = useState<null | string>(null);

  if (searchedProducts?.products) {
    (searchedProducts?.products as Product[]).forEach((product) =>
      productCategoriesSet.add(product.category)
    );
  }
  const filteredProducts =
    searchedProducts?.products?.length > 0 && activeCategory
      ? searchedProducts.products.filter(
          (product: Product) => product.category === activeCategory
        )
      : searchedProducts?.products;

  if (fetchingProducts) {
    return (
      <div className="py-5 flex justify-center">
        <LoadingScreen className="size-[50px]" />
      </div>
    );
  }

  if (couldNotFetchProducts) {
    return (
      <div className="py-5 flex items-center gap-3 justify-center">
        <p className="font-medium text-base text-red-500">
          {(productsError as Error)?.message}
        </p>
      </div>
    );
  }

  if (searchedProducts?.products?.length === 0) {
    return (
      <div className="py-5 flex justify-center">
        <h1 className="text-primary-black font-medium text-base">
          Found no product for "{searchTerm}"
        </h1>
      </div>
    );
  }

  return (
    <div className="text-primary-black flex flex-col gap-5 ">
      <div className="flex justify-between items-center">
        <h1 className="text-base font-medium">Filter category</h1>
        <Link
          href={`/products?searchTerm=${searchTerm}`}
          className="text-base font-medium text-primary-purple"
          onClick={onClose}
        >
          See all
        </Link>
      </div>
      {[...productCategoriesSet].length > 0 && (
        <div
          className={`flex ${
            [...productCategoriesSet].length > 5
              ? 'justify-start'
              : 'justify-center'
          } items-center gap-5 overflow-x-auto py-3`}
        >
          {[...productCategoriesSet].map((category: string, index) => (
            <button
              className={`flex-shrink-0 w-fit px-5 duration-100 py-2 text-sm font-normal bg-gray-100 rounded-xl cursor-pointer md:hover:text-primary-purple ${
                category === activeCategory
                  ? 'bg-primary-purple text-white font-bold md:hover:text-white'
                  : null
              }`}
              key={index}
              onClick={() => {
                if (category === activeCategory) {
                  setActiveCategory(null);
                } else {
                  setActiveCategory(category);
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      <ul className="flex flex-col gap-4 px-2 max-h-[400px] overflow-y-auto">
        {(filteredProducts as Product[]).map((product) => (
          <li key={product._id}>
            <Link
              href={`/products/${product._id}`}
              className="flex justify-between cursor-pointer items-center  bg-gray-100 py-2 px-3 rounded-lg"
              onClick={onClose}
            >
              <section className="flex items-center gap-2">
                <Image
                  className="size-[38px] object-contain"
                  width={38}
                  height={38}
                  src={product.images[0]}
                  alt={`${product.title}`}
                />
                <div>
                  <h1 className="text-sm text-medium text-secondary-gray">
                    {product.title.length > 35
                      ? `${product.title.slice(0, 35)} ...`
                      : product.title}
                  </h1>
                  {product.discount !== 0 &&
                  typeof product.discount !== 'number' &&
                  new Date(product.discount.endDate).getTime() >
                    new Date().getTime() ? (
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-primary-purple">
                        {(
                          product.price *
                          ((100 - Number(product.discount.percentage)) / 100)
                        ).toFixed(2)}
                        $
                      </p>
                      <p className="text-xs font-medium secondary-primary-gray line-through">
                        {product.price.toFixed(2)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm font-bold text-secondary-gray">
                      {product.price.toFixed(2)}$
                    </p>
                  )}
                </div>
              </section>
              <button>
                <IconChevronRight />
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchedProducts;
