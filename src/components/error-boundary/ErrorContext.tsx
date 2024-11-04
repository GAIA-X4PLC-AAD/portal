import React, { createContext, ReactNode, useContext, useState } from 'react';

import { GaiaXException } from '../../common/exceptions/GaiaXException';

// Define the shape of the context
interface ErrorContextType {
    gaiaXExceptionList: GaiaXException[];
    addException: (exception: GaiaXException) => void;
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
  const [gaiaXExceptionList, setGaiaXExceptionList] = useState<GaiaXException[]>([]);

  const addException = (exception: GaiaXException) => {
    setGaiaXExceptionList((prevList) => [...prevList, exception]);
  };

  return (
    <ErrorContext.Provider value={{ gaiaXExceptionList, addException }}>
      {children}
    </ErrorContext.Provider>
  );
};
