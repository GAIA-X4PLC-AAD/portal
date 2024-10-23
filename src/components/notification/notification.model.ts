import { ReactNode } from 'react';

export type NotificationMessageType =
    | 'SUCCESS'
    | 'ERROR'
    | 'WARNING'
    | 'INFO'
    | 'DEFAULT'
    | 'CUSTOM'

export interface Notification {
    messageType: NotificationMessageType,
    message?: string;
    autoClose?: number | false;
    icon?: string | ReactNode;
    className?: string;
    bodyClassName?: string;
    component?: ReactNode;
}
