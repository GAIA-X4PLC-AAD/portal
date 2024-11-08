import { ToastContent, ToastOptions } from 'react-toastify/dist/types';

export type NotificationMessageType =
    | 'SUCCESS'
    | 'ERROR'
    | 'WARNING'
    | 'INFO'

export interface Notification {
    messageType: NotificationMessageType,
    message: ToastContent;
    options?: ToastOptions;
}
