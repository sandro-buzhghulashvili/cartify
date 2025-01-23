'use client';

import { act, useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/shared/modal/Modal';
import ProductImagesPreview from './ProductImagePreview';

interface ProductImagesProps {
  images: string[];
}

const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  const [previewImage, setPreviewImage] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState<number>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <div className="flex flex-col items-center gap-5">
      {previewImage && (
        <Modal onClose={() => setPreviewImage(false)} closeButton>
          <ProductImagesPreview
            images={images}
            activeImageIndex={activeImage}
          />
        </Modal>
      )}
      <button onClick={() => setPreviewImage(true)}>
        <Image
          src={images[activeImage]}
          alt={`${images[activeImage]}`}
          width={440}
          height={340}
          className="w-[440px] h-[340px] object-contain"
        />
      </button>
      <ul
        className={`flex items-center gap-5 max-w-[510px] pb-5 overflow-x-auto ${
          images.length < 3 ? 'justify-center' : null
        }`}
      >
        {images.map((image, index) => (
          <li key={index} className="flex-shrink-0">
            <button
              className={`p-3 hover:bg-gray-100   ${
                index === activeImage ? 'border-primary-indigo border-2' : null
              }`}
              onClick={() => {
                if (activeImage !== index) {
                  setActiveImage(index);
                }
              }}
            >
              <Image
                src={image}
                alt={`image-${index + 1}`}
                width={130}
                height={110}
                className="w-[130px] h-[110px] object-contain"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductImages;
