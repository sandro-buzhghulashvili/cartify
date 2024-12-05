import useInput from '@/hooks/useInput';

interface UpdateTextDataProps {
  title: string;
  description: string;
}

const UpdateTextData: React.FC<UpdateTextDataProps> = ({
  title,
  description,
}) => {
  const {
    value: productTitle,
    hasError: productTitleHasError,
    isValid: productTitleIsValid,
    handleValueChange: handleTitleChange,
    blurHandler: productTitleBlurHandler,
  } = useInput({
    validationFn: (val: string) => val.trim().length > 0,
    defaultValue: title,
  });
  const {
    value: productDescription,
    hasError: productDescriptionHasError,
    isValid: productDescriptionIsValid,
    handleValueChange: handleDescriptionChange,
    blurHandler: productDescriptionBlurHandler,
  } = useInput({
    validationFn: (val: string) => val.trim().length > 0,
    defaultValue: description,
  });
  return (
    <section className="flex flex-col gap-8 ">
      <input
        type="text"
        className={`text-2xl font-medium leading-[52px] p-1 px-5 border-[1px]  border-primary-black rounded-xl focus:outline-none ${
          productTitleHasError ? 'border-red-500 !border-2' : null
        }`}
        value={productTitle}
        onChange={handleTitleChange}
        onBlur={productTitleBlurHandler}
        placeholder="Update product name"
      />
      <textarea
        className={`text-base font-normal leading-[28px] text-teritary-gray py-2 px-4 rounded-xl border-[1px] border-primary-black focus:outline-none  ${
          productDescriptionHasError ? 'border-red-500 !border-2' : null
        }`}
        rows={4}
        value={productDescription}
        onChange={handleDescriptionChange}
        onBlur={productDescriptionBlurHandler}
      />
    </section>
  );
};

export default UpdateTextData;
