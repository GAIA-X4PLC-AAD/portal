import BusinessObjectNotFound from '../../../src/common/exceptions/BusinessObjectNotFound';

const uri = 'http://some.dummy.uri';
it('BusinessObjectNotFound', () => {
  const error = new BusinessObjectNotFound('Dummy message', uri);
  expect(error.uri).toEqual(uri);
  expect(error.name).toEqual('BusinessObjectNotFound');
})
