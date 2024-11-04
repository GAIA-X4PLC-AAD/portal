import { notify } from '../../components/notification/Notification';
import { GaiaXExceptionType } from '../../types/gaiaXException.model';

import { GaiaXException } from './GaiaXException';

class MultipleBusinessObjectFound extends GaiaXException {
  uri: string;
  type: GaiaXExceptionType;

  constructor(massage: string, uri: string) {
    super(massage);
    this.uri = uri;
    this.name = 'MultipleBusinessObjectFound';
    this.type = 'BusinessException';
  }

  showNotification(saveError: () => void) {
    notify({
      messageType: 'ERROR',
      message: this.message,
    })
    saveError();
  }
}

export default MultipleBusinessObjectFound;
