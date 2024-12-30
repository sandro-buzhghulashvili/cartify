import { IconChevronRight } from '@/components/icons/IconChevronRight';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

interface CategoriesFilterProps {
  categories: {
    0: string;
    1: {
      categories: string[];
      icon: string;
    };
  }[];
  onUpdate: (filter: string, value: string | number | boolean) => void;
}

interface OpenCategories {
  category: string;
  subCategories: {
    name: string;
    checked: boolean;
  }[];
  isOpen: boolean;
  icon: string;
}

const CategoriesFilter: React.FC<CategoriesFilterProps> = ({
  categories,
  onUpdate,
}) => {
  const searchParams = useSearchParams();

  const [openCategories, setOpenCategories] = React.useState<OpenCategories[]>(
    categories.map((category) => ({
      category: category[0],
      icon: category[1].icon,
      subCategories: category[1].categories.map((subCategory) => ({
        name: subCategory,
        checked: false,
      })),
      isOpen: false,
    }))
  );

  const createSVGElement = (svgString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    return doc.documentElement;
  };

  const toggleCategory = (category: string) => {
    setOpenCategories((prevCategories) =>
      prevCategories.map((cat) => {
        if (cat.category === category) {
          return { ...cat, isOpen: !cat.isOpen };
        } else {
          return cat;
        }
      })
    );
  };

  const chooseCategory = (category: string, subCategory: string) => {
    setOpenCategories((prevCategories) =>
      prevCategories.map((cat) => {
        if (cat.category === category) {
          return {
            ...cat,
            subCategories: cat.subCategories.map((subCat) => {
              if (subCat.name === subCategory) {
                return {
                  ...subCat,
                  checked: !subCat.checked,
                };
              } else {
                return subCat;
              }
            }),
          };
        } else {
          return cat;
        }
      })
    );
  };

  useEffect(() => {
    onUpdate(
      'categories',
      JSON.stringify(
        openCategories
          .map((category) => [
            category.subCategories.map(
              (subCategory) => subCategory.checked && subCategory.name
            ),
          ])
          .reduce((acc, val) => acc.concat(...val), [])
          .filter((cat) => cat)
      )
    );
  }, [openCategories]);

  useEffect(() => {
    const { categories: allCategories } = Object.fromEntries(
      searchParams.entries()
    );

    if (allCategories) {
      const parsedCategories = JSON.parse(allCategories);

      setOpenCategories((prevCategories) =>
        prevCategories
          .map((cat) => {
            if (
              parsedCategories.some((sub_cat: string) =>
                cat.subCategories.find((c) => c.name === sub_cat)
              )
            ) {
              return {
                ...cat,
                isOpen: true,
                subCategories: cat.subCategories.map((c) => {
                  if (
                    parsedCategories.find(
                      (parsed_cat: string) => parsed_cat === c.name
                    )
                  ) {
                    return {
                      ...c,
                      checked: true,
                    };
                  } else {
                    return c;
                  }
                }),
              };
            } else {
              return {
                ...cat,
                isOpen: false,
              };
            }
          })
          .sort((a, b) => (a.isOpen ? -1 : 1))
      );
    }
  }, [searchParams]);

  return (
    <div className="text-primary-black">
      <h1 className="text-sm font-medium mb-5">Category</h1>
      <ul className="flex flex-col gap-5 max-h-[300px] overflow-y-auto ">
        {openCategories.map((category, index) => (
          <li key={index}>
            <button
              className="relative flex items-center gap-2 group pr-10 w-full"
              onClick={() => toggleCategory(category.category)}
            >
              <span
                className="w-5 h-5"
                ref={(el) => {
                  if (el) {
                    const svgElement = createSVGElement(category.icon);
                    el.innerHTML = '';
                    svgElement.setAttribute(
                      'class',
                      'w-full h-full fill-secondary-gray group-hover:fill-primary-indigo'
                    );
                    el.appendChild(svgElement);
                  }
                }}
              />
              <span className="text-base font-normal text-tertiary-gray group-hover:text-primary-indigo">
                {category.category}
              </span>
              {/* dropdown sub-categories */}
              <span className="absolute top-0 bottom-0 right-3 my-auto">
                <IconChevronRight
                  className={`size-5 duration-300 rotate-90 ${
                    category.isOpen ? '!-rotate-90' : null
                  }`}
                />
              </span>
            </button>
            {/* sub dropdown */}
            <ul
              className={`pt-2 max-h-0 overflow-hidden duration-500 ${
                openCategories[index].isOpen ? 'max-h-96' : 'max-h-0'
              }`}
            >
              {category.subCategories.map((subCategory, index) => (
                <li
                  className="pl-7 pr-4 py-1 flex justify-between items-center"
                  key={index}
                >
                  <label
                    htmlFor={`${subCategory.name}-${index}`}
                    className="text-sm font-medium"
                  >
                    {subCategory.name}
                  </label>
                  <input
                    type="checkbox"
                    id={`${subCategory.name}-${index}`}
                    onChange={() =>
                      chooseCategory(category.category, subCategory.name)
                    }
                    checked={
                      openCategories
                        .find((cat) => cat.category === category.category)
                        ?.subCategories.find(
                          (cat) => cat.name === subCategory.name
                        )?.checked
                    }
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesFilter;
