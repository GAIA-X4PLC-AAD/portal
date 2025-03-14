import { NotificationMessageType } from '../../../types/notification.model';
import { notify } from '../../components/notification/Notification';

export abstract class BusinessException extends Error {
  messageType: NotificationMessageType;

  protected constructor(message: string, messageType?: NotificationMessageType) {
    super(message);
    this.messageType = messageType ? messageType : 'ERROR';
  }

  handleNotification(publish?: () => void): void {
    notify({
      messageType: this.messageType,
      message: this.message,
    })
  }
}
