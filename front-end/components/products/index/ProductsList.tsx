import { Product } from '@/utils/validateProduct';
import { useSearchParams } from 'next/navigation';
import Select from 'react-select';

export interface FeaturedCompany {
  averageRating: number;
  id: string;
  name: string;
  logo: string;
  sells: number;
}

interface ProductListProps {
  products: Product[];
  totalProducts: number;
  featuredCompanies: FeaturedCompany[];
  activePage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  layoutMode: string;
}

import Image from 'next/image';
import {
  IconStore,
  IconStar,
  IconHeart,
  IconFeatured,
  IconCart,
} from '@/components/icons/Icons';
import { formatNumber } from '@/helpers/number_helpers';
import FeaturedCompany from './FeaturedCompany';
import Link from 'next/link';

const ProductList: React.FC<ProductListProps> = ({
  products: productsData,
  totalProducts,
  featuredCompanies,
  activePage,
  itemsPerPage,
  onPageChange,
  layoutMode,
}) => {
  const products = productsData.sort((a, b) => {
    if (typeof a.rating !== 'number' && typeof b.rating !== 'number') {
      return b.rating.average - a.rating.average;
    } else {
      return 0;
    }
  });

  const searchParams = useSearchParams();
  const { searchTerm } = Object.fromEntries(searchParams.entries());

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const featuredCompany = featuredCompanies.sort(
    (a, b) => b.sells - a.sells
  )[0];

  if (products.length === 0) {
    return (
      <div className="w-full flex flex-col items-center pt-20 gap-5">
        <Image
          src="/illustrations/not-found.png"
          width={300}
          height={300}
          alt="not-found"
          className="size-[300px]"
        />
        <h1 className="text-xl font-medium">Found no products</h1>
      </div>
    );
  }

  return (
    <div className="w-4/5 px-10 flex flex-col gap-5">
      <section className="flex items-center justify-between">
        <p className="text-base text-teritary-gray font-normal">
          Shown 1/{products.length} item from {totalProducts} total items
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </section>
      <ul className="flex flex-wrap gap-10 justify-center">
        {/* // featured company */}
        {featuredCompany && (
          <FeaturedCompany company={featuredCompany} layoutMode={layoutMode} />
        )}
        {products.map((product, index) => (
          <Link
            href={`/products/${product._id}`}
            key={product._id}
            className={`relative group peer rounded-md flex p-5 ${
              layoutMode === 'grid' ? 'w-[30%]' : 'w-[50%]'
            } text-primary-black flex-col items-center justify-around gap-3 h-[340px] overflow-y-auto`}
            style={{
              backgroundColor:
                products.length > 2
                  ? index === 0
                    ? 'rgba(80,184,60,0.1)'
                    : index === 1
                    ? 'rgba(0,111,187,0.1)'
                    : 'white'
                  : 'white',
            }}
          >
            {/* add to favorites button */}
            <button
              className="absolute z-[5] top-2 right-2 p-3 rounded-full bg-white shadow-md group/button "
              onClick={(e) => {
                e.preventDefault(); // Ensure this is correctly stopping propagation
                // Add your favorite functionality here
              }}
            >
              <IconHeart className="size-5 fill-[#C4CDD5] group-hover/button:fill-primary-red duration-300" />
            </button>
            <div className="py-5">
              <Image
                width={180}
                height={120}
                className="h-[120px] w-[180px] object-contain"
                src={product.images[0]}
                alt={`${product.title}`}
              />
            </div>

            <div className="w-full flex items-center justify-between">
              <div className="text-base font-medium text-primary-green">
                {product.discount !== 0 ? (
                  <>
                    <p className="text-primary-red line-through">
                      ${product.price.toFixed(2)}
                    </p>
                    <p>
                      $
                      {typeof product.discount !== 'number' &&
                        (
                          (product.price *
                            (100 - Number(product.discount.percentage))) /
                          100
                        ).toFixed(2)}
                    </p>
                  </>
                ) : (
                  <p>${product.price.toFixed(2)}</p>
                )}
              </div>
              {product.discount !== 0 && (
                <span className="px-2 py-1 bg-red-200 font-medium text-primary-red rounded-md">
                  SALE
                </span>
              )}
            </div>
            <h1 className="font-medium text-lg w-full group-hover:text-primary-purple duration-300">
              {product.title}
            </h1>
            <section className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1">
                <IconStore className="size-5 fill-primary-gray" />
                <span className="text-xs font-normal text-primary-gray">
                  {product.companyDetails?.name}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <IconStar className="size-5 fill-primary-yellow" />
                <span className="text-sm font-normal">
                  {typeof product.rating === 'number'
                    ? product.rating.toFixed(1)
                    : product.rating.average.toFixed(1)}
                </span>
              </div>
            </section>
          </Link>
        ))}
      </ul>
      {/* pagination buttons */}
      <div className="py-10 flex justify-center items-center gap-5">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            onClick={() => onPageChange(i + 1)}
            key={i}
            className={`px-5 py-2 border-[1px] border-primary-purple text-primary-purple rounded-md md:hover:bg-primary-purple md:hover:text-white duration-300 ${
              i + 1 === activePage && 'bg-primary-purple text-white'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
