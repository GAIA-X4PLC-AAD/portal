import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import React from 'react';

import BusinessObjectNotFound from '../../../src/common/exceptions/BusinessObjectNotFound';
import ErrorBoundary from '../../../src/components/error-boundary/ErrorBoundary';
import { notify } from '../../../src/components/notification/Notification';

// Mock the notify function
jest.mock('../../../src/components/notification/Notification', () => ({
  notify: jest.fn(),
}));

const useErrorContext = {
  publish: jest.fn(),
}
// Mock the useErrorContext hook
jest.mock('../../../src/components/error-boundary/ErrorContext', () => ({
  useErrorContext: () => useErrorContext,
}));

describe('ErrorBoundary', () => {

  beforeEach(() => {
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle global errors and call showNotification', () => {
    const errorMessage = 'Global error message';

    // Render the ErrorBoundary
    render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>
    );

    // Simulate a global error
    act(() => {
      const errorEvent = new ErrorEvent('error', {
        error: new Error(errorMessage),
      });
      window.dispatchEvent(errorEvent);
    });

    // Check if notify was called with the correct message
    expect(notify).toHaveBeenCalledWith({
      messageType: 'ERROR',
      message: errorMessage,
    });
  });

  it('should handle unhandled promise rejections and call showNotification', () => {
    const errorMessage = 'Unhandled promise rejection message';

    // Render the ErrorBoundary
    render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>
    );

    // Simulate an unhandled promise rejection
    act(() => {
      const rejectionEvent = new Event('unhandledrejection');
      // Attach a custom rejection reason (simulating an error)
      rejectionEvent.reason = new Error(errorMessage);
      window.dispatchEvent(rejectionEvent);
    });

    // Check if notify was called with the correct message
    expect(notify).toHaveBeenCalledWith({
      messageType: 'ERROR',
      message: errorMessage,
    });
  });

  it('should call publish on BusinessException', () => {
    const errorMessage = 'Business Exception occurred';
    const uri = 'http://some.dummy.uri';

    // Mock the BusinessException class to have a handleNotification method
    const mockBusinessException = new BusinessObjectNotFound(errorMessage, uri);
    mockBusinessException.handleNotification = jest.fn((callback) => callback());

    // Render the ErrorBoundary
    render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>
    );

    // Simulate a global error for a BusinessException
    act(() => {
      const errorEvent = new ErrorEvent('error', {
        error: mockBusinessException,
      });
      window.dispatchEvent(errorEvent);
    });

    // Ensure that handleNotification was called
    expect(mockBusinessException.handleNotification).toHaveBeenCalled();

    // Check if publish was called
    expect(useErrorContext.publish).toHaveBeenCalledWith(mockBusinessException);
  });

  it('should call default toast when a string is thrown and messageType is undefined', () => {
    const errorMessage = 'Unknown error'; // Expected error message when a string is thrown

    // Render the ErrorBoundary
    render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>
    );

    // Simulate throwing an unhandled rejection with a string error (as per the original logic)
    act(() => {
      const errorEvent = new Event('unhandledrejection');
      errorEvent.reason = 'Unknown error'; // Simulate a string rejection reason
      window.dispatchEvent(errorEvent);
    });

    // Check if notify was called with the default toast function
    expect(notify).toHaveBeenCalledWith({
      message: errorMessage, // Ensure the correct error message is passed
      messageType: 'ERROR',  // Ensure the messageType is 'ERROR'
    });
  });

  it('When the error message on the error object is not specified, \'Unknown error\' should be notified', () => {
    const errorMessage = 'Unknown error'; // Expected error message when no message is specified on the error object

    // Render the ErrorBoundary
    render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>
    );

    // Simulate throwing an unhandled rejection with an error that has no message
    act(() => {
      const errorEvent = new Event('unhandledrejection');
      errorEvent.reason = new Error(); // Create an error with no message (undefined message)
      window.dispatchEvent(errorEvent);
    });

    // Check if notify was called with the default toast function
    expect(notify).toHaveBeenCalledWith({
      message: errorMessage, // Ensure the fallback message 'Unknown error' is used
      messageType: 'ERROR',  // Ensure the messageType is 'ERROR'
    });
  });

  it('Should handle undefined messageType and call default toast with \'Unknown error.\'', () => {
    const errorMessage = 'Unknown error'; // Simulate an error message with an unknown type

    // Render the ErrorBoundary
    render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>
    );

    // Simulate throwing a string error directly
    act(() => {
      const errorEvent = new Event('unhandledrejection', {})
      errorEvent.reason = undefined; // Simulate undefined rejection reason to trigger "Unknown error"
      window.dispatchEvent(errorEvent);
    });

    // Check if notify was called with the default toast function
    expect(notify).toHaveBeenCalledWith({
      message: errorMessage, // Ensure that the correct message is passed
      messageType: 'ERROR',
    });
  });
});
