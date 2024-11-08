import { useWizardsContext } from '@/contexts/WizardsContext';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

interface AboutProductForm {
  product_title: string;
  product_description: string;
}

const AboutProduct: React.FC = () => {
  const { wizardsData, activePage, onSetWizardsData } = useWizardsContext();
  const {
    register,
    watch,
    trigger,
    formState: { errors },
    control,
  } = useForm<AboutProductForm>({
    defaultValues: {
      product_description:
        wizardsData[activePage - 1].answer?.description || '',
      product_title: wizardsData[activePage - 1].answer?.title || '',
    },
  });

  const product_title = watch('product_title');
  const product_description = watch('product_description');

  useEffect(() => {
    const updatedWizardsData = wizardsData.map((data: any, index: number) => {
      if (activePage - 1 === index) {
        return {
          ...data,
          answer: {
            description: product_description,
            title: product_title,
          },
        };
      }
      return data;
    });

    onSetWizardsData(updatedWizardsData);
  }, [product_description, product_title]);

  useEffect(() => {
    if (wizardsData[activePage - 1].error) {
      const validateFields = async () => {
        await trigger();
      };

      validateFields();
    }
  }, [wizardsData]);

  return (
    <div className="h-full flex flex-col gap-7">
      <div className="flex flex-col gap-5">
        <label
          htmlFor="productTitle"
          className="text-2xl mb-3 font-medium text-primary-black w-fit"
        >
          Product Title
        </label>
        <div>
          <input
            id="productTitle"
            {...register('product_title', {
              required: 'Product title is required',
            })}
            type="text"
            placeholder="e.g., Wireless Headphones"
            className={`w-1/2 px-8 py-3 rounded-[30px] focus:outline-none border-[1px] border-primary-gray mb-3 ${
              errors.product_title ? '!border-2 border-red-500' : null
            }`}
          />
          {errors.product_title && (
            <p className={`px-5 text-sm font-medium text-red-600`}>
              Please type product title
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <label
          htmlFor="productDescription"
          className="text-2xl mb-3 font-medium text-primary-black w-fit"
        >
          Product Description
        </label>
        <div>
          <Controller
            control={control}
            name="product_description"
            rules={{
              required: 'Description is required',
              minLength: 50,
            }}
            render={({ field: { onBlur, onChange, value } }) => (
              <textarea
                rows={8}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Provide a detailed description..."
                className={`w-1/2 px-8 py-3 rounded-[30px] focus:outline-none border-[1px] border-primary-gray mb-3 ${
                  errors.product_description ? '!border-2 border-red-500' : null
                }`}
                name="product-description"
                id="productDescription"
              ></textarea>
            )}
          />

          {errors.product_description && (
            <p className={` px-5 text-sm font-medium text-red-600`}>
              Please provide description for your product (over 50 characters)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutProduct;
