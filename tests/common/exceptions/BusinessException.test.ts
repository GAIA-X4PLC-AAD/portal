import '@testing-library/jest-dom';
import { BusinessException } from '../../../src/common/exceptions/BusinessException';
import { notify } from '../../../src/components/notification/Notification';
import { NotificationMessageType } from '../../../src/types/notification.model';

// Mock the `notify` function
jest.mock('../../../src/components/notification/Notification', () => ({
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
