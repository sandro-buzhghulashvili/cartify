import { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div
      className="fixed z-40 top-0 left-0 w-full h-screen bg-backdrop-black"
      onClick={onClose}
    >
      <div
        className="w-fit h-fit top-0 bottom-0 left-0 right-0 m-auto absolute z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
