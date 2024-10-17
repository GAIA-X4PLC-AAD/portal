import '@testing-library/jest-dom';
import { applyFilters } from '../../../../src/components/participants/helpers/participantHelper';

import {
  mockParticipant_msg_systems_ag,
  mockParticipant_msg_systems_AG,
  mockParticipants
} from './__fixtures__/participants';

describe('ParticipantHelper_ApplyFilters', () => {
  it('filters correctly the participant list', () => {
    const searchText = 'msg systems ag';

    // Apply filters based on the search text
    const filteredParticipants = applyFilters(mockParticipants, searchText);

    // Check if two participants match the search text
    expect(filteredParticipants).toHaveLength(2);

    // Check that the participant is the expected one (mockParticipants[0])
    expect(filteredParticipants).toContainEqual(mockParticipant_msg_systems_AG);

    // Check that the participant is the expected one (mockParticipants[2])
    expect(filteredParticipants).toContainEqual(mockParticipant_msg_systems_ag);
  });
});
