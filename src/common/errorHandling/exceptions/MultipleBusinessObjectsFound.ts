import { BusinessException } from './BusinessException';

class MultipleBusinessObjectsFound extends BusinessException {
  uri: string;

  constructor(massage: string, uri: string) {
    super(massage);
    this.uri = uri;
    this.name = 'MultipleBusinessObjectsFound';
  }
}

export default MultipleBusinessObjectsFound;
