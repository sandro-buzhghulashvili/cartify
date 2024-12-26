import { IconHome, IconChevronRight } from '../icons/Icons';

const CategoriesHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-[10%]  py-24 bg-[#F9FAFB]">
      <section className="flex flex-col gap-5">
        <h1 className="font-medium text-4xl">Shop categories</h1>
        <p className="text-base font-normal text-primary-gray">
          Check all our categories to get what brand you needs
        </p>
      </section>
      <section className="flex items-center gap-1">
        <span className="flex items-center gap-2 text-base font-normal text-teritary-gray">
          <IconHome />
          Home
          <IconChevronRight />
        </span>
        <span className="flex items-center gap-2 text-base font-normal text-teritary-gray">
          Shop <IconChevronRight className="!fill-primary-gray" />
        </span>
        <span className=" text-base font-medium text-primary-indigo">
          All Categories
        </span>
      </section>
    </div>
  );
};

export default CategoriesHeader;
