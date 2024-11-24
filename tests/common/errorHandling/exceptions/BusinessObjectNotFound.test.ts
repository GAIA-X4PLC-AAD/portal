import BusinessObjectsNotFound from '../../../../src/common/errorHandling/exceptions/BusinessObjectsNotFound';

describe('BusinessObjectNotFound', () => {
  const uri = 'http://some.dummy.uri';
  const message = 'custom message';

  it('contains the message, uri and the name property is correct', () => {
    const error = new BusinessObjectsNotFound(message, uri);
    expect(error.uri).toEqual(uri);
    expect(error.message).toEqual(message);
    expect(error.name).toEqual('BusinessObjectNotFound');
  })
})
