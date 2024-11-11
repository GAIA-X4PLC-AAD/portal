import { unique } from '../../src/utils/utils';

describe('utils', () => {
  it('makes the list unique', () => {
    const array = [{ name: 'a' }, { name: 'a' }, { name: 'b' }, { name: 'c' }, { name: 'c' }]
    const uniqueArray = unique(array, (item) => item.name)
    expect(uniqueArray).toEqual([{ name: 'a' }, { name: 'b' }, { name: 'c' }])
  })
});
