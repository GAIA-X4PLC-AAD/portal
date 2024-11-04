import { notify } from '../../components/notification/Notification';
import { GaiaXExceptionType } from '../../types/gaiaXException.model';

import { GaiaXException } from './GaiaXException';

class BusinessObjectNotFound extends GaiaXException {
  uri: string;
  type: GaiaXExceptionType;

  constructor(message: string, uri: string) {
    super(message);
    this.uri = uri;
    this.name = 'BusinessObjectNotFound';
    this.type = 'BusinessException';
  }

  showNotification() {
    notify({
      messageType: 'ERROR',
      message: this.message,
    })
  }
}

export default BusinessObjectNotFound;
