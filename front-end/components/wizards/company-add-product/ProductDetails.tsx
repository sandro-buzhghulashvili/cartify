import { getProductTypes } from '@/api/products';
import { IconUpload } from '@/components/icons/Icons';
import { useWizardsContext } from '@/contexts/WizardsContext';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';

interface ProductDetailsForm {
  product_type: string;
  product_price: string;
}

const ProductDetails: React.FC = () => {
  const { wizardsData, activePage, onSetWizardsData } = useWizardsContext();
  const {
    register,
    formState: { errors },
    watch,
    control,
    trigger,
  } = useForm<ProductDetailsForm>({
    defaultValues: {
      product_price: wizardsData[activePage - 1].answer?.product_price || '',
      product_type: wizardsData[activePage - 1].answer?.product_type || '',
    },
  });
  const [files, setFiles] = useState<File[]>(
    wizardsData[activePage - 1].answer?.images || []
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [filesAreTouched, setFilesAreTouched] = useState(false);

  const handleUploadFile = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const loadProductTypes = (searchTerm: string) => {
    return getProductTypes(searchTerm);
  };

  const productType = watch('product_type');
  const productPrice = watch('product_price');

  useEffect(() => {
    const updatedWizardsData = wizardsData.map((data: any, index: number) => {
      if (activePage - 1 === index) {
        return {
          ...data,
          answer: {
            product_type: productType,
            product_price: productPrice,
            images: files,
          },
        };
      }
      return data;
    });

    onSetWizardsData(updatedWizardsData);
  }, [productType, productPrice, files]);

  useEffect(() => {
    if (wizardsData[activePage - 1].error) {
      setFilesAreTouched(true);
      const validateFields = async () => {
        await trigger();
      };

      validateFields();
    }
  }, [wizardsData]);

  return (
    <div className="w-[60%] flex flex-col gap-10 py-10">
      <div>
        <h1 className="text-2xl mb-5 font-medium text-primary-black">
          Choose type of product
        </h1>
        <Controller
          control={control}
          name="product_type"
          rules={{ required: 'Product type is required' }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <AsyncSelect
              cacheOptions
              loadOptions={loadProductTypes}
              defaultOptions
              placeholder="Select a product type"
              onChange={(
                selectedOption: { value: string; label: string } | null
              ) => onChange(selectedOption ? selectedOption.label : '')}
              onBlur={onBlur}
              styles={{
                control: (styles: any) => ({
                  ...styles,
                  outline: 'none',
                  boxShadow: 'none',
                  borderColor: errors.product_type ? 'red' : '#959EAD',
                  padding: '0 5px',
                  '&:hover': {
                    border: '1px solid #43467F',
                  },
                }),
                option: (styles, state) => ({
                  ...styles,
                  backgroundColor:
                    state.isFocused || state.isSelected
                      ? '#43467F'
                      : styles.backgroundColor,
                  color: state.isFocused ? 'white' : styles.color,
                }),
                container: (styles) => ({
                  ...styles,
                  width: '50%',
                }),
              }}
              value={value ? { label: value, value } : null}
            />
          )}
        />
        {errors.product_type && (
          <p className="text-sm font-medium text-red-600 mt-3">
            {errors.product_type.message}
          </p>
        )}
      </div>
      <div>
        <h1 className="text-2xl mb-5 font-medium text-primary-black">Price</h1>
        <input
          {...register('product_price', {
            required: 'Price is required',
            validate: (value) =>
              parseFloat(value) > 0 || 'Price must be greater than 0',
          })}
          type="number"
          placeholder="199.99$"
          className={`w-[200px] px-8 py-2 rounded-[30px] focus:outline-none border-[1px] border-primary-gray mb-3 ${
            errors.product_price ? '!border-2 border-red-500' : ''
          }`}
        />
        {errors.product_price && (
          <p className="text-sm mt-1 px-2 font-medium text-red-600">
            {errors.product_price.message}
          </p>
        )}
      </div>
      <div>
        <div className="mb-5">
          <h1 className="text-2xl mb-3 font-medium text-primary-black">
            Upload Images to Showcase Product
          </h1>
          <p className="text-sm font-medium text-primary-gray">
            Add high-quality images that highlight the unique details and design
            of your product.
          </p>
        </div>
        <input
          onChange={handleImageChange}
          type="file"
          ref={inputRef}
          className="hidden"
          multiple
        />
        <button
          onClick={handleUploadFile}
          className={`relative mb-5 flex items-center gap-5 text-base px-8 py-2 bg-primary-purple rounded-[30px] text-white ${
            files.length === 0 && filesAreTouched
              ? '!border-2 border-red-500'
              : null
          }`}
        >
          <IconUpload className="size-6 fill-white" />
          {files.length > 0 && (
            <span className="absolute -top-2 -right-2 size-5 p-3 font-bold bg-primary-green flex items-center justify-center rounded-full">
              {files.length}
            </span>
          )}
          Upload
        </button>
        {files.length > 0 && (
          <ul className="flex gap-5 items-center">
            {files.map((file, index) => (
              <li
                key={index}
                className="px-6 py-1 border-[1px] border-primary-black rounded-[30px] flex items-center gap-5 w-fit"
              >
                {file.name}
              </li>
            ))}
          </ul>
        )}
        {files.length === 0 && filesAreTouched && (
          <p className="text-sm mt-1 px-2 font-medium text-red-600">
            Please provide images
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
