import React, { useEffect, useRef } from 'react';

import { notify } from '../notification/Notification';

type ErrorBoundaryProps = {
    children: React.ReactNode;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const lastErrorRef = useRef<string | null>(null);

  const handleGlobalError = (event: ErrorEvent) => {
    event.preventDefault();

    // Only notify if the error message is unique
    const errorMessage = event.error.message || 'An unknown error occurred';
    if (errorMessage !== lastErrorRef.current) {
      lastErrorRef.current = errorMessage;
      notify({
        messageType: 'ERROR',
        message: errorMessage,
      });
    }
  };

  const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    event.preventDefault();

    const errorMessage = event.reason instanceof Error ? event.reason.message : String(event.reason);
    if (errorMessage !== lastErrorRef.current) {
      lastErrorRef.current = errorMessage;
      notify({
        messageType: 'ERROR',
        message: errorMessage,
      });
    }
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
