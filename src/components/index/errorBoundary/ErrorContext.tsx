import React, { createContext, ReactNode, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { BusinessException } from '../../../common/exceptions/BusinessException';

// Define the shape of the context
interface ErrorContextType {
    errorMessages: ErrorMessage[];
    publish: (exception: BusinessException) => void;
    removeMessage: (messageId: string) => void;
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

type ErrorMessage = {
    messageId: string,
    exception: BusinessException,
}

// ErrorProvider component
export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [errorMessages, setErrorMessages] = useState<ErrorMessage[]>([]);

  const publish = (exception: BusinessException) => {
    const messageWithId = {
      messageId: uuid(),
      exception: exception,
    };
    setErrorMessages((prevList) => [...prevList, messageWithId]);
  };

  const removeMessage = (messageId: string) => {
    setErrorMessages((prevList) => prevList.filter((msg) => msg.messageId !== messageId));
  };

  return (
    <ErrorContext.Provider value={{ errorMessages, publish, removeMessage }}>
      {children}
    </ErrorContext.Provider>
  );
};
