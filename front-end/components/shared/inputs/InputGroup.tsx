import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputGroupProps extends React.ComponentPropsWithoutRef<'input'> {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  labelStyles: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  labelStyles,
  register,
  id,
  type,
  placeholder,
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col w-1/2">
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
        <p className="max-w-[200px] px-5 text-sm font-medium text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default InputGroup;
