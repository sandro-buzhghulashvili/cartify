'use client';

import FlashMessage from '@/components/shared/flash_message/FlashMessage';
import { createContext, ReactNode, useContext, useState } from 'react';

interface FlashMessagesContext {
  message: FlashMessageType | null;
  addFlashMessage: (message: FlashMessageType) => void;
  closeFlashMessage: () => void;
}

interface FlashMessagesProviderProps {
  children: ReactNode;
}

export interface FlashMessageType {
  message: string;
  state: 'success' | 'error';
}

const flashMessagesContext = createContext<FlashMessagesContext>({
  message: null,
  addFlashMessage: () => {},
  closeFlashMessage: () => {},
});

export const FlashMessagesProvider: React.FC<FlashMessagesProviderProps> = ({
  children,
}) => {
  const [message, setMessage] = useState<FlashMessageType | null>(null);

  const addFlashMessage = (message: FlashMessageType) => {
    setMessage(message);
  };

  const closeFlashMessage = () => {
    setMessage(null);
  };

  const contextValue = {
    message,
    addFlashMessage,
    closeFlashMessage,
  };

  return (
    <flashMessagesContext.Provider value={contextValue}>
      {message && (
        <FlashMessage message={message} onClose={closeFlashMessage} />
      )}
      {children}
    </flashMessagesContext.Provider>
  );
};

export const useFlashMessagesContext = () => {
  const ctx = useContext(flashMessagesContext);

  if (ctx !== null) {
    return ctx;
  }
};
