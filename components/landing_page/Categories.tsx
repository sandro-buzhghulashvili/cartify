import { formatNumber } from '@/helpers/number_helpers';
import { DUMMY_CATEGORIES } from '@/helpers/DUMMY_DATA';

const Categories: React.FC = () => {
  return (
    <div className="py-20 mb-32">
      <h1 className="text-2xl mb-10 font-medium text-primary-black">
        Category
      </h1>
      <ul className="flex justify-between flex-wrap">
        {DUMMY_CATEGORIES.map((category, index) => (
          <li
            key={index}
            className="px-8 py-5 flex flex-col items-center cursor-pointer group"
          >
            <category.icon className="!size-[56px] mb-5 fill-secondary-gray group-hover:fill-light-blue duration-300" />
            <h1 className="text-sm font-medium text-primary-black mb-2">
              {category.categoryName}
            </h1>
            <p className="text-sm text-primary-gray">
              {formatNumber(category.itemQuantity)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
