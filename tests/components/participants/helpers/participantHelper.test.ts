import '@testing-library/jest-dom';
import { SortOrder } from '../../../../src/common/components/buttons/SortListButton';
import {
  applyFilters,
  getParticipantsMenuItems, getSortedParticipants
} from '../../../../src/components/participants/helpers/participantHelper';
import { mockParticipants } from '../__fixtures__/participants';

describe('ParticipantHelper_ApplyFilters', () => {
  it('filters correctly the participant list', () => {
    const searchText = 'msg systems ag';

    // Apply filters based on the search text
    const filteredParticipants = applyFilters(mockParticipants, searchText);

    // Check if two participants match the search text
    expect(filteredParticipants).toHaveLength(2);

    // Check that the participants' legal names match the expected values
    expect(filteredParticipants.map(p => p.legalName)).toContain('msg systems ag');
    expect(filteredParticipants.map(p => p.legalName)).toContain('msg systems AG');
  });
});

jest.mock('i18next', () => ({
  t: (key: string) => {
    const translations = {
      'participants.sort-menu.a-z': 'A to Z',
      'participants.sort-menu.z-a': 'Z to A',
    };
    return translations[key] || key;
  },
}));

describe('getParticipantsSortMenuItems', () => {
  it('returns the correct menu items', () => {
    const menuItems = getParticipantsMenuItems();
    expect(menuItems).toEqual([
      { label: 'A to Z', sortOrder: 'ASC_NAME' },
      { label: 'Z to A', sortOrder: 'DESC_NAME' },
    ]);
  })
})

describe('getSortedParticipants', () => {
  it('should sort participants in ascending order by name', () => {
    const expectedSortedParticipants = [
      mockParticipants[0],
      mockParticipants[1],
      mockParticipants[2],
      mockParticipants[3],
      mockParticipants[4],
    ];
    const sorted = getSortedParticipants(mockParticipants, SortOrder.ASC_NAME);
    expect(sorted).toEqual(expectedSortedParticipants);
  });

  it('should sort participants in descending order by name', () => {
    const expectedSortedParticipants = [
      mockParticipants[4],
      mockParticipants[3],
      mockParticipants[2],
      mockParticipants[1],
      mockParticipants[0],
    ];
    const sorted = getSortedParticipants(mockParticipants, SortOrder.DESC_NAME);
    expect(sorted).toEqual(expectedSortedParticipants);
  });

});
