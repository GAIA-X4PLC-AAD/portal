import MultipleBusinessObjectsFound from '../../../src/common/exceptions/MultipleBusinessObjectsFound';

describe('MultipleBusinessObjectsFound', () => {
  const uri = 'http://some.dummy.uri';
  const message = 'custom message';

  it('contains the message, uri and the name property is correct', () => {
    const error = new MultipleBusinessObjectsFound(message, uri);
    expect(error.uri).toEqual(uri);
    expect(error.message).toEqual(message);
    expect(error.name).toEqual('MultipleBusinessObjectsFound');
  })
})
