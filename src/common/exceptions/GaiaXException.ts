import { GaiaXExceptionType } from '../../types/gaiaXException.model';

export abstract class GaiaXException extends Error {
    abstract type: GaiaXExceptionType;

    protected constructor(message: string) {
      super(message);
    }

    abstract showNotification(): void;
}
