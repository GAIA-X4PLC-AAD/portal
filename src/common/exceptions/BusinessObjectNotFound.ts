class BusinessObjectNotFound extends Error {
  uri: string;

  constructor(massage: string, uri: string) {
    super(massage);
    this.uri = uri;
    this.name = 'BusinessObjectNotFound'
  }
}

export default BusinessObjectNotFound;
