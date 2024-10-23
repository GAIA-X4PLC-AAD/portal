import { toast } from 'react-toastify';

import { Notification } from './notification.model';

export const notify = (notification: Notification) => {
  const toastOptions = {
    autoClose: getAutoClose(notification.autoClose),
    className: notification.className || '',
    bodyClassName: notification.bodyClassName || '',
    icon: notification.icon || null,
  };

  function getAutoClose(autoClose: number | undefined | false): number | false {
    if (autoClose === false) {
      return false; // Return false if autoClose is explicitly set to false
    } else if (autoClose === undefined) {
      return 15000; // Return 15000 (15 seconds) if autoClose is undefined
    } else {
      return autoClose; // Return the value of autoClose if it's a number
    }
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
  case 'DEFAULT':
    toast(notification.message, {
      ...toastOptions,
      icon: notification.icon || (() => '🔔'),
    });
    break;
  case 'CUSTOM':
    toast(notification.component, {
      ...toastOptions,
      icon: notification.icon || (() => '🛠️'),
    });
    break;
  default:
    toast(notification.message, {
      ...toastOptions,
      icon: notification.icon || (() => '📢'),
    });
    break;
  }
};

