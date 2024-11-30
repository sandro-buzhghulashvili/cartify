import { useEffect, useState } from 'react';
import Select from 'react-select';

interface FilterMenuProps {
  categories: any[];
  priceRange: any[];
  productClasses: any[];
  onFilter: (filterData: any) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  categories,
  priceRange,
  productClasses,
  onFilter,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<any>({
    value: 'default',
    label: 'All Categories',
    validationFn: () => true,
  });
  const [selectedPrice, setSelectedPrice] = useState<any>({
    value: { min: 0, max: Infinity },
    label: 'All Prices',
    validationFn: () => true,
  });
  const [selectedStatus, setSelectedStatus] = useState<any>({
    value: 'default',
    label: 'All Status',
    validationFn: () => true,
  });
  const [selectedClass, setSelectedClass] = useState<any>({
    value: 'default',
    label: 'All Types',
    validationFn: () => true,
  });

  const categoryOptions = [
    { value: 'default', label: 'All Categories', validationFn: () => true },
    ...categories.map((cat: string) => ({
      value: cat.toLowerCase(),
      label: cat,
      validationFn: (data: string) => data === cat,
    })),
  ];

  const priceOptions = [
    {
      value: { min: 0, max: Infinity },
      label: 'All Prices',
      validationFn: () => true,
    }, // Default option
    ...priceRange.map((ran: string) => ({
      value: {
        min: Number(ran.split('-')[0].slice(1)),
        max: Number(ran.split('-')[1].slice(1)),
      },
      label: ran,
      validationFn: (data: number) =>
        data >= Number(ran.split('-')[0].slice(1)) &&
        data <= Number(ran.split('-')[1].slice(1)),
    })),
  ];

  const statusOptions = [
    {
      value: 'default',
      label: 'All Status',
      validationFn: () => true,
    },
    {
      value: 'active',
      label: 'Active',
      validationFn: (data: string) => data === 'active',
    },
    {
      value: 'disabled',
      label: 'Disabled',
      validationFn: (data: string) => data === 'disabled',
    },
  ];

  const classOptions = [
    { value: 'default', label: 'All Types', validationFn: () => true },
    ...productClasses.map((cat: string) => ({
      value: cat.toLowerCase(),
      label: cat,
      validationFn: (data: string) => data === cat,
    })),
  ];

  useEffect(() => {
    const filterObj = {
      types: selectedCategory.validationFn,
      status: selectedStatus.validationFn,
      price: selectedPrice.validationFn,
      product_type: selectedClass.validationFn,
    };

    onFilter(filterObj);
  }, [selectedCategory, selectedStatus, selectedPrice, selectedClass]);

  return (
    <div className="p-5 flex items-center flex-wrap gap-y-5 justify-between pt-8">
      <div className="flex flex-col gap-2">
        <p className="font-bold text-primary-black">Category</p>
        <Select
          options={categoryOptions}
          onChange={(selected) => setSelectedCategory(selected)}
          defaultValue={categoryOptions[0]}
          styles={{
            control: (styles: any) => ({
              ...styles,
              border: 'none',
              backgroundColor: '#f3f4f6',
              outline: 'none',
              boxShadow: 'none',
              fontSize: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '5px 10px',
              width: '250px',
              '&:hover': {},
            }),
            option: (styles, state) => ({
              ...styles,
              backgroundColor: '#f3f4f6',
              color: '#161D25',
              fontSize: '14px',
              fontWeight: 'bold',
              '&:active': {
                backgroundColor: '#f3f4f6',
              },
            }),
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-primary-black">Status</p>
        <Select
          options={statusOptions}
          defaultValue={statusOptions[0]}
          onChange={(value) => setSelectedStatus(value)}
          styles={{
            control: (styles: any) => ({
              ...styles,
              border: 'none',
              backgroundColor: '#f3f4f6',
              outline: 'none',
              boxShadow: 'none',
              fontSize: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '5px 10px',
              width: '250px',
              '&:hover': {},
            }),
            option: (styles, state) => ({
              ...styles,
              backgroundColor: '#f3f4f6',
              color: '#161D25',
              fontSize: '14px',
              fontWeight: 'bold',
              '&:active': {
                backgroundColor: '#f3f4f6',
              },
            }),
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-primary-black">Price</p>
        <Select
          onChange={(selected) => setSelectedPrice(selected)}
          options={priceOptions}
          defaultValue={priceOptions[0]}
          styles={{
            control: (styles: any) => ({
              ...styles,
              border: 'none',
              backgroundColor: '#f3f4f6',
              outline: 'none',
              boxShadow: 'none',
              fontSize: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '5px 10px',
              width: '250px',
              '&:hover': {},
            }),
            option: (styles, state) => ({
              ...styles,
              backgroundColor: '#f3f4f6',
              color: '#161D25',
              fontSize: '14px',
              fontWeight: 'bold',
              '&:active': {
                backgroundColor: '#f3f4f6',
              },
            }),
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-primary-black">Type</p>
        <Select
          options={classOptions}
          defaultValue={classOptions[0]}
          onChange={(selected) => setSelectedClass(selected)}
          styles={{
            control: (styles: any) => ({
              ...styles,
              border: 'none',
              backgroundColor: '#f3f4f6',
              outline: 'none',
              boxShadow: 'none',
              fontSize: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '5px 10px',
              width: '250px',
              '&:hover': {},
            }),
            option: (styles, state) => ({
              ...styles,
              backgroundColor: '#f3f4f6',
              color: '#161D25',
              fontSize: '14px',
              fontWeight: 'bold',
              '&:active': {
                backgroundColor: '#f3f4f6',
              },
            }),
          }}
        />
      </div>
    </div>
  );
};

export default FilterMenu;
