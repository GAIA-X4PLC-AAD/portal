import React, { useEffect } from 'react';

import { GaiaXException } from '../../common/exceptions/GaiaXException';
import { notify } from '../notification/Notification';

import { useErrorContext } from './ErrorContext';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const { addException } = useErrorContext(); // Use the error context

  const handleGlobalError = (event: ErrorEvent) => {
    event.preventDefault();
    console.log('Handle global error', event);
    handleException(event.error);
  };

  const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    event.preventDefault();
    console.log('Handle unhandled rejection', event);
    handleException(event.reason);
  };

  const handleException = (error: Error | string) => {
    if (error instanceof GaiaXException) {
      error.showNotification(() => {
        addException(error); // Add the error to the context
        console.log('set ErrorBoundary', error);
      });
    } else {
      const errorMessage = getErrorMessage(error);
      showNotification(errorMessage);
    }
  };

  const getErrorMessage = (error: string | { message?: string }): string => {
    let errorMessage = '';
    if (typeof error === 'string') {
      errorMessage = error;
    } else if (typeof error === 'object') {
      errorMessage = error.message || 'Unknown error';
    } else {
      errorMessage = 'Unknown error';
    }
    return errorMessage;
  };

  const showNotification = (errorMessage: string) => {
    notify({
      messageType: 'ERROR',
      message: errorMessage,
    });
  };

  useEffect(() => {
    console.log('Register listeners');
    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return <>{children}</>;
};

export default ErrorBoundary;
