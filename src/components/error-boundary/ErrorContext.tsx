import React, { createContext, ReactNode, useContext, useState } from 'react';

import { BusinessException } from '../../common/exceptions/BusinessException';

// Define the shape of the context
interface ErrorContextType {
    messages: BusinessException[];
    publish: (exception: BusinessException) => void;
    removeMessage: (exception: BusinessException) => void;
}

// Create context with a default value of `undefined`
const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

// Custom hook to access ErrorContext
export const useErrorContext = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrorContext must be used within an ErrorProvider');
  }
  return context;
};

// Define the props type for ErrorProvider
interface ErrorProviderProps {
    children: ReactNode;
}

// ErrorProvider component
export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<BusinessException[]>([]);

  const publish = (exception: BusinessException) => {
    setMessages((prevList) => [...prevList, exception]);
  };

  const removeMessage = (exception: BusinessException) => {
    setMessages((prevList) => prevList.filter((msg) => msg.message !== exception.message));
  };

  return (
    <ErrorContext.Provider value={{ messages, publish, removeMessage }}>
      {children}
    </ErrorContext.Provider>
  );
};
