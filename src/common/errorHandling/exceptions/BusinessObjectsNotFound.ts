import { BusinessException } from './BusinessException';

class BusinessObjectsNotFound extends BusinessException {
  uri: string;

  constructor(message: string, uri: string) {
    super(message);
    this.uri = uri;
    this.name = 'BusinessObjectNotFound';
  }
}

export default BusinessObjectsNotFound;
