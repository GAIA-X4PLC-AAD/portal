import '@testing-library/jest-dom';
import { applyFilters } from '../../../../src/components/participants/helpers/participantHelper';
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
