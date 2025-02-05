import { SortOrder } from '../../../../src/common/components/buttons/SortListButton';
import {
  getServiceOfferingSortMenuItems, getSortedServiceOfferings
} from '../../../../src/components/serviceOfferings/helpers/serviceOfferingHelper';
import { mockServiceOfferings } from '../__fixtures__/mockServiceOfferings';

jest.mock('i18next', () => ({
  t: (key: string) => {
    const translations = {
      'service-offerings.sort-menu.a-z': 'A to Z',
      'service-offerings.sort-menu.z-a': 'Z to A',
    };
    return translations[key] || key;
  },
}));

describe('getServiceOfferingSortMenuItems', () => {
  it('should return the correct menu items', () => {
    const menuItems = getServiceOfferingSortMenuItems();
    expect(menuItems).toEqual([
      { label: 'A to Z', sortOrder: 'ASC_NAME' },
      { label: 'Z to A', sortOrder: 'DESC_NAME' },
      // todo add date sorting
    ]);
  })
})

describe('getSortedServiceOfferings', () => {
  it('should sort service offerings in ascending order by name', () => {
    const expectedSortedServiceOfferings = [
      mockServiceOfferings[0],
      mockServiceOfferings[1],
      mockServiceOfferings[2]
    ];
    const sorted = getSortedServiceOfferings(mockServiceOfferings, SortOrder.ASC_NAME);
    expect(sorted).toEqual(expectedSortedServiceOfferings);
  });

  it('should sort service offerings in descending order by name', () => {
    const expectedSortedServiceOfferings = [
      mockServiceOfferings[2],
      mockServiceOfferings[1],
      mockServiceOfferings[0],
    ];
    const sorted = getSortedServiceOfferings(mockServiceOfferings, SortOrder.DESC_NAME);
    expect(sorted).toEqual(expectedSortedServiceOfferings);
  });

});
