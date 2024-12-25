interface CategoriesProps {
  closeCategories: () => void;
  closing?: boolean;
}

const Categories: React.FC<CategoriesProps> = ({
  closeCategories,
  closing,
}) => {
  return (
    <div
      className={`absolute top-[110px] left-0 w-full bg-red-500 h-[500px] ${
        closing ? 'animate-closeDropDown' : 'animate-dropDown'
      }`}
    >
      <h1>Here will be categories component</h1>
    </div>
  );
};

export default Categories;
