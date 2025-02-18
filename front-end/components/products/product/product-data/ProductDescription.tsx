'use client';

import { useState } from 'react';

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
}) => {
  const [showFullDescription, setShowFullDescription] =
    useState<boolean>(false);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  return (
    <div>
      <span className="text-teritary-gray font-normal text-base">
        {showFullDescription
          ? description + ' .'
          : [...description.split(' ').filter((_, index) => index < 50)].join(
              ' '
            ) + (description.split(' ').length > 100 ? ' ...' : '.')}
        {description.split(' ').length > 100 && (
          <button
            onClick={toggleDescription}
            className="ml-1 text-primary-indigo font-medium text-base"
          >
            {!showFullDescription ? 'Show more' : 'Show less'}
          </button>
        )}
      </span>
    </div>
  );
};

export default ProductDescription;
