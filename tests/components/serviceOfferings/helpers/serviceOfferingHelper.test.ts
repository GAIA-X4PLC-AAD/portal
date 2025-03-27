import { SortOrder } from '../../../../src/common/components/buttons/SortListButton';
import {
  getServiceOfferingSortMenuItems,
  getSortedServiceOfferings
} from '../../../../src/components/serviceOfferings/helpers/serviceOfferingHelper';
import { ServiceOffering } from '../../../../src/types/serviceOfferings.model';
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
      { label: 'Newest Service Offering first', sortOrder: 'DESC_DATE' },
      { label: 'Oldest Service Offering first', sortOrder: 'ASC_DATE' },
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
      mockServiceOfferings[0],
      mockServiceOfferings[1],
      mockServiceOfferings[2],
    ];
    const sorted = getSortedServiceOfferings(mockServiceOfferings, SortOrder.ASC_DATE);
    expect(sorted).toEqual(expectedSortedServiceOfferings);
  });

  it('should sort service offerings in descending order by recording time', () => {
    const expectedSortedServiceOfferings = [
      mockServiceOfferings[2],
      mockServiceOfferings[1],
      mockServiceOfferings[0],
    ];
    const sorted = getSortedServiceOfferings(mockServiceOfferings, SortOrder.DESC_DATE);
    expect(sorted).toEqual(expectedSortedServiceOfferings);
  });

  it('should handle service offerings with missing names', () => {
    const serviceOfferingsWithMissingNames: ServiceOffering[] = [
      { ...mockServiceOfferings[0], name: undefined },
      mockServiceOfferings[1],
      { ...mockServiceOfferings[2], name: undefined },
    ];

    const sortedAsc = getSortedServiceOfferings(serviceOfferingsWithMissingNames, SortOrder.ASC_NAME);
    expect(sortedAsc[0].name).toEqual(mockServiceOfferings[1].name);
    expect(sortedAsc[1].name).toBeUndefined();
    expect(sortedAsc[2].name).toBeUndefined();

    const sortedDesc = getSortedServiceOfferings(serviceOfferingsWithMissingNames, SortOrder.DESC_NAME);
    expect(sortedDesc[0].name).toEqual(mockServiceOfferings[1].name);
    expect(sortedDesc[1].name).toBeUndefined();
    expect(sortedDesc[2].name).toBeUndefined();
  });

  it('should handle service offerings with missing recording times', () => {
    const serviceOfferingsWithMissingTimes: ServiceOffering[] = [
      { ...mockServiceOfferings[0], recordingTime: undefined },
      mockServiceOfferings[1],
      { ...mockServiceOfferings[2], recordingTime: undefined },
    ];

    const sortedAsc = getSortedServiceOfferings(serviceOfferingsWithMissingTimes, SortOrder.ASC_DATE);
    expect(sortedAsc[0].recordingTime).toEqual(mockServiceOfferings[1].recordingTime);
    expect(sortedAsc[1].recordingTime).toBeUndefined();
    expect(sortedAsc[2].recordingTime).toBeUndefined();

    const sortedDesc = getSortedServiceOfferings(serviceOfferingsWithMissingTimes, SortOrder.DESC_DATE);
    expect(sortedDesc[0].recordingTime).toEqual(mockServiceOfferings[1].recordingTime);
    expect(sortedDesc[1].recordingTime).toBeUndefined();
    expect(sortedDesc[2].recordingTime).toBeUndefined();
  });

  it('should return the original array for an unknown sort order', () => {
    const sorted = getSortedServiceOfferings(mockServiceOfferings, 'UNKNOWN' as SortOrder);
    expect(sorted).toEqual(mockServiceOfferings);
  });
});
