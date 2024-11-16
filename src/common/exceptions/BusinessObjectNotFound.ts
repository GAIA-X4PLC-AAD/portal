import { BusinessException } from './BusinessException';

class BusinessObjectNotFound extends BusinessException {
  uri: string;

  constructor(message: string, uri: string) {
    super(message);
    this.uri = uri;
    this.name = 'BusinessObjectNotFound';
  }
}

export default BusinessObjectNotFound;
