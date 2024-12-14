import { IconPlus, IconXFilled } from '@/components/icons/Icons';
import { useEffect, useState } from 'react';

interface Specification {
  detail: string;
  value: string;
  new: boolean;
  isTouched: boolean;
}

interface UpdateSpecificationsProps {
  specifications: string;
  onUpdate: (detail: string, value: any) => void;
}

const UpdateSpecifications: React.FC<UpdateSpecificationsProps> = ({
  specifications: specificationsData,
  onUpdate,
}) => {
  const [specifications, setSpecifications] = useState<Specification[]>([
    ...JSON.parse(specificationsData).map((spec: Specification) => ({
      ...spec,
      new: false,
      isTouched: false,
    })),
  ]);

  const validateSpec = (spec: Specification) => ({
    detail: spec.detail.trim().length > 0,
    value: spec.value.trim().length > 0,
    isValid: spec.detail.trim().length > 0 && spec.value.trim().length > 0,
  });

  const allSpecificationsAreValid =
    specifications.every((spec) => validateSpec(spec).isValid) &&
    specifications.some((spec) => spec.detail.toLowerCase() === 'brand');

  const handleSpecificationDetailChange = (key: string, index: number) => {
    setSpecifications((prevSpecs) =>
      prevSpecs.map((spec, i) => {
        if (index === i) {
          return {
            ...spec,
            detail: key,
          };
        } else {
          return spec;
        }
      })
    );
  };

  const handleSpecificationValueChange = (key: string, value: string) => {
    setSpecifications((prevSpecs) =>
      prevSpecs.map((spec) => {
        if (spec.detail === key) {
          return {
            ...spec,
            value,
          };
        } else {
          return spec;
        }
      })
    );
  };

  const handleBlur = (index: number) => {
    setSpecifications((prevSpecifications) =>
      prevSpecifications.map((spec, i) => {
        if (index === i) {
          return {
            ...spec,
            isTouched: true,
          };
        } else {
          return spec;
        }
      })
    );
  };

  const triggerSpecifications = () => {
    setSpecifications((prevSpecifications) =>
      prevSpecifications.map((spec) => ({ ...spec, isTouched: true }))
    );
  };

  const handleAddSpecification = () => {
    if (!specifications.every((spec) => validateSpec(spec).isValid)) {
      triggerSpecifications();
      return;
    }

    setSpecifications((prevSpecifications) => [
      { detail: '', value: '', isTouched: false, new: true },
      ...prevSpecifications,
    ]);
  };

  const handleRemoveSpecification = (index: number) => {
    setSpecifications((prevSpecifications) =>
      prevSpecifications.filter((_, i) => i !== index)
    );
  };

  useEffect(() => {
    onUpdate(
      'specifications',
      JSON.stringify(
        specifications.map((spec) => ({
          detail: spec.detail,
          value: spec.value,
        }))
      )
    );
  }, [specifications]);

  return (
    <div className=" w-1/2">
      <div
        className={`flex items-center gap-5 ${
          !allSpecificationsAreValid ? 'mb-2' : 'mb-8'
        }`}
      >
        <p className="font-medium text-xl">Specifications:</p>
        <button onClick={handleAddSpecification}>
          <IconPlus className="size-5 fill-primary-purple " />
        </button>
      </div>
      {!allSpecificationsAreValid && (
        <p className="text-red-400 font-medium mb-5">
          Please provide brand and neccessary specifications
        </p>
      )}
      <ul className="flex flex-col px-5">
        {specifications.map((spec, index) => (
          <li
            key={index}
            className={`relative flex border-[1px] border-primary-black items-center ${
              index !== 0 ? 'border-t-0' : null
            } `}
          >
            {/* <div className="w-1/2 h-16 border-r-[1px] border-primary-black flex items-center justify-center"> */}
            <input
              className={`w-1/2 h-16 border-r-[1px] border-primary-black text-center focus:outline-none ${
                spec.isTouched && !validateSpec(spec).detail
                  ? 'placeholder:text-red-500'
                  : null
              }`}
              type="text"
              placeholder="feature ..."
              value={spec.detail}
              onChange={(e) =>
                handleSpecificationDetailChange(e.target.value, index)
              }
              onBlur={() => handleBlur(index)}
            />
            {/* </div> */}
            {spec.value.length > 30 ? (
              <div className="w-1/2 h-16 p-2 overflow-y-auto">
                <textarea
                  onChange={(e) =>
                    handleSpecificationValueChange(spec.detail, e.target.value)
                  }
                  className="w-full focus:outline-none overflow-hidden text-center"
                  value={spec.value}
                  rows={5}
                  placeholder="describe feature"
                  onBlur={() => handleBlur(index)}
                ></textarea>
              </div>
            ) : (
              <input
                className={`w-1/2 h-16  border-primary-black text-center focus:outline-none ${
                  spec.isTouched && !validateSpec(spec).value
                    ? 'placeholder:text-red-500'
                    : null
                }`}
                type="text"
                placeholder="describe..."
                value={spec.value}
                onBlur={() => handleBlur(index)}
                onChange={(e) =>
                  handleSpecificationValueChange(spec.detail, e.target.value)
                }
              />
            )}
            {/* // remove option */}
            <button
              className="absolute -top-4 -left-4 z-10 "
              onClick={() => handleRemoveSpecification(index)}
            >
              <IconXFilled className="size-5 fill-red-500" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateSpecifications;
