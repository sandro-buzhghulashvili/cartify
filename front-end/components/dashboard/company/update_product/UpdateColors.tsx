import { IconPlus, IconXFilled } from '@/components/icons/Icons';
import { colorValidation } from '@/utils/validateColor';
import { ChangeEvent, useEffect, useState } from 'react';

interface UpdateColorsProps {
  colors: string[];
  onUpdate: (detail: string, value: any) => void;
}

interface Color {
  new: boolean;
  value: string;
  isTouched: boolean;
}

const UpdateColors: React.FC<UpdateColorsProps> = ({
  colors: colorsData,
  onUpdate,
}) => {
  const [colors, setColors] = useState<Color[]>([
    ...colorsData.map((color) => ({
      new: false,
      value: color,
      isTouched: false,
    })),
  ]);

  const allColorsAreValid = colors.every((color) =>
    colorValidation(color.value)
  );

  const handleAddColor = () => {
    if (!allColorsAreValid) {
      triggerColors();
      return;
    }
    setColors((prevColors) => [
      { new: true, value: '', isTouched: false },
      ...prevColors,
    ]);
  };

  const triggerColors = () => {
    setColors((prevColors) =>
      prevColors.map((color) => {
        if (!colorValidation(color.value)) {
          return {
            ...color,
            isTouched: true,
          };
        } else {
          return color;
        }
      })
    );
  };

  const updateColors = (value: string, index: number) => {
    setColors((prevColors) =>
      prevColors.map((color, i) => {
        if (i === index) {
          return {
            ...color,
            value,
          };
        } else {
          return color;
        }
      })
    );
  };

  const handleBlur = (index: number) => {
    setColors((prevColors) =>
      prevColors.map((color, i) => {
        if (index === i) {
          return {
            ...color,
            isTouched: true,
          };
        } else {
          return color;
        }
      })
    );
  };

  const removeColor = (index: number) => {
    setColors((prevColors) => prevColors.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onUpdate(
      'colors',
      colors.map((color) => color.value)
    );
  }, [colors]);

  return (
    <div className="text-primary-black">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-5">
          <p className="font-medium">Colors:</p>
          <button onClick={handleAddColor}>
            <IconPlus className="size-5 fill-primary-purple " />
          </button>
        </div>
        {colors.length > 0 ? (
          <ul className="relative py-2 px-4 flex overflow-x-auto gap-5 items-center pr-16">
            {colors.map((color, index) =>
              color.new ? (
                <div
                  key={index}
                  className={`relative inline-block w-1/3 flex-shrink-0 `}
                >
                  <input
                    className={`py-1 w-full  flex-shrink-0 px-6 border-[1px] border-secondary-gray rounded-[30px] focus:outline-none ${
                      color.isTouched && !colorValidation(color.value)
                        ? '!border-2 !border-red-500'
                        : null
                    } ${colorValidation(color.value) ? 'pr-10' : null} `}
                    type="text"
                    placeholder="color ..."
                    value={color.value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateColors(e.target.value, index)
                    }
                    onBlur={() => handleBlur(index)}
                  />
                  <button
                    className="absolute -top-2 -right-2 z-10 "
                    onClick={() => removeColor(index)}
                  >
                    <IconXFilled className="size-5 fill-red-500" />
                  </button>
                  {colorValidation(color.value) && (
                    <span
                      style={{ backgroundColor: color.value }}
                      className="size-5 absolute top-0 bottom-0 my-auto right-5 rounded-full border-[1px] border-black"
                    ></span>
                  )}
                </div>
              ) : (
                <li
                  className="relative w-1/3 pr-10 flex-shrink-0 py-1 px-6 border-[1px] border-secondary-gray rounded-[30px]"
                  key={index}
                >
                  {color.value}
                  <button
                    className="absolute -top-2 -right-2 z-10 "
                    onClick={() => removeColor(index)}
                  >
                    <IconXFilled className="size-5 fill-red-500" />
                  </button>
                  <span
                    style={{ backgroundColor: color.value }}
                    className="size-5 absolute top-0 bottom-0 my-auto right-5 rounded-full border-[1px] border-black"
                  ></span>
                </li>
              )
            )}
          </ul>
        ) : (
          <p className="py-2 font-medium text-sm text-red-400">
            Please provide product colors
          </p>
        )}
      </div>
    </div>
  );
};

export default UpdateColors;
