/* test coverage not required */
import {ToastContent, ToastOptions} from 'react-toastify';

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