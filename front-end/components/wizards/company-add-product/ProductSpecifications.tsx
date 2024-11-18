import { IconPlus, IconXFilled } from '@/components/icons/Icons';
import { useWizardsContext } from '@/contexts/WizardsContext';
import { useEffect, useState } from 'react';

interface SpecType {
  detail: string;
  value: string;
  isTouched: boolean;
}

const ProductSpecifications: React.FC = () => {
  const { wizardsData, activePage, onSetWizardsData } = useWizardsContext();
  const [specifications, setSpecifications] = useState(
    (wizardsData[activePage - 1].answer?.specifications as SpecType[]) || [
      {
        detail: '',
        value: '',
        isTouched: false,
      },
    ]
  );

  const handleDetailChange = (newDetail: string, index: number) => {
    setSpecifications((prevSpecifications) =>
      prevSpecifications.map((element, i) => {
        if (index === i) {
          return {
            ...element,
            detail: newDetail,
          };
        } else {
          return element;
        }
      })
    );
  };

  const handleValueChange = (newValue: string, index: number) => {
    setSpecifications((prevSpecifications) =>
      prevSpecifications.map((element, i) => {
        if (index === i) {
          return {
            ...element,
            value: newValue,
          };
        } else {
          return element;
        }
      })
    );
  };

  const handleTouch = (index: number) => {
    setSpecifications((prevSpecifications) =>
      prevSpecifications.map((element, i) => {
        if (i === index) {
          return {
            ...element,
            isTouched: true,
          };
        } else {
          return element;
        }
      })
    );
  };

  const handleAddSpec = () => {
    if (
      specifications[specifications.length - 1].detail.trim().length > 0 &&
      specifications[specifications.length - 1].value.trim().length > 0
    ) {
      setSpecifications((prevSpecifications) => [
        ...prevSpecifications,
        {
          detail: '',
          value: '',
          isTouched: false,
        },
      ]);
    } else {
      setSpecifications((prevSpecifications) =>
        prevSpecifications.map((spec) => ({
          ...spec,
          isTouched: true,
        }))
      );
    }
  };

  const handleRemoveSpec = (i: number) => {
    setSpecifications((prevSpec) => prevSpec.filter((_, index) => i !== index));
  };

  useEffect(() => {
    const updatedWizardsData = wizardsData.map((data: any, index: number) => {
      if (index === activePage - 1) {
        return {
          ...data,
          answer: {
            specifications,
          },
        };
      } else {
        return data;
      }
    });
    onSetWizardsData(updatedWizardsData);
  }, [specifications]);

  console.log(specifications);
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-3xl mb-3 font-medium text-primary-black">
          Please provide the detailed specifications.
        </h1>
        <p className="text-base font-medium text-primary-gray">
          Include key details and unique features to highlight what makes this
          product special.
        </p>
      </div>
      <ul>
        {/* // col titles */}
        <li className="relative flex w-[500px]">
          <span className="w-1/2 flex items-center justify-center bg-primary-purple text-white py-3 font-bold">
            Detail
          </span>
          <span className="w-1/2 flex items-center justify-center bg-secondary-fill-gray  text-white py-3 font-bold">
            Description
          </span>
          <button
            onClick={handleAddSpec}
            className="absolute flex items-center gap-5 bg-primary-green px-8 py-3 top-0 -right-[180px] rounded-[30px] text-white font-bold"
          >
            Add
            <IconPlus className="size-7 fill-white" />
          </button>
        </li>
        {specifications.map((spec, index) => (
          <li key={index} className="relative flex w-[500px]">
            {index === specifications.length - 1 && index !== 0 && (
              <button onClick={() => handleRemoveSpec(index)}>
                <IconXFilled className="fill-red-500 size-7 absolute -top-2 -right-2" />
              </button>
            )}
            <input
              className={`w-1/2 text-center border-2 border-r-0 border-t-0 border-primary-black py-3 font-bold focus:outline-none px-5 ${
                spec.detail.trim().length === 0 && spec.isTouched
                  ? 'text-red-500 placeholder:text-red-500'
                  : null
              }`}
              type="text"
              placeholder="Brand ..."
              value={spec.detail}
              onChange={(e) => handleDetailChange(e.target.value, index)}
              onBlur={() => handleTouch(index)}
            />
            <input
              className={`w-1/2 text-center border-2 border-t-0 border-primary-black py-3 font-medium focus:outline-none text-secondary-gray px-5 ${
                spec.value.trim().length === 0 && spec.isTouched
                  ? 'text-red-500 placeholder:text-red-500'
                  : null
              }`}
              type="text"
              placeholder="Sony Alpha 7 ..."
              value={spec.value}
              onChange={(e) => handleValueChange(e.target.value, index)}
              onBlur={() => handleTouch(index)}
            />
          </li>
        ))}
      </ul>
      {wizardsData[activePage - 1].error && (
        <p className="font-medium text-red-500">
          {wizardsData[activePage - 1].errorMessage}
        </p>
      )}
    </div>
  );
};

export default ProductSpecifications;
