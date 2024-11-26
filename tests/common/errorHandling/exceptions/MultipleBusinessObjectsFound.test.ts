import MultipleBusinessObjectsFound from '../../../../src/common/errorHandling/exceptions/MultipleBusinessObjectsFound';

const uri = 'http://some.dummy.uri';
it('MultipleBusinessObjectsFound', () => {
  const error = new MultipleBusinessObjectsFound('Dummy Message', uri);
  expect(error.uri).toEqual(uri);
  expect(error.name).toEqual('MultipleBusinessObjectsFound');
})
