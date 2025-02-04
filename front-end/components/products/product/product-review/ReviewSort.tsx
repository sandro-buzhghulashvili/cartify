'use client';

import { useState } from 'react';
import Select from 'react-select';

const ReviewSort: React.FC = () => {
  const sortingOptions = [
    {
      label: 'Newest',
      value: 'newest',
    },
    {
      label: 'Oldest',
      value: 'oldest',
    },
    {
      label: 'Most Helpful',
      value: 'most-helpful',
    },
  ];

  const [activeSortingOption, setActiveSortingOption] = useState<any>(
    sortingOptions[0]
  );

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
