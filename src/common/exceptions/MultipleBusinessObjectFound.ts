import { BusinessException } from './BusinessException';

class MultipleBusinessObjectFound extends BusinessException {
  uri: string;

  constructor(massage: string, uri: string) {
    super(massage);
    this.uri = uri;
    this.name = 'MultipleBusinessObjectFound';
  }
}

export default MultipleBusinessObjectFound;
