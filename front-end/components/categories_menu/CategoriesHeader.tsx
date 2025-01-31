import Link from 'next/link';
import { IconHome, IconChevronRight } from '../icons/Icons';

interface CategoriesHeaderProps {
  onClose: () => void;
}

const CategoriesHeader: React.FC<CategoriesHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between px-[10%]  py-24 bg-[#F9FAFB]">
      <section className="flex flex-col gap-5">
        <h1 className="font-medium text-4xl">Shop categories</h1>
        <p className="text-base font-normal text-primary-gray">
          Check all our categories to get what brand you needs
        </p>
      </section>
      <section className="flex items-center gap-1">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-2 text-base font-normal text-teritary-gray hover:text-primary-indigo hover:font-medium"
        >
          <IconHome />
          Home
          <IconChevronRight />
        </Link>
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-base font-normal text-teritary-gray hover:text-primary-indigo hover:font-medium"
        >
          Shop <IconChevronRight className="!fill-primary-gray" />
        </button>
        <Link
          onClick={onClose}
          href="/products"
          className=" text-base font-medium text-primary-indigo"
        >
          All Categories
        </Link>
      </section>
    </div>
  );
};

export default CategoriesHeader;
