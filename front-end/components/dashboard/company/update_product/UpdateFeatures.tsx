import { IconPlus, IconXFilled } from '@/components/icons/Icons';
import { ChangeEvent, useEffect, useState } from 'react';

interface CustomType {
  new: boolean;
  value: string;
  isTouched: boolean;
}

interface UpdateFeaturesProps {
  types: string[];
  onUpdate: (detail: string, value: any) => void;
}

const UpdateFeatures: React.FC<UpdateFeaturesProps> = ({
  types: typesData,
  onUpdate,
}) => {
  const [types, setTypes] = useState<CustomType[]>([
    ...typesData.map((type) => ({ new: false, value: type, isTouched: false })),
  ]);

  const validType = (type: string) => type.trim().length > 0;
  const allTypesAreValid = types.every((type) => validType(type.value));

  const handleAddType = () => {
    if (!allTypesAreValid) {
      triggerTypes();
      return;
    }
    setTypes((prevTypes) => [
      { new: true, value: '', isTouched: false },
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

  const updateTypes = (value: string, index: number) => {
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
          <p className="font-medium">Unique specifications:</p>
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
                  className="relative inline-block w-1/3 flex-shrink-0"
                >
                  <input
                    className={`py-1 w-full  flex-shrink-0 px-6 border-[1px] border-secondary-gray rounded-[30px] focus:outline-none ${
                      type.isTouched && !validType(type.value)
                        ? '!border-2 !border-red-500'
                        : null
                    } `}
                    type="text"
                    placeholder="spec.."
                    value={type.value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateTypes(e.target.value, index)
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
                  className="relative flex-shrink-0 py-1 px-6 border-[1px] border-secondary-gray rounded-[30px]"
                  key={index}
                >
                  {type.value}
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
