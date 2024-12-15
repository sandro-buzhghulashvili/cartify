import { IconX } from '@/components/icons/Icons';
import { ReactNode, useEffect, useState } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  closeButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, onClose, closeButton }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div
      className={`fixed z-40 top-0 left-0 w-full h-screen bg-backdrop-black 
        ${isClosing ? 'animate-modalOut' : 'animate-modalIn'}`}
      onClick={handleClose}
    >
      <div
        className="w-fit h-fit top-0 bottom-0 left-0 right-0 m-auto fixed z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {closeButton && (
          <button
            onClick={handleClose}
            className="-top-5 -right-3 absolute bg-white rounded-full"
          >
            <IconX className="size-10 fill-black" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
