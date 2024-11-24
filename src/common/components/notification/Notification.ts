import { toast } from 'react-toastify';
import { ToastOptions } from 'react-toastify/dist/types';

import { Notification } from '../../../types/notification.model';

export const notify = (notification: Notification) => {

  function getAutoCloseOption(toastOptions?: ToastOptions): number | false {
    return toastOptions && toastOptions.autoClose ? toastOptions.autoClose : 15000;
  }

  const toastOptions = {
    ...notification.options,
    autoClose: getAutoCloseOption(notification.options),
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

