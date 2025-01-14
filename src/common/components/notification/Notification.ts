import { toast } from 'react-toastify';
import { ToastOptions } from 'react-toastify/dist/types';

import { Notification } from '../../../types/notification.model';

export const notify = (notification: Notification): number | string => {
  let toastId: string | number;

  function getAutoCloseOption(toastOptions?: ToastOptions): number | false {
    return toastOptions?.autoClose === undefined ? 15000 : toastOptions.autoClose;
  }

  const toastOptions = {
    ...notification.options,
    autoClose: getAutoCloseOption(notification.options),
  };

  switch (notification.messageType) {
  case 'SUCCESS':
    toastId = toast.success(notification.message, {
      ...toastOptions,
    });
    break;
  case 'ERROR':
    toastId = toast.error(notification.message, {
      ...toastOptions,
      autoClose: false,
    });
    break;
  case 'WARNING':
    toastId = toast.warn(notification.message, {
      ...toastOptions,
    });
    break;
  case 'INFO':
    toastId = toast.info(notification.message, {
      ...toastOptions,
    });
    break;
  default:
    toastId = toast(notification.message, {
      ...toastOptions,
    });
    break;
  }

  return toastId;
};

export const closeNotification = (toastId: number | string) => {
  toast.dismiss(toastId);
}
