class BusinessObjectNotFound extends Error {
  uri: string;

  constructor(message: string, uri: string) {
    super(message);
    this.uri = uri;
    this.name = 'BusinessObjectNotFound';

    // In TypeScript, when extending Error, you need to manually set the prototype.
    Object.setPrototypeOf(this, BusinessObjectNotFound.prototype);
  }
}

export default BusinessObjectNotFound
