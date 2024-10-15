import '@testing-library/jest-dom';
import { applyFilters } from '../../../../src/components/participants/helpers/participantHelper';

import { mockParticipants } from './__fixtures__/participants';

describe('ParticipantHelper_ApplyFilters', () => {
  it('filters correctly the participant list', () => {
    const searchText = 'msg systems ag';

    // Apply filters based on the search text
    const filteredParticipants = applyFilters(mockParticipants, searchText);

    // Check if two participants match the search text
    expect(filteredParticipants).toHaveLength(2);

    // Check that the participant is the expected one (mockParticipants[0])
    // Assuming "msg systems AG" is mockParticipants[0]
    expect(filteredParticipants).toContain(mockParticipants[0]);

    // Check that the participant is the expected one (mockParticipants[2])
    // Assuming "msg systems ag" is mockParticipants[2]
    expect(filteredParticipants).toContain(mockParticipants[2]);
  });
});
