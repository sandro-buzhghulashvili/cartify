import { IconX, IconPlus } from '@/components/icons/Icons';
import { useWizardsContext } from '@/contexts/WizardsContext';
import { colorValidation } from '@/utils/validateColor';
import { useEffect, useState } from 'react';

const MainTypes: React.FC = () => {
  const { wizardsData, onSetWizardsData, activePage } = useWizardsContext();
  const [allTypes, setAllTypes] = useState<any>({
    'Unique type(s)': {
      validationFn: (type: string) => type.trim().length > 0,
      data: wizardsData[activePage - 1]?.answer?.types || [
        {
          val: '',
          isTouched: false,
        },
      ],
      placeholder: 'Wireless ...',
      name: 'types',
    },
    'Color(s)': {
      validationFn: colorValidation,
      data: wizardsData[activePage - 1]?.answer?.colors || [
        {
          val: '',
          isTouched: false,
        },
      ],
      placeholder: 'e.g : red, blue',
      name: 'colors',
    },
    Stock: {
      validationFn: (val: string) => val.trim().length > 0 && Number(val),
      data: wizardsData[activePage - 1]?.answer?.stock || [
        {
          val: '',
          isTouched: false,
        },
      ],
      placeholder: '125 ...',
      single: true,
      name: 'stock',
    },
  });

  const typeEntries = Object.entries(allTypes);

  const handleUpdateType = (
    key: string,
    newValue: string,
    valIndex: number
  ) => {
    setAllTypes((prevTypes: any) => {
      return {
        ...prevTypes,
        [key]: {
          ...prevTypes[key],
          data: prevTypes[key].data.map((item: any, index: number) => {
            if (index === valIndex) {
              return {
                ...item,
                val: newValue,
              };
            } else {
              return item;
            }
          }),
        },
      };
    });
  };

  const handleBlur = (key: string, ind: number) => {
    setAllTypes((prevTypes: any) => {
      return {
        ...prevTypes,
        [key]: {
          ...prevTypes[key],
          data: prevTypes[key].data.map((item: any, index: number) => {
            if (index === ind) {
              return {
                ...item,
                isTouched: true,
              };
            } else {
              return item;
            }
          }),
        },
      };
    });
  };

  const addTypeHandler = (key: string) => {
    setAllTypes((prevTypes: any) => {
      const everythingIsValid = prevTypes[key].data.every((item: any) =>
        prevTypes[key].validationFn(item.val)
      );

      if (!everythingIsValid)
        return {
          ...prevTypes,
          [key]: {
            ...prevTypes[key],
            data: prevTypes[key].data.map((data: any, index: number) => {
              if (index === prevTypes[key].data.length - 1) {
                return {
                  ...data,
                  isTouched: true,
                };
              } else {
                return data;
              }
            }),
          },
        };
      return {
        ...prevTypes,
        [key]: {
          ...prevTypes[key],
          data: [...prevTypes[key].data, { val: '', isTouched: false }],
        },
      };
    });
  };

  const removeTypeHandler = (key: string, dataIndex: number) => {
    console.log(key, dataIndex);
    setAllTypes((prevTypes: any) => {
      return {
        ...prevTypes,
        [key]: {
          ...prevTypes[key],
          data: prevTypes[key].data.filter(
            (_: any, id: number) => id !== dataIndex
          ),
        },
      };
    });
  };

  useEffect(() => {
    const answerObj: any = {};

    for (let i in allTypes) {
      answerObj[allTypes[i].name] = allTypes[i].data;
    }

    const updatedWizardsData = wizardsData.map((data: any, index: any) => {
      if (index === activePage - 1) {
        return {
          ...data,
          answer: answerObj,
        };
      } else {
        return data;
      }
    });

    onSetWizardsData(updatedWizardsData);
  }, [allTypes]);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-3xl mb-3 font-medium text-primary-black">
          Highlight Key Features of Your Product
        </h1>
        <p className="text-base font-medium text-primary-gray">
          Share specific details and types to showcase this product's unique
          qualities
        </p>
      </div>
      <div className="flex">
        {typeEntries.map(([key, value]: [key: string, value: any], index) => (
          <ul className="flex flex-col" key={index}>
            {/* // headers */}

            <li className="w-[200px]  relative border-[1px] border-secondary-gray text-primary-black border-b-0 font-bold text-center px-5 py-2">
              <p className="w-[90%] whitespace-nowrap overflow-x-auto">{key}</p>
              {!value.single && (
                <button
                  className="absolute top-0 right-2 h-fit my-auto bottom-0 !fill-primary-purple"
                  onClick={() => addTypeHandler(key)}
                >
                  <IconPlus className="size-5" />
                </button>
              )}
            </li>
            {value.data.map((row: any, rowIndex: number) => (
              <li
                key={rowIndex}
                className="w-[200px]  overflow-x-auto text-primary-black  font-regular text-center "
              >
                <div className="relative">
                  <input
                    type="text"
                    className={`h-full px-10 py-2 w-full  border-[1px] border-secondary-gray focus:outline-none text-center ${
                      !value.validationFn(row.val) && row.isTouched
                        ? 'placeholder:!text-red-500 text-red-500'
                        : null
                    } ${
                      rowIndex !== value.data.length - 1 ? 'border-b-0' : null
                    } `}
                    placeholder={value.placeholder}
                    onChange={(e) =>
                      handleUpdateType(key, e.target.value, rowIndex)
                    }
                    onBlur={() => handleBlur(key, rowIndex)}
                    value={row.val}
                  />
                  {rowIndex > 0 && (
                    <button
                      className="absolute top-0 bottom-0 my-auto left-2"
                      onClick={() => removeTypeHandler(key, rowIndex)}
                    >
                      <IconX className=" fill-primary-purple size-5" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>
      {wizardsData[activePage - 1].error && (
        <p className="font-medium text-red-500">
          {wizardsData[activePage - 1].errorMessage}
        </p>
      )}
    </div>
  );
};

export default MainTypes;
