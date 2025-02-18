'use client';

import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Review } from './ProductReviews';

interface ReviewSortOptions {
  onSort: any;
}

const ReviewSort: React.FC<ReviewSortOptions> = ({ onSort }) => {
  const sortingOptions = [
    {
      label: 'Newest',
      value: (reviews: Review[] = []) =>
        reviews.sort(
          (a, b) =>
            new Date(b.userDetails.reviewedAt).getTime() -
            new Date(a.userDetails.reviewedAt).getTime()
        ),
    },
    {
      label: 'Oldest',
      value: (reviews: Review[] = []) =>
        reviews.sort(
          (a, b) =>
            new Date(a.userDetails.reviewedAt).getTime() -
            new Date(b.userDetails.reviewedAt).getTime()
        ),
    },
    {
      label: 'Most Helpful',
      value: (reviews: Review[] = []) =>
        reviews.sort((a, b) => b.likes - a.likes),
    },
  ];

  const [activeSortingOption, setActiveSortingOption] = useState<any>(
    sortingOptions[0]
  );

  useEffect(() => {
    onSort(activeSortingOption.value);
  }, [activeSortingOption]);

  return (
    <div className="flex items-center gap-3 text-primary-black">
      <p className="text-sm font-normal text-primary-gray">Sort by:</p>
      <Select
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: 'none',
            boxShadow: 'none',
            minWidth: '150px',
            backgroundColor: '#F9FAFB',
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: '#F9FAFB',
            color: '#161d25',
            '&:active': {
              backgroundColor: 'white',
            },
          }),
        }}
        value={activeSortingOption}
        options={sortingOptions}
        onChange={(selected) => setActiveSortingOption(selected)}
      />
    </div>
  );
};

export default ReviewSort;
