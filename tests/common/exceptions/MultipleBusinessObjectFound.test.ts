import MultipleBusinessObjectsFound from '../../../src/common/exceptions/MultipleBusinessObjectsFound';

const uri = 'http://some.dummy.uri';
it('MultipleBusinessObjectFound', () => {
  const error = new MultipleBusinessObjectsFound('Dummy Message', uri);
  expect(error.uri).toEqual(uri);
  expect(error.name).toEqual('MultipleBusinessObjectFound');
})
