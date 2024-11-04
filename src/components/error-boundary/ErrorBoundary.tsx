import React, { useEffect, useRef } from 'react';

import { GaiaXException } from '../../common/exceptions/GaiaXException';
import { notify } from '../notification/Notification';

type ErrorBoundaryProps = {
    children: React.ReactNode;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const lastErrorRef = useRef<string | null>(null);

  const handleGlobalError = (event: ErrorEvent) => {
    event.preventDefault();
    console.log('Handle global error', event);
    handleException(event.error);
  };

  const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    event.preventDefault();
    console.log('Handle unhandled rejection', event);
    //const errorMessage = event.reason instanceof Error ? event.reason.message : String(event.reason);
    handleException(event.reason)
  };

  const handleException = (error: Error | string) => {
    // Check if the error is an instance of GaiaXException
    if (error instanceof GaiaXException) {
      error.showNotification();  // Call showNotification if it's a GaiaXException
    } else {
      // Show standard error notification if it's not a GaiaXException
      const errorMessage = getErrorMessage(error);
      showNotification(errorMessage);
    }
  }

  const getErrorMessage = (error: string | { message?: string }): string => {
    let errorMessage = ''
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
    // Only notify if the error message is unique
    //   if (errorMessage !== lastErrorRef.current) {
    lastErrorRef.current = errorMessage;
    notify({
      messageType: 'ERROR',
      message: errorMessage,
    });
    //  }
  }

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
