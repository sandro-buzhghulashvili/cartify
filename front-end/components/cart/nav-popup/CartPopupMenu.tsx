import { CartItem as CartItemType } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import CartItem from './CartItem';

interface CartPopupMenuProps {
  totalProducts: number;
  totalPrice: number;
  items: CartItemType[];
}

const CartPopupMenu: React.FC<CartPopupMenuProps> = ({
  totalProducts,
  totalPrice,
  items,
}) => {
  return (
    <div className="flex flex-col gap-5 text-primary-black py-3">
      <section className="flex items-center justify-between">
        <p className="text-base font-medium">Cart</p>
        <span className="font-medium text-sm text-primary-gray">
          {totalProducts} product
        </span>
      </section>
      {totalProducts === 0 ? (
        <div className="flex justify-center">
          <Image
            src="/illustrations/not-found.png"
            alt="not-found-thumb"
            width={150}
            height={150}
            className="size-[150px] object-contain"
          />
        </div>
      ) : (
        <ul className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2">
          {items.map((item, index) => (
            <CartItem
              key={index}
              productId={item.product._id}
              productThumbnail={item.product.images[0]}
              productPrice={item.price}
              productQuantity={item.quantity}
              productTitle={item.product.title}
              productType={item.product_individual_type}
            />
          ))}
        </ul>
      )}
      <div className="flex justify-end">
        <p className="text-sm text-secondary-gray font-medium">
          Total Price :
          <span className="font-bold ml-2">{totalPrice.toFixed(2)}$</span>
        </p>
      </div>
      <div className="flex justify-center">
        <Link
          href="#"
          className="flex text-sm font-medium items-center gap-3 px-10 py-2 bg-primary-purple text-white rounded-lg"
        >
          Open Cart
        </Link>
      </div>
    </div>
  );
};

export default CartPopupMenu;
