import { formatNumber } from '@/helpers/number_helpers';
import { paginateArray } from '@/utils/paginateArray';
import { Product } from '@/utils/validateProduct';
import Image from 'next/image';
import { IconChevronRight } from '../icons/IconChevronRight';
import Link from 'next/link';
import { useRef, useState } from 'react';

interface Category {
  0: string;
  1: {
    image: string;
    label: string;
    products: {
      [key: string]: Product[];
    };
    productsCount: number;
  };
}

interface CategoriesListProps {
  categories: Category[];
}

const CategoriesList: React.FC<CategoriesListProps> = ({
  categories: categoriesData,
}) => {
  const [activePage, setActivePage] = useState(1);
  const [itemsOnPage, setItemsOnPage] = useState(6);
  const categories = paginateArray(categoriesData, itemsOnPage, activePage);
  const categoryRef = useRef<HTMLUListElement>(null);

  const handlePageChange = (page: number) => {
    setActivePage(page);
    categoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  //   console.log('list component : ', categories);
  return (
    <div className=" !bg-white px-[10%]">
      <ul
        ref={categoryRef}
        className="flex justify-center flex-wrap gap-10 gap-x-10 px-5 3xl:gap-x-32 -translate-y-8 mb-10"
      >
        {categories.map((category, index) => (
          <li key={index} className="p-5 bg-white shadow-lg  flex-shrink-0">
            <Image
              src={category[1].image}
              width={310}
              height={180}
              alt={`thumb-${index}`}
              className="object-cover h-[180px]"
            />
            <div className="py-3 flex items-center justify-between">
              <h1 className="text-[22px] font-medium">{category[0]}</h1>
              <p className="text-sm font-normal text-light-blue">
                {formatNumber(category[1].productsCount)} items
              </p>
            </div>
            {category[1].productsCount === 0 ? (
              <p className="flex justify-center py-5 font-medium text-primary-indigo">
                Found no items.
              </p>
            ) : (
              <ul className="max-h-[180px] overflow-y-auto p-3 flex flex-col gap-5">
                {Object.entries(category[1].products).map(
                  ([key, products], index) => (
                    <li key={index} className="">
                      <Link
                        href="#"
                        className="flex group items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <IconChevronRight />
                          <p className="text-base font-normal group-hover:text-primary-purple">
                            {key}
                          </p>
                        </div>
                        <p className="text-sm font-normal text-primary-gray">
                          {products.length}
                        </p>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className="flex justify-center gap-5">
        {Array.from({
          length: Math.ceil(categoriesData.length / itemsOnPage),
        }).map((_, index) => (
          <button
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 bg-white border-2 border-primary-indigo text-primary-indigo font-medium rounded-lg hover:bg-primary-indigo hover:text-white duration-300 ${
              activePage === index + 1 ? '!bg-primary-indigo text-white' : null
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
