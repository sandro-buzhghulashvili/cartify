import { ChangeEvent, useState } from 'react';

interface useInputProps {
  validationFn: (data: string) => boolean;
  defaultValue?: string;
}

const useInput = ({ validationFn, defaultValue }: useInputProps) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : '');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validationFn(value);
  const hasError = isTouched && !isValid;

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  return {
    value,
    hasError,
    isValid,
    handleValueChange,
    blurHandler,
  };
};

export default useInput;
