import { IconX } from '@/components/icons/IconX';
import { FlashMessageType } from '@/contexts/FlashMessagesContext';
import { useEffect, useState } from 'react';

interface FlashMessageProps {
  message: FlashMessageType;
  onClose: () => void;
}

const FlashMessage: React.FC<FlashMessageProps> = ({
  message: messageObj,
  onClose,
}) => {
  const [closing, setClosing] = useState(false);
  const duration = 5000;

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    const timer = setTimeout(handleClose, duration);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed animate-modalIn top-[120px] px-5 py-3 left-0 w-2/5 right-0 mx-auto z-10 ${
        closing ? 'animate-modalOut' : null
      } ${
        messageObj.state === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white rounded-md shadow-md flex justify-between items-center`}
    >
      <h1 className="font-medium text-base">{messageObj.message}</h1>
      <button onClick={handleClose}>
        <IconX className="size-6 fill-white stroke-white" />
      </button>
      {/* Timer bar */}
      <div className="absolute left-0 bottom-0 mt-2 w-full h-1 bg-gray-300">
        <div
          className={`h-full  ${
            messageObj.state === 'error' ? 'bg-white' : 'bg-green-700'
          }`}
          style={{
            animation: `progress ${duration}ms linear forwards`,
          }}
        />
      </div>
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default FlashMessage;
