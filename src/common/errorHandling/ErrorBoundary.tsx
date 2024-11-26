import React, { useEffect } from 'react';

import { notify } from '../components/notification/Notification';

import { useErrorContext } from './ErrorContext';
import { BusinessException } from './exceptions/BusinessException';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const { publish } = useErrorContext(); // Use the error context

  const handleGlobalError = (event: ErrorEvent) => {
    event.preventDefault();
    handleException(event.error);
  };

  const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    event.preventDefault();
    handleException(event.reason);
  };

  const handleException = (error: Error | string) => {
    if (error instanceof BusinessException) {
      error.handleNotification(() => {
        publish(error); // Add the error to the context
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
