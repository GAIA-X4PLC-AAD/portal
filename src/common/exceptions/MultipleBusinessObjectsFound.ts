class MultipleBusinessObjectsFound extends Error {
  uri: string;

  constructor(message: string, uri: string) {
    super(message);
    this.uri = uri;
    this.name = 'MultipleBusinessObjectsFound';

    // In TypeScript, when extending Error, you need to manually set the prototype.
    Object.setPrototypeOf(this, MultipleBusinessObjectsFound.prototype);
  }
}

export default MultipleBusinessObjectsFound
