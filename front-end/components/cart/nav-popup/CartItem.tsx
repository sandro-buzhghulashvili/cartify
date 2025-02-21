import { IconMinus } from '@/components/icons/IconMinus';
import { IconPlus } from '@/components/icons/IconPlus';
import { IconTrashcan } from '@/components/icons/IconTrashcan';
import { useCartContext } from '@/contexts/CartContext';
import Image from 'next/image';

interface CartItemProps {
  productThumbnail: string;
  productTitle: string;
  productPrice: number;
  productQuantity: number;
  productType: string;
  productId: string;
}

const CartItem: React.FC<CartItemProps> = ({
  productThumbnail,
  productPrice,
  productTitle,
  productQuantity,
  productType,
  productId,
}) => {
  const cartContext = useCartContext();

  return (
    <div className="flex justify-between text-primary-black items-center p-3 rounded-lg bg-gray-100">
      <div className="flex items-center gap-2">
        <Image
          src={productThumbnail}
          alt={productTitle}
          width={50}
          height={50}
          className="size-[50px] object-contain rounded-lg"
        />
        <div className="flex-col justify-between w-2/5">
          <h1 className="text-sm font-medium">
            {productTitle.length > 10
              ? `${productTitle.slice(0, 10)}...`
              : productTitle}
          </h1>
          <p className="text-xs font-bold text-primary-indigo">
            {productPrice.toFixed(2)}$ (
            {productType.length > 10
              ? productType.slice(0, 10) + ' ...'
              : productType}
            )
          </p>
        </div>
      </div>
      {/* // action buttons */}
      <div className="flex flex-col gap-7  items-end">
        <button
          onClick={() => cartContext?.removeFromCart(productId, productType)}
        >
          <IconTrashcan className="size-4 fill-primary-gray" />
        </button>
        <div className="flex items-center gap-3 bg-primary-indigo text-white px-2 py-1 rounded-lg">
          <button
            onClick={() =>
              cartContext?.updateQuantity(
                productId,
                productQuantity - 1,
                productType
              )
            }
          >
            <IconMinus className="size-4 fill-white" />
          </button>
          <p className="text-sm font-medium">{productQuantity}</p>
          <button
            onClick={() =>
              cartContext?.updateQuantity(
                productId,
                productQuantity + 1,
                productType
              )
            }
          >
            <IconPlus className="size-4 fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
