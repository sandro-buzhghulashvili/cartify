import { useState } from 'react';
import Image from 'next/image';
import { IconChevronRight } from '@/components/icons/IconChevronRight';

interface ProductImagesPreviewProps {
  images: string[];
  activeImageIndex: number;
}

const ProductImagesPreview: React.FC<ProductImagesPreviewProps> = ({
  images,
  activeImageIndex,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(activeImageIndex);

  const handleSlideRight = () => {
    setCurrentImageIndex((prev) => {
      if (prev === images.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  const handleSlideLeft = () => {
    setCurrentImageIndex((prev) => {
      if (prev === 0) {
        return images.length - 1;
      } else {
        return prev - 1;
      }
    });
  };

  console.log(currentImageIndex);
  return (
    <div className="relative p-20  bg-white rounded-lg flex flex-col gap-10 items-center">
      <div className="flex gap-10 items-center w-[500px] overflow-hidden">
        <div
          className="flex w-[500px] duration-300"
          style={{
            transform: `translateX(-${currentImageIndex * 500}px)`, // Move the entire row of images
          }}
        >
          {images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`product-thumb-${index}`}
              className="w-full flex-shrink-0 !h-[400px] object-contain"
              width={500}
              height={400}
            />
          ))}
        </div>
      </div>

      {/* // slide control buttons */}
      <button
        onClick={handleSlideLeft}
        className="absolute top-0 bottom-0 left-0 my-auto h-fit rotate-180"
      >
        <IconChevronRight className="size-20" />
      </button>
      <button
        className="absolute top-0 bottom-0 right-0 my-auto h-fit"
        onClick={handleSlideRight}
      >
        <IconChevronRight className="size-20" />
      </button>

      <ul className="flex items-center justify-start gap-10 max-w-[820px] px-10 pb-4 overflow-x-auto">
        {images.map((img) => (
          <li
            onClick={() =>
              setCurrentImageIndex(images.findIndex((image) => image === img))
            }
            key={img}
            className={`p-3 ${
              images[currentImageIndex] === img
                ? 'border-2 border-primary-indigo'
                : null
            }  rounded-xl cursor-pointer hover:bg-gray-100 duration-300 flex-shrink-0`}
          >
            <Image
              width={130}
              height={110}
              src={img}
              alt={`product-thumb-${img}`}
              className="h-[110px] w-[130px] object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductImagesPreview;
