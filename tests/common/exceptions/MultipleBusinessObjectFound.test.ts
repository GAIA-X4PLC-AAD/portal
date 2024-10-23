import MultipleBusinessObjectFound from '../../../src/common/exceptions/MultipleBusinessObjectFound';

const uri = 'http://some.dummy.uri';
it('MultipleBusinessObjectFound', () => {
  const error = new MultipleBusinessObjectFound('Dummy Message', uri);
  expect(error.uri).toEqual(uri);
  expect(error.name).toEqual('MultipleBusinessObjectFound');
})
