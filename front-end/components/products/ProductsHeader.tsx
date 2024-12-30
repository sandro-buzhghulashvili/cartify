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
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ searchTerm }) => {
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
          <button className="bg-secondary-gray p-3 rounded-lg">
            <IconGrid />
          </button>
          <button className="p-3 rounded-lg">
            <IconBurgerMenu />
          </button>
        </section>
        <section className="flex items-center gap-2">
          <button className="flex items-center gap-3  rounded-lg text-white font-medium text-base bg-secondary-gray px-4 py-2">
            <IconProducts />
            Product
          </button>
          <button className="flex items-center gap-3 rounded-lg text-primary-gray px-4 py-2 border-[1px] border-primary-gray">
            <IconStore />
            Store
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductHeader;
