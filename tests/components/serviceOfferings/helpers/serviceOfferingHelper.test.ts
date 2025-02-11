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
      'service-offerings.sort-menu.new': 'Newest Service Offering first',
      'service-offerings.sort-menu.old': 'Oldest Service Offering first',
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
      { label: 'Newest Service Offering first', sortOrder: 'ASC_DATE' },
      { label: 'Oldest Service Offering first', sortOrder: 'DESC_DATE' },
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

  it('should sort service offerings in ascending order by recording time', () => {
    const expectedSortedServiceOfferings = [
      mockServiceOfferings[2],
      mockServiceOfferings[0],
      mockServiceOfferings[1],
    ];
    const sorted = getSortedServiceOfferings(mockServiceOfferings, SortOrder.ASC_DATE);
    expect(sorted).toEqual(expectedSortedServiceOfferings);
  });

  it('should sort service offerings in descending order by recording time', () => {
    const expectedSortedServiceOfferings = [
      mockServiceOfferings[1],
      mockServiceOfferings[0],
      mockServiceOfferings[2],
    ];
    const sorted = getSortedServiceOfferings(mockServiceOfferings, SortOrder.DESC_DATE);
    expect(sorted).toEqual(expectedSortedServiceOfferings);
  });

});
