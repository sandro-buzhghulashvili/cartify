import { useWizardsContext } from '@/contexts/WizardsContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { ProductType } from './MainTypes';

const FinishProduct: React.FC = () => {
  const { wizardsData } = useWizardsContext();
  const productHashMap: any = {};
  const [productPreviews, setProductPreviews] = useState<string[]>([]);
  const [activePreviewImage, setActivePreviewImage] = useState(0);

  wizardsData.slice(0, wizardsData.length - 1).forEach((data) => {
    productHashMap[data.title] = data.answer;
  });

  useEffect(() => {
    const images = productHashMap.product_details?.images;

    if (images && images.length > 0) {
      const previews: string[] = [];
      images.forEach((img: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result as string);
          if (previews.length === images.length) {
            setProductPreviews(previews);
          }
        };
        reader.readAsDataURL(img);
      });
    }
  }, []);

  const typeOptions =
    wizardsData[2].validationFn(wizardsData[2].answer) &&
    productHashMap.main_types.types.map((item: any) => ({
      value: item.val,
      label: item.val.type[0].toUpperCase() + item.val.type.slice(1),
    }));

  const [activeType, setActiveType] = useState<ProductType>(
    typeOptions[0]?.value
  );

  const totalAmount =
    wizardsData[2].validationFn(wizardsData[2].answer) &&
    Number(productHashMap.main_types.stock[0].val);

  const availableColors =
    wizardsData[2].validationFn(wizardsData[2].answer) &&
    productHashMap.main_types.colors.map((col: any) => col.val);

  console.log(activeType);
  return (
    <>
      <div className="py-10 flex text-primary-black justify-around items-center">
        {/* // images section */}
        {productPreviews.length > 0 ? (
          <section className="flex items-center flex-col gap-10">
            <Image
              src={productPreviews[activePreviewImage]}
              alt="product-preview"
              width={300}
              height={300}
              className="w-[280px] h-[280px] object-contain aspect-square"
            />
            <ul className="flex justify-around max-w-[300px] gap-5 flex-nowrap overflow-x-auto pb-3">
              {productPreviews.map((preview, index) => (
                <li
                  key={index}
                  onClick={() => setActivePreviewImage(index)}
                  className={`cursor-pointer  hover:bg-gray-300 rounded-md duration-300 flex-shrink-0  ${
                    activePreviewImage === index
                      ? 'relative border-2 border-primary-purple '
                      : null
                  }`}
                >
                  <Image
                    src={preview}
                    alt={`product-${index}`}
                    width={90}
                    height={70}
                    className={`w-[90px] h-[70px] object-contain p-2 z-2 `}
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <p className="text-red-500">Product images aren't provided</p>
        )}
        {/* // product title and description section */}
        <section className="w-3/5 flex flex-col gap-8">
          {productHashMap.about_company?.title.trim().length > 0 ? (
            <h1 className="text-3xl font-medium leading-[52px]">
              {productHashMap.about_company.title}
            </h1>
          ) : (
            <p className="text-red-500">Product title isn't provided</p>
          )}
          {productHashMap.about_company?.description.trim().length > 50 ? (
            <p className="text-base font-normal leading-[28px] text-teritary-gray w-4/5">
              {productHashMap.about_company.description}
            </p>
          ) : (
            <p className="text-red-500">Product description isn't provided</p>
          )}
          {/* // main types  */}
          {wizardsData[2].validationFn(wizardsData[2].answer) ? (
            <div className="flex gap-5 items-center">
              {/* // types */}
              <div className="flex flex-col gap-2 w-[150px]">
                <label className="text-sm font-medium text-teritary-gray">
                  Types
                </label>
                <Select
                  options={typeOptions}
                  defaultValue={typeOptions[0]}
                  onChange={(selected) => setActiveType(selected?.value)}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      outline: 'none',
                      boxShadow: 'none',
                      borderColor: '#959EAD',
                      '&:hover': {
                        border: '1px solid #959EAD',
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
                  }}
                />
              </div>
              {/* // amount */}
              <div className=" flex flex-col gap-2 w-[100px]">
                <label className="text-sm font-medium text-teritary-gray">
                  Amount
                </label>
                <span className="border-[1px] border-primary-gray py-[6px] px-2 rounded-[4px]">
                  {totalAmount}
                </span>
              </div>
              {/* // colors */}
              <div className=" flex flex-col gap-2 w-[100px]">
                <label className="text-sm font-medium text-teritary-gray">
                  Color{availableColors.length > 1 && 's'}
                </label>
                <ul className="w-[300px] flex flex-nowrap gap-5 items-center overflow-x-auto pb-1">
                  {availableColors.map((color: string, index: number) => (
                    <li
                      key={index}
                      className={`py-[6px] px-2 w-[100px] flex-shrink-0 rounded-[4px] border-[1px] border-primary-gray flex items-center justify-between`}
                    >
                      <span>{color}</span>
                      <span
                        className="size-5 rounded-full border-[1px] border-black"
                        style={{ backgroundColor: color }}
                      ></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-red-500">Neccessary types aren't provided</p>
          )}
        </section>
      </div>
      {/* overview: features and detailed product data */}
      <div className="px-32 py-10 flex justify-between">
        {wizardsData[3].validationFn(wizardsData[3].answer) ? (
          <div className=" flex flex-col gap-5 w-1/2">
            <label className="text-2xl font-medium text-primary-black">
              Overview
            </label>
            <ul className="px-10 py-5 flex flex-col gap-5">
              {productHashMap.specifications.specifications.map(
                (spec: any, index: number) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-base text-primary-gray font-medium max-w-[120px] overflow-x-auto">
                      {spec.detail}
                    </span>
                    <p className="text-base w-1/2 text-primary-black font-medium">
                      {spec.value}
                    </p>
                  </li>
                )
              )}
            </ul>
          </div>
        ) : (
          <p className="text-red-500">Please provide specifications</p>
        )}
        {wizardsData[1].validationFn(wizardsData[1].answer) ? (
          <div>
            <p className="text-2xl font-medium text-primary-black">
              Price:
              <span className="ml-3">
                $
                {productHashMap.main_types?.types[0]
                  ? Number(productHashMap.product_details.product_price) *
                    ((100 + activeType.addition) / 100)
                  : Number(
                      productHashMap.product_details.product_price
                    ).toFixed(2)}
              </span>
            </p>
          </div>
        ) : (
          <p className="text-red-500">Please provide product details</p>
        )}
      </div>
    </>
  );
};

export default FinishProduct;
