import { DiscountObject } from '@/components/dashboard/company/update_product/Discount';
import { IconCart } from '@/components/icons/IconCart';
import { IconHeart } from '@/components/icons/IconHeart';

interface ProductPricePanelProps {
  price: number;
  discount: number | DiscountObject;
}

const ProductPricePanel: React.FC<ProductPricePanelProps> = ({
  price,
  discount,
}) => {
  return (
    <div className="flex items-center text-primary-black w-full justify-between">
      <div className="flex items-center gap-3">
        {typeof discount === 'number' ||
        (discount?.endDate &&
          new Date().getTime() > new Date(discount.endDate).getTime()) ? (
          <h1 className="font-medium text-[28px]">${price.toFixed(2)}</h1>
        ) : (
          <>
            <h1 className="font-medium text-[28px]">
              $
              {((price * (100 - Number(discount?.percentage))) / 100).toFixed(
                2
              )}
            </h1>
            <p className="text-base font-medium text-primary-red line-through">
              ${price.toFixed(2)}
            </p>
          </>
        )}
      </div>
      <section className="flex items-center gap-5">
        <button className="px-5 py-2 border-[1px] text-sm font-medium text-primary-indigo border-primary-indigo rounded-md">
          Buy Now
        </button>
        <button className="flex items-center gap-5 px-5 py-2 text-sm font-medium  rounded-md text-white bg-primary-indigo">
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
