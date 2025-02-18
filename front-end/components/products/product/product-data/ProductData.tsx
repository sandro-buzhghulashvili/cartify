import { IconStar } from '@/components/icons/Icons';
import { ProductType } from '@/components/wizards/company-add-product/MainTypes';
import { formatNumber } from '@/helpers/number_helpers';
import ProductDescription from './ProductDescription';
import { DiscountObject } from '@/components/dashboard/company/update_product/Discount';

import dynamic from 'next/dynamic';

const ProductActions = dynamic(() => import('./ProductActions'), {
  ssr: false,
});

interface ProductDataProps {
  title: string;
  rating:
    | number
    | {
        total: number;
        average: number;
      };
  sells: number;
  views: number;
  description: string;
  types: ProductType[];
  colors: string[];
  stock: number;
  price: number;
  discount: number | DiscountObject;
}

const ProductData: React.FC<ProductDataProps> = ({
  title,
  rating,
  sells,
  views,
  description,
  types,
  colors,
  stock,
  price,
  discount,
}) => {
  return (
    <div className="flex flex-col max-w-[50%] gap-10 text-primary-black">
      <div className="flex flex-col gap-5">
        <h1 className="font-medium text-4xl">{title}</h1>
        <div className="flex items-center gap-5">
          {/* rating box */}
          <section className="flex bg-[#F49342] rounded-lg text-white items-center gap-2 p-2">
            <IconStar className="size-4 !fill-white" />
            <p>
              {typeof rating !== 'number'
                ? rating.average.toFixed(1)
                : rating.toFixed(1)}
            </p>
          </section>
          <p className="font-medium text-sm text-primary-gray">
            {sells} Product sold
          </p>
          <p className="font-medium text-sm text-primary-gray">
            {formatNumber(views)} Product watched
          </p>
        </div>
        {/* description */}
        <ProductDescription description={description} />
      </div>
      <ProductActions
        types={types}
        colors={colors}
        stock={stock}
        price={price}
        discount={discount}
      />
    </div>
  );
};

export default ProductData;
