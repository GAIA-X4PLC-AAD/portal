import BusinessObjectNotFound from '../../../src/common/exceptions/BusinessObjectNotFound';

describe('BusinessObjectNotFound', () => {
  const uri = 'http://some.dummy.uri';
  const message = 'custom message';

  it('contains the message, uri and the name property is correct', () => {
    const error = new BusinessObjectNotFound(message, uri);
    expect(error.uri).toEqual(uri);
    expect(error.message).toEqual(message);
    expect(error.name).toEqual('BusinessObjectNotFound');
  })
})
