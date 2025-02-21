import { DiscountObject } from '@/components/dashboard/company/update_product/Discount';
import { IconCart } from '@/components/icons/IconCart';
import { IconHeart } from '@/components/icons/IconHeart';

interface ProductPricePanelProps {
  price: number;
  discount: number | DiscountObject;
  originalPrice: number;
  addition: number | null;
  onAddToCart: () => void;
}

const ProductPricePanel: React.FC<ProductPricePanelProps> = ({
  price,
  discount,
  originalPrice,
  addition,
  onAddToCart,
}) => {
  return (
    <div className="flex items-center text-primary-black w-full justify-between">
      <div className="relative flex items-center gap-3">
        {typeof discount === 'number' ||
        (discount?.endDate &&
          new Date().getTime() > new Date(discount.endDate).getTime()) ? (
          <h1 className="font-medium text-[28px]">${price.toFixed(2)}</h1>
        ) : (
          <>
            <h1 className="font-medium text-[28px]">${price.toFixed(2)}</h1>
            <p className="text-base font-medium text-primary-red line-through">
              ${originalPrice.toFixed(2)}
            </p>
          </>
        )}
        {addition !== 0 && (
          <span className="absolute -top-4 -right-8 p-1 bg-primary-indigo text-white rounded-[50%] text-xs font-medium">
            +{addition}%
          </span>
        )}
      </div>
      <section className="flex items-center gap-5">
        <button className="px-5 py-2 border-[1px] text-sm font-medium text-primary-indigo border-primary-indigo rounded-md">
          Buy Now
        </button>
        <button
          onClick={onAddToCart}
          className="flex items-center gap-5 px-5 py-2 text-sm font-medium  rounded-md text-white bg-primary-indigo"
        >
          Add to cart
          <IconCart className="fill-white" />
        </button>
        <button className="group p-2 shadow-md rounded-lg">
          <IconHeart className=" group-hover:fill-primary-red duration-300  fill-[#C4CDD5]" />
        </button>
      </section>
    </div>
  );
};

export default ProductPricePanel;
