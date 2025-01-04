import Link from 'next/link';
import {
  IconBurgerMenu,
  IconChevronRight,
  IconGrid,
  IconHome,
  IconProducts,
  IconStore,
} from '../icons/Icons';

interface ProductHeaderProps {
  searchTerm?: string;
  onLayoutChange: (layout: string) => void;
  layoutMode: string;
  onItemsTypeChange: (type: string) => void;
  activeItemsType: string;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  searchTerm,
  onLayoutChange,
  layoutMode,
  onItemsTypeChange,
  activeItemsType,
}) => {
  return (
    <div className="flex items-center text-primary-black justify-between py-10">
      <div className="flex flex-col gap-5">
        <section className="flex items-center gap-1">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-normal text-teritary-gray hover:text-primary-indigo hover:font-medium"
          >
            <IconHome />
            Home
            <IconChevronRight />
          </Link>
          <button className="flex items-center gap-2 text-base font-normal  hover:text-primary-indigo hover:font-medium text-primary-indigo">
            {searchTerm ? searchTerm.replace(/['"]/g, ' ') : 'Products'}
          </button>
        </section>
        {searchTerm && (
          <h1 className="text-3xl font-medium">
            Search result for {searchTerm}
          </h1>
        )}
      </div>
      <div className="flex items-center gap-10">
        <section className="p-2 rounded-lg flex  items-center gap-2 shadow-md">
          <button
            className={`bg-secondary-gray p-3 
             duration-300 rounded-lg ${
               layoutMode !== 'grid' ? 'bg-white' : null
             }`}
            onClick={() => onLayoutChange('grid')}
          >
            <IconGrid
              className={`${
                layoutMode !== 'grid' ? 'fill-secondary-gray' : 'fill-white'
              }`}
            />
          </button>
          <button
            className={`p-3 rounded-lg duration-300 ${
              layoutMode !== 'list' ? 'bg-white' : 'bg-secondary-gray'
            }`}
            onClick={() => onLayoutChange('list')}
          >
            <IconBurgerMenu
              className={`${
                layoutMode !== 'list' ? 'fill-secondary-gray' : 'fill-white'
              }`}
            />
          </button>
        </section>
        <section className="flex items-center gap-2">
          <button
            className={`flex items-center gap-3 border-[1px] border-primary-gray  rounded-lg text-white font-medium text-base px-4 py-2 ${
              activeItemsType === 'products'
                ? ' bg-secondary-gray text-white'
                : '!text-primary-gray'
            }`}
            onClick={() => onItemsTypeChange('products')}
          >
            <IconProducts
              className={`${
                activeItemsType === 'products'
                  ? 'fill-white'
                  : 'fill-primary-gray'
              }`}
            />
            Product
          </button>
          <button
            onClick={() => onItemsTypeChange('companies')}
            className={`flex items-center gap-3 border-[1px] border-primary-gray  rounded-lg text-white font-medium text-base px-4 py-2 ${
              activeItemsType === 'companies'
                ? ' bg-secondary-gray text-white'
                : '!text-primary-gray'
            }`}
          >
            <IconStore
              className={`${
                activeItemsType === 'companies'
                  ? 'fill-white'
                  : 'fill-primary-gray'
              }`}
            />
            Store
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductHeader;
