import {
  getServiceOfferingSortMenuItems
} from '../../../../src/components/serviceOfferings/helpers/serviceOfferingHelper';

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
  it('returns the correct menu items', () => {
    const menuItems = getServiceOfferingSortMenuItems();
    console.log(menuItems);
    expect(menuItems).toEqual([
      { label: 'A to Z', alias: 'ASC_NAME' },
      { label: 'Z to A', alias: 'DESC_NAME' },
      // todo add date sorting
    ]);
  })
})
