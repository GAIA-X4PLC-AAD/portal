import { toast } from 'react-toastify';

import { Notification } from '../../types/notification.model';

export const notify = (notification: Notification) => {

  function getAutoClose(autoClose: number | undefined | false): number | false {
    if (autoClose === false) {
      return false; // Return false if autoClose is explicitly set to false
    } else if (autoClose === undefined) {
      return 15000; // Return 15000 (15 seconds) if autoClose is undefined
    } else {
      return autoClose; // Return the value of autoClose if it's a number
    }
  }

  const toastOptions = {
    ...notification.options,
    autoClose: getAutoClose(notification.options ? notification.options.autoClose : undefined),
  }

  switch (notification.messageType) {
  case 'SUCCESS':
    toast.success(notification.message, {
      ...toastOptions,
    });
    break;
  case 'ERROR':
    toast.error(notification.message, {
      ...toastOptions,
      autoClose: false
    });
    break;
  case 'WARNING':
    toast.warn(notification.message, {
      ...toastOptions,
    });
    break;
  case 'INFO':
    toast.info(notification.message, {
      ...toastOptions,
    });
    break;
  default:
    toast(notification.message, {
      ...toastOptions,
    });
    break
  }
};

