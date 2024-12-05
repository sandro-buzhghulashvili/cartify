import { IconPlus, IconX, IconXFilled } from '@/components/icons/Icons';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface UpdateImagesProps {
  images: any[];
  onUpdate: (images: any[]) => void;
}

const UpdateImages: React.FC<UpdateImagesProps> = ({
  images: ImagesData,
  onUpdate,
}) => {
  const addImageInputRef = useRef<HTMLInputElement>(null);

  const [activeImage, setActiveImage] = useState(0);
  const [images, setImages] = useState([...ImagesData]);

  const handleRemoveImage = (index: number) => {
    setActiveImage(0);
    setImages((prevImages) => prevImages.filter((_, i: number) => index !== i));
  };

  const handleAddImage = () => {
    addImageInputRef.current?.click();
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    console.log(files, files && files.length > 0);
    if (files && files.length > 0) {
      const imageUrls: any[] = [];
      Array.from(files).forEach((img: File) => {
        const reader: FileReader = new FileReader();

        reader.onloadend = () => {
          imageUrls.push({
            url: reader.result as string,
            file: img,
          });
          if (imageUrls.length === files.length) {
            setImages((prevImages) => [...prevImages, ...imageUrls]);
          }
        };

        reader.readAsDataURL(img);
      });
    }
  };

  useEffect(() => {
    onUpdate(images);
  }, [images]);

  return (
    <section className="flex items-center flex-col gap-10">
      <Image
        src={images[activeImage].url || images[activeImage]}
        alt="product-preview"
        width={300}
        height={300}
        className="w-[280px] h-[280px] object-contain aspect-square"
      />
      <div className="pr-10  relative">
        <ul className="flex justify-around max-w-[300px] gap-5 flex-nowrap overflow-x-auto pb-3">
          {images.map((preview: any, index: number) => (
            <div className="relative flex-shrink-0 " key={index}>
              <li
                onClick={() => setActiveImage(index)}
                className={`cursor-pointer hover:bg-gray-300 rounded-md duration-300  ${
                  activeImage === index
                    ? 'relative border-2 border-primary-purple '
                    : null
                }`}
              >
                <Image
                  src={preview.url || preview}
                  alt={`product-${index}`}
                  width={90}
                  height={70}
                  className={`w-[90px] h-[70px] object-contain p-2 z-2 `}
                />
              </li>
              {index > 0 && (
                <button
                  className="absolute top-0 right-0 z-10 "
                  onClick={() => handleRemoveImage(index)}
                >
                  <IconXFilled className="size-5 fill-red-500" />
                </button>
              )}
            </div>
          ))}
        </ul>
        <input
          onChange={handleFileInputChange}
          ref={addImageInputRef}
          type="file"
          className="hidden"
          multiple
        />
        <button onClick={handleAddImage}>
          <IconPlus className="size-7 fill-primary-purple absolute -top-5 bottom-0 right-0 z-10 " />
        </button>
      </div>
    </section>
  );
};

export default UpdateImages;
