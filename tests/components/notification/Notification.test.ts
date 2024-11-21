import { toast } from 'react-toastify';

import { notify } from '../../../src/components/notification/Notification';
import { Notification } from '../../../src/types/notification.model';

jest.mock('react-toastify', () => ({
  toast: {
    success: () => jest.fn(),
    error: () => jest.fn(),
    warn: () => jest.fn(),
    info: () => jest.fn()
  }
}))

describe('notify', () => {
  const message = 'Test notification message';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call toast.success with correct options for SUCCESS type', () => {
    const notification: Notification = {
      messageType: 'SUCCESS',
      message,
      options: { autoClose: 3000 },
    };

    notify(notification);

    expect(toast.success).toHaveBeenCalledWith(message, {
      ...notification.options,
      autoClose: 3000,
    });
  });

  it('should call toast.error with correct options for ERROR type and autoClose false', () => {
    const notification: Notification = {
      messageType: 'ERROR',
      message,
      options: { autoClose: 5000 },
    };

    notify(notification);

    expect(toast.error).toHaveBeenCalledWith(message, {
      ...notification.options,
      autoClose: false,
    });
  });

  it('should call toast.warn with correct options for WARNING type', () => {
    const notification: Notification = {
      messageType: 'WARNING',
      message,
      options: { autoClose: 4000 },
    };

    notify(notification);

    expect(toast.warn).toHaveBeenCalledWith(message, {
      ...notification.options,
      autoClose: 4000,
    });
  });

  it('should call toast.info with correct options for INFO type', () => {
    const notification: Notification = {
      messageType: 'INFO',
      message,
      options: { autoClose: 2000 },
    };

    notify(notification);

    expect(toast.info).toHaveBeenCalledWith(message, {
      ...notification.options,
      autoClose: 2000,
    });
  });

  it('should call default toast function for undefined messageType', () => {
    const notification: Notification = {
      messageType: undefined,
      message,
      options: { autoClose: 1500 },
    };

    notify(notification);

    expect(toast).toHaveBeenCalledWith(message, {
      ...notification.options,
      autoClose: 1500,
    });
  });

  it('should use default autoClose if not provided', () => {
    const notification: Notification = {
      messageType: 'SUCCESS',
      message,
      options: {}, // no autoClose provided
    };

    notify(notification);

    expect(toast.success).toHaveBeenCalledWith(message, {
      autoClose: 15000,
    });
  });
});
