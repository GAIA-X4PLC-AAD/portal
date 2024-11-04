import React, { useEffect, useRef } from 'react';

import { notify } from '../notification/Notification';

type ErrorBoundaryProps = {
    children: React.ReactNode;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const lastErrorRef = useRef<string | null>(null);

  const handleGlobalError = (event: ErrorEvent) => {
    event.preventDefault();
    console.log('Handle global error', event);

    let errorMessage = ''
    if (typeof event.error === 'string') {
      errorMessage = event.error;
    } else if (typeof event.error === 'object') {
      errorMessage = event.error.message || 'Unknown error';
    } else {
      errorMessage = 'Unknown error';
    }

    showNotification(errorMessage)
  };

  const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    event.preventDefault();
    console.log('Handle unhandled rejection', event);
    const errorMessage = event.reason instanceof Error ? event.reason.message : String(event.reason);
    showNotification(errorMessage)
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
    // window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return <>{children}</>;
};

export default ErrorBoundary;
