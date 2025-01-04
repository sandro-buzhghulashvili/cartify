import { useEffect, useState } from 'react';

interface ColorFilterProps {
  colors: string[];
  onUpdate: (filter: string, value: string | number | boolean) => void;
}

const ColorFilter: React.FC<ColorFilterProps> = ({ colors, onUpdate }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorSelection = (color: string) => {
    if (color === selectedColor) {
      setSelectedColor(null);
    } else {
      setSelectedColor(color);
    }
  };

  useEffect(() => {
    if (selectedColor) {
      onUpdate('color', selectedColor);
    } else {
      onUpdate('color', '');
    }
  }, [selectedColor]);

  return (
    <div>
      <h1 className="text-sm font-medium mb-5">
        Product Color{colors.length > 1 && 's'}
      </h1>
      <ul className="flex items-center flex-wrap gap-5  max-h-[160px] overflow-y-auto px-2">
        {colors.map((color, index) => (
          <li
            key={index}
            className="flex justify-center items-center p-1 rounded-full"
            style={{
              border: selectedColor !== color ? 'none' : '1px solid',
              borderWidth: selectedColor === color ? '2px' : 'none',
              borderColor:
                selectedColor === color
                  ? color === 'white' || color === '#fff'
                    ? 'black'
                    : color
                  : 'none',
            }}
          >
            <button
              onClick={() => handleColorSelection(color)}
              className={`size-[26px] rounded-full ${
                color === 'white' || color === '#fff'
                  ? 'border-[1px] border-primary-black'
                  : null
              }`}
              style={{
                backgroundColor: color,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorFilter;
