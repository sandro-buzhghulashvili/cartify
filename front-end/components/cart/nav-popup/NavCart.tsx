import { IconCart } from '@/components/icons/Icons';
import { useCartContext } from '@/contexts/CartContext';
import { useEffect, useState } from 'react';
import CartPopupMenu from './CartPopupMenu';

const NavCart: React.FC = () => {
  const cartContext = useCartContext();

  const [hovering, setHovering] = useState<boolean>(false);
  const [closingPopup, setClosingPopup] = useState<boolean>(false);

  useEffect(() => {
    if (!closingPopup) return;
    const timer = setTimeout(() => {
      setHovering(false);
      setClosingPopup(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [closingPopup]);

  return (
    <div
      className={`relative flex items-center justify-center px-1 ${
        closingPopup ? 'pointer-events-none' : null
      }`}
      onMouseEnter={() => {
        setClosingPopup(false);
        setHovering(true);
      }}
      onMouseLeave={() => setClosingPopup(true)}
    >
      <button
        className="relative animate-momentalPulse"
        key={cartContext?.cart.reduce((acc, item) => acc + item.quantity, 0)}
      >
        <IconCart />
        <span className="absolute -top-4 text-[12px] font-medium -right-4 flex justify-center items-center rounded-full size-[22px] bg-primary-red text-white">
          {cartContext?.cart.reduce((acc, item) => acc + item.quantity, 0) || 0}
        </span>
      </button>
      {/* // transparent panel */}
      {hovering && (
        <span className="absolute left-0 -bottom-5 h-[20px] w-[50px] bg-transparent z-5"></span>
      )}
      {hovering && (
        <div
          className={`absolute shadow-md left-0 top-7 bg-white h-fit w-[300px] py-3 rounded-lg px-5 z-5 ${
            closingPopup ? 'animate-slideDown' : 'animate-slideUp'
          }`}
        >
          <CartPopupMenu
            totalProducts={cartContext?.cart.length || 0}
            totalPrice={
              cartContext?.cart.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              ) || 0
            }
            items={cartContext?.cart || []}
          />
        </div>
      )}
    </div>
  );
};

export default NavCart;
