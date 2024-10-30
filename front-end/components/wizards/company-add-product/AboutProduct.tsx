import { useWizardsContext } from '@/contexts/WizardsContext';
import useInput from '@/hooks/useInput';
import { useEffect, useState } from 'react';

const AboutProduct: React.FC = () => {
  const [errors, setErrors] = useState<any>(null);
  const { wizardsData, activePage, onSetWizardsData } = useWizardsContext();
  const [hasMounted, setHasMounted] = useState(false);
  const {
    value: title,
    hasError: titleHasError,
    handleValueChange: handleTitleChange,
    blurHandler: titleBlurHandler,
    isValid: titleIsValid,
  } = useInput({
    validationFn: (data) => data.trim().length > 0,
    defaultValue: wizardsData[activePage - 1].answer?.title,
  });

  const {
    value: description,
    hasError: descriptionHasError,
    handleValueChange: handleDescriptionChange,
    blurHandler: descriptionBlurHandler,
    isValid: descriptionIsValid,
  } = useInput({
    validationFn: (data) => data.trim().length > 50,
    defaultValue: wizardsData[activePage - 1].answer?.description,
  });

  useEffect(() => {
    if (!wizardsData[activePage - 1].error) return;
    if (!descriptionIsValid) {
      setErrors((prevErrors: any) => {
        if (prevErrors) {
          return {
            ...prevErrors,
            description:
              'Please provide description for your product (over 50 characters)',
          };
        } else {
          return {
            description:
              'Please provide description for your product (over 50 characters)',
          };
        }
      });
    } else {
      setErrors((prevErrors: any) => {
        return {
          ...prevErrors,
          description: null,
        };
      });
    }
    if (!titleIsValid) {
      setErrors((prevErrors: any) => {
        if (prevErrors) {
          return {
            ...prevErrors,
            title: 'Please type product title',
          };
        } else {
          return {
            title: 'Please type product title',
          };
        }
      });
    } else {
      setErrors((prevErrors: any) => {
        return {
          ...prevErrors,
          title: null,
        };
      });
    }
  }, [
    wizardsData[activePage - 1],
    titleIsValid,
    activePage,
    descriptionIsValid,
  ]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    const updatedWizardsData = wizardsData.map((data, index) => {
      if (index === activePage - 1) {
        const isValid = data.validationFn({ title, description });
        return {
          ...data,
          error: isValid ? null : true,
          answer: { title, description },
        };
      }
      return data;
    });

    onSetWizardsData(updatedWizardsData);
  }, [title, description]);

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
            value={title}
            onChange={handleTitleChange}
            onBlur={titleBlurHandler}
            id="productTitle"
            type="text"
            placeholder="e.g., Wireless Headphones"
            className={`w-1/2 px-8 py-3 rounded-[30px] focus:outline-none border-[1px] border-primary-gray mb-3 ${
              titleHasError || errors?.title ? '!border-2 border-red-500' : null
            }`}
          />
          {(errors?.title || titleHasError) && (
            <p
              className={`max-w-[200px] px-5 text-sm font-medium text-red-600`}
            >
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
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            onBlur={descriptionBlurHandler}
            rows={8}
            placeholder="Provide a detailed description..."
            className={`w-1/2 px-8 py-3 rounded-[30px] focus:outline-none border-[1px] border-primary-gray mb-3 ${
              descriptionHasError || errors?.description
                ? '!border-2 border-red-500'
                : null
            }`}
            name="product-description"
            id="productDescription"
          ></textarea>
          {(errors?.description || descriptionHasError) && (
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
