import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputGroupProps extends React.ComponentPropsWithoutRef<'input'> {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  labelStyles: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  errorStyles?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  labelStyles,
  register,
  id,
  type,
  placeholder,
  error,
  errorStyles,
  ...props
}) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className={labelStyles}>
        {label}
      </label>
      <input
        {...register}
        id={id}
        type={type}
        placeholder={placeholder}
        {...props}
      />
      {error && (
        <p
          className={`max-w-[200px] px-5 text-sm font-medium text-red-600 ${
            errorStyles ? errorStyles : null
          }`}
        >
          {error.message}
        </p>
      )}
    </div>
  );
};

export default InputGroup;
