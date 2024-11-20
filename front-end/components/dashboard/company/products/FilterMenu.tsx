import Select from 'react-select';

interface FilterMenuProps {
  categories: any[];
  priceRange: any[];
  productClasses: any[];
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  categories,
  priceRange,
  productClasses,
}) => {
  const categoryOptions = [
    { value: 'default', label: 'All Categories' },
    ...categories.map((cat: string) => ({
      value: cat.toLowerCase(),
      label: cat,
    })),
  ];

  const priceOptions = [
    { value: { min: 0, max: Infinity }, label: 'All Prices' }, // Default option
    ...priceRange.map((ran: string) => ({
      value: {
        min: Number(ran.split('-')[0].slice(1)),
        max: Number(ran.split('-')[1].slice(1)),
      },
      label: ran,
    })),
  ];

  const statusOptions = [
    {
      value: 'all-status',
      label: 'All Status',
    },
    {
      value: 'active',
      label: 'Active',
    },
    {
      value: 'disabled',
      label: 'Disabled',
    },
  ];

  const classOptions = [
    { value: 'default', label: 'All Types' },
    ...productClasses.map((cat: string) => ({
      value: cat.toLowerCase(),
      label: cat,
    })),
  ];

  return (
    <div className="p-5 flex items-center flex-wrap gap-y-5 justify-between pt-8">
      <div className="flex flex-col gap-2">
        <p className="font-bold text-primary-black">Category</p>
        <Select
          options={categoryOptions}
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
