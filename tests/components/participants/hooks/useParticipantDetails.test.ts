import { renderHook, waitFor } from '@testing-library/react';

import { useParticipantDetails } from '../../../../src/components/participants/hooks/useParticipantDetails';
import { mockParticipant_msg_systems_ag } from '../__fixtures__/participants';

const loadParticipantDetails = jest.fn();
jest.mock('../../../../src/components/participants/helpers/participantDataFlow', () => ({
  loadParticipantDetails: () => loadParticipantDetails(),
}));

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('useParticipant', () => {
  const mockLegalName = 'msg systems ag'; // Example legal name for testing

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return SHOW_PARTICIPANT when a participant is found', async () => {
    // Mock the API call to return the participant data
    loadParticipantDetails.mockResolvedValue(mockParticipant_msg_systems_ag); // Return a single participant

    const { result } = renderHook(() => useParticipantDetails(mockLegalName));

    await waitFor(() => expect(result.current.viewContentType).toBe('SHOW_PARTICIPANT'));
    expect(result.current.participant).toEqual(mockParticipant_msg_systems_ag);
  });

  it('should return SHOW_NO_RESULT when no participant is found', async () => {
    // Mock the API call to return null or undefined (no participant found)
    loadParticipantDetails.mockResolvedValue(undefined);

    const { result } = renderHook(() => useParticipantDetails(mockLegalName));

    await waitFor(() => expect(result.current.viewContentType).toBe('SHOW_NO_RESULT'));
    expect(result.current.participant).toBeUndefined();
  });
});
