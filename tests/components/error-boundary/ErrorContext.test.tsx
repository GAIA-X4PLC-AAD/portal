import { act, render, screen } from '@testing-library/react';
import React from 'react';

import BusinessObjectNotFound from '../../../src/common/exceptions/BusinessObjectNotFound';
import { ErrorProvider, useErrorContext } from '../../../src/components/error-boundary/ErrorContext';

// Mock the BusinessException
jest.mock('../../../src/common/exceptions/BusinessException', () => ({
  BusinessException: jest.fn().mockImplementation((message) => ({
    message,
    handleNotification: jest.fn(),
  })),
}));

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging

describe('ErrorContext', () => {
  it('should provide context and allow publishing an error', () => {
    const TestComponent = () => {
      const { errorMessages, publish } = useErrorContext();

      return (
        <div>
          <button
            onClick={() => publish(new BusinessObjectNotFound('Test error', 'http://some.dummy.uri'))}
          >
                        Publish Error
          </button>
          <div data-testid="error-messages">
            {errorMessages.length > 0 ? 'Error Published' : 'No Errors'}
          </div>
        </div>
      );
    };

    render(
      <ErrorProvider>
        <TestComponent/>
      </ErrorProvider>
    );

    // Initially, no errors should be present
    expect(screen.getByTestId('error-messages').textContent).toBe('No Errors');

    // Simulate publishing an error
    act(() => {
      screen.getByText('Publish Error').click();
    });

    // After clicking the button, an error should be published
    expect(screen.getByTestId('error-messages').textContent).toBe('Error Published');
  });

  it('should remove a specific error message from the context', () => {
    const TestComponent = () => {
      const { errorMessages, publish, removeMessage } = useErrorContext();
      const error = new BusinessObjectNotFound('Test error', 'uri');

      return (
        <div>
          <button onClick={() => publish(error)}>Publish Error</button>
          {errorMessages.length > 0 && (
            <button onClick={() => removeMessage(errorMessages[0].messageId)}>
                            Remove Error
            </button>
          )}
          <div data-testid="error-messages">
            {errorMessages.length === 0
              ? 'No Errors'
              : `Error count: ${errorMessages.length}`}
          </div>
        </div>
      );
    };

    render(
      <ErrorProvider>
        <TestComponent/>
      </ErrorProvider>
    );

    // Initially, no errors should be present
    expect(screen.getByTestId('error-messages').textContent).toBe('No Errors');

    // Simulate publishing an error
    act(() => {
      screen.getByText('Publish Error').click();
    });

    // After clicking the button, one error should be published
    expect(screen.getByTestId('error-messages').textContent).toBe('Error count: 1');

    // Simulate removing the error
    act(() => {
      screen.getByText('Remove Error').click();
    });

    // After removing the error, it should be gone
    expect(screen.getByTestId('error-messages').textContent).toBe('No Errors');
  });

  it('should throw an error when useErrorContext is used outside of ErrorProvider', () => {
    const TestComponent = () => {
      useErrorContext(); // This should throw error if not within ErrorProvider
      return null;
    };

    // Render without ErrorProvider to test for the error
    expect(() => render(<TestComponent/>)).toThrow('useErrorContext must be used within an ErrorProvider');
  });
});
