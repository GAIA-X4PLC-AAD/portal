import '@testing-library/jest-dom';
import { notify } from '../../../../src/common/components/notification/Notification';
import { BusinessException } from '../../../../src/common/errorHandling/exceptions/BusinessException';
import { NotificationMessageType } from '../../../../src/types/notification.model';

// Mock the `notify` function
jest.mock('../../../../src/common/components/notification/Notification', () => ({
  notify: jest.fn(),
}));

// Define a concrete subclass for testing
class DummyException extends BusinessException {
  constructor(message: string, messageType?: NotificationMessageType) {
    super(message, messageType);
    this.name = 'DummyException';
  }
}

describe('BusinessException', () => {
  it('should call notify with correct arguments in handleNotification', () => {
    const message = 'Test error message';
    const messageType: NotificationMessageType = 'ERROR';
    const error = new DummyException(message, messageType);

    // Call handleNotification
    error.handleNotification();

    // Verify that notify was called with the correct parameters
    expect(notify).toHaveBeenCalledWith({
      messageType,
      message,
    });
  });

  it('should use default messageType if not provided', () => {
    const message = 'Another test error message';
    const error = new DummyException(message);

    // Call handleNotification
    error.handleNotification();

    // Verify that notify was called with the default messageType 'ERROR'
    expect(notify).toHaveBeenCalledWith({
      messageType: 'ERROR',
      message,
    });
  });
});
