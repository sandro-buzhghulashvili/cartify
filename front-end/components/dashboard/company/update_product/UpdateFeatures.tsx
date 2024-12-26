import { IconPlus, IconXFilled } from '@/components/icons/Icons';
import { ProductType } from '@/components/wizards/company-add-product/MainTypes';
import { ChangeEvent, useEffect, useState } from 'react';

interface CustomType {
  new: boolean;
  value: ProductType;
  isTouched: boolean;
}

interface UpdateFeaturesProps {
  types: ProductType[];
  onUpdate: (detail: string, value: any) => void;
}

const UpdateFeatures: React.FC<UpdateFeaturesProps> = ({
  types: typesData,
  onUpdate,
}) => {
  const [types, setTypes] = useState<CustomType[]>([
    ...typesData.map((type) => ({ new: false, value: type, isTouched: false })),
  ]);

  const validType = (type: ProductType) =>
    type.type.trim().length > 0 && type.addition >= 0 && type.addition < 100;
  const allTypesAreValid = types.every((type) => validType(type.value));

  const handleAddType = () => {
    if (!allTypesAreValid) {
      triggerTypes();
      return;
    }
    setTypes((prevTypes) => [
      {
        new: true,
        value: {
          type: '',
          addition: 0,
        },
        isTouched: false,
      },
      ...prevTypes,
    ]);
  };

  const triggerTypes = () => {
    setTypes((prevTypes) =>
      prevTypes.map((type) => {
        if (!validType(type.value)) {
          return {
            ...type,
            isTouched: true,
          };
        } else {
          return type;
        }
      })
    );
  };

  const updateTypes = (value: ProductType, index: number) => {
    setTypes((prevTypes) =>
      prevTypes.map((type, i) => {
        if (i === index) {
          return {
            ...type,
            value,
          };
        } else {
          return type;
        }
      })
    );
  };

  const handleBlur = (index: number) => {
    setTypes((prevTypes) =>
      prevTypes.map((type, i) => {
        if (index === i) {
          return {
            ...type,
            isTouched: true,
          };
        } else {
          return type;
        }
      })
    );
  };

  const removeType = (index: number) => {
    setTypes((prevTypes) => prevTypes.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onUpdate(
      'types',
      types.map((type) => type.value)
    );
  }, [types]);

  return (
    <div className="text-primary-black">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-5">
          <p className="font-medium">Product types:</p>
          <button onClick={handleAddType}>
            <IconPlus className="size-5 fill-primary-purple " />
          </button>
        </div>
        {types.length > 0 ? (
          <ul className="relative py-2 px-4 flex overflow-x-auto gap-5 items-center pr-16">
            {types.map((type, index) =>
              type.new ? (
                <div
                  key={index}
                  className={`relative flex items-center w-[40%] px-2 py-[2px] flex-shrink-0 border-[1px] border-secondary-gray rounded-[30px] ${
                    type.isTouched && !validType(type.value)
                      ? '!border-2 !border-red-500'
                      : null
                  } `}
                >
                  <div className="w-[70%] flex-shrink-0 relative">
                    <input
                      className={`py-1 w-full  px-2 pr-6 focus:outline-none text-center `}
                      type="text"
                      placeholder="spec.."
                      value={type.value.type}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateTypes(
                          {
                            ...type.value,
                            type: e.target.value,
                          },
                          index
                        )
                      }
                      onBlur={() => handleBlur(index)}
                    />
                    <span className="absolute top-0 bottom-0 -right-1 my-auto h-fit text-xs font-bold">
                      +%
                    </span>
                  </div>
                  <input
                    type="number"
                    value={type.value.addition}
                    className="w-[30%] text-center focus:outline-none text-sm"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateTypes(
                        { ...type.value, addition: parseInt(e.target.value) },
                        index
                      )
                    }
                    onBlur={() => handleBlur(index)}
                  />
                  <button
                    className="absolute -top-2 -right-2 z-10 "
                    onClick={() => removeType(index)}
                  >
                    <IconXFilled className="size-5 fill-red-500" />
                  </button>
                </div>
              ) : (
                <li
                  className="relative flex items-center gap-3 flex-shrink-0 py-1 px-6 border-[1px] border-secondary-gray rounded-[30px]"
                  key={index}
                >
                  {type.value.type}
                  <span className="text-xs font-bold">
                    +% {type.value.addition}
                  </span>
                  <button
                    className="absolute -top-2 -right-2 z-10 "
                    onClick={() => removeType(index)}
                  >
                    <IconXFilled className="size-5 fill-red-500" />
                  </button>
                </li>
              )
            )}
          </ul>
        ) : (
          <p className="py-2 font-medium text-sm text-red-400">
            Please provide unique specifications
          </p>
        )}
      </div>
    </div>
  );
};

export default UpdateFeatures;
