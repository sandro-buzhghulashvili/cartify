import { IconLoupe, IconPlus } from '@/components/icons/Icons';
import Link from 'next/link';
import { ChangeEvent, useEffect, useRef } from 'react';
import Select from 'react-select';

interface SortNavProps {
  onSearch: (searchTerm: string) => void;
  onSort: (sortOption: any) => void;
}

const SortNav: React.FC<SortNavProps> = ({ onSearch, onSort }) => {
  const sortOptions = [
    {
      value: 'default',
      label: 'Default',
      sortFn: (products: any[]) => [...products],
    },
    {
      value: 'price',
      label: 'Price',
      sortFn: (products: any[]) =>
        [...products].sort((a, b) => a.price - b.price),
    },
    {
      value: 'date',
      label: 'Date',
      sortFn: (products: any[]) =>
        [...products].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
    },
  ];

  return (
    <nav className="flex items-center justify-between p-5 rounded-lg shadow-bottom-shadow">
      <div className="flex items-center gap-5">
        {/* search bar */}
        <section>
          <div className="relative">
            <input
              type="text"
              placeholder="Search product ..."
              className="bg-gray-100 px-8 py-2 rounded-lg pl-12 text-base focus:outline-none"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onSearch(event.target.value)
              }
            />
            <IconLoupe className="absolute top-0 bottom-0 left-2 my-auto size-5 stroke-primary-black" />
          </div>
        </section>
        {/* sorting options */}
        <section>
          <div className="flex items-center gap-2 bg-gray-100 px-8 h-[40px]">
            <p>Sort By :</p>
            <Select
              options={sortOptions}
              defaultValue={sortOptions[0]}
              styles={{
                control: (styles: any) => ({
                  ...styles,
                  border: 'none',
                  backgroundColor: '#f3f4f6',
                  outline: 'none',
                  boxShadow: 'none',
                  fontWeight: 'bold',
                  padding: '0',
                  fontSize: '14px',
                  '&:hover': {},
                }),
                option: (styles, state) => ({
                  ...styles,
                  backgroundColor: '#f3f4f6',
                  color: '#161D25',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  '&:active': {
                    backgroundColor: '#f3f4f6',
                  },
                }),
              }}
              onChange={(selected) => onSort(selected)}
            />
          </div>
        </section>
      </div>
      {/* add product button */}
      <Link
        href="/company-add-product"
        replace
        className="flex items-center gap-5 font-medium text-base bg-primary-purple rounded-lg px-8 py-2 text-white"
      >
        <IconPlus className="fill-white size-5" />
        Add Product
      </Link>
    </nav>
  );
};

export default SortNav;
