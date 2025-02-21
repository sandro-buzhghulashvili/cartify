import { IconStar } from '@/components/icons/Icons';
import { formatNumber } from '@/helpers/number_helpers';
import ProductDescription from './ProductDescription';

import dynamic from 'next/dynamic';
import { Product } from '@/utils/validateProduct';

const ProductActions = dynamic(() => import('./ProductActions'), {
  ssr: false,
});

interface ProductDataProps {
  product: Product;
}

const ProductData: React.FC<ProductDataProps> = ({ product }) => {
  return (
    <div className="flex flex-col max-w-[50%] gap-10 text-primary-black">
      <div className="flex flex-col gap-5">
        <h1 className="font-medium text-4xl">{product.title}</h1>
        <div className="flex items-center gap-5">
          {/* rating box */}
          <section className="flex bg-[#F49342] rounded-lg text-white items-center gap-2 p-2">
            <IconStar className="size-4 !fill-white" />
            <p>
              {typeof product.rating !== 'number'
                ? product.rating.average.toFixed(1)
                : product.rating.toFixed(1)}
            </p>
          </section>
          <p className="font-medium text-sm text-primary-gray">
            {product.sells} Product sold
          </p>
          <p className="font-medium text-sm text-primary-gray">
            {formatNumber(product.views)} Product watched
          </p>
        </div>
        {/* description */}
        <ProductDescription description={product.description} />
      </div>
      <ProductActions product={product} />
    </div>
  );
};

export default ProductData;
