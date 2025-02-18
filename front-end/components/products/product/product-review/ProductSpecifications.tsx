import { IconCheckbox } from '@/components/icons/Icons';

interface ProductSpecificationsProps {
  specifications: string;
  sku: string;
  productCode: string;
  ean: string;
}

interface SpecificationType {
  detail: string;
  value: string;
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({
  specifications,
  sku,
  productCode,
  ean,
}) => {
  const parsedSpecifications: SpecificationType[] =
    JSON.parse(specifications) || [];

  return (
    <div className="flex py-5">
      <div className="text-primary-black w-[60%]">
        <h1 className="font-medium text-lg mb-5">Overview</h1>
        <ul className="px-5">
          {parsedSpecifications.map((specification, index) => (
            <li
              key={index}
              className="flex gap-2 items-center py-5 px-10 bg-[#F9FAFB] even:bg-white"
            >
              <span className="font-normal w-1/3 text-sm text-primary-gray">
                {specification.detail}
              </span>
              <span className="font-normal w-full text-sm ">
                {specification.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/5 text-primary-black px-5">
        <h1 className="font-medium text-lg mb-5">Identification Codes</h1>
        <ul className="pl-5">
          <li className="flex items-center gap-3 py-5 px-10">
            <IconCheckbox className="size-5 fill-primary-gray" />
            <span className="text-sm font-normal">SKU Number : {sku}</span>
          </li>
          <li className="flex items-center gap-3 py-5 px-10">
            <IconCheckbox className="size-5 fill-primary-gray" />
            <span className="text-sm font-normal">
              Product Code : {productCode}
            </span>
          </li>
          <li className="flex items-center gap-3 py-5 px-10">
            <IconCheckbox className="size-5 fill-primary-gray" />
            <span className="text-sm font-normal">Ean Code : {ean}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductSpecifications;
