import { act, renderHook, waitFor } from '@testing-library/react'; // For testing hooks

import { getParticipantByLegalName } from '../../../../src/components/participants/helpers/participantDataFlow'; // Import the mock
import { useParticipant } from '../../../../src/components/participants/hooks/useParticipant';

import { mockParticipant } from './__fixtures__/participant';

jest.mock('../../../../src/components/participants/helpers/participantDataFlow', () => ({
  getParticipantByLegalName: jest.fn(),
}));

describe('useParticipant', () => {
  const mockLegalName = 'msg systems ag'; // Example legal name for testing

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return LOADING initially', async () => {
    (getParticipantByLegalName as jest.Mock).mockReturnValue(new Promise(() => {
    }));

    const { result } = renderHook(() => useParticipant(mockLegalName));

    await act(async () => {
      expect(result.current.viewContentType).toBe('LOADING');
      expect(result.current.participant).toBeUndefined();
    });
  });

  it('should return SHOW_PARTICIPANT when a participant is found', async () => {
    console.log(mockParticipant);
    // Mock the API call to return the participant data
    (getParticipantByLegalName as jest.Mock).mockResolvedValue(mockParticipant); // Return a single participant

    const { result } = renderHook(() => useParticipant(mockLegalName));

    await waitFor(() => expect(result.current.viewContentType).toBe('SHOW_PARTICIPANT'));
    expect(result.current.participant).toEqual(mockParticipant);
  });

  it('should return SHOW_NO_RESULT when no participant is found', async () => {
    // Mock the API call to return null or undefined (no participant found)
    (getParticipantByLegalName as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useParticipant(mockLegalName));

    await waitFor(() => expect(result.current.viewContentType).toBe('SHOW_NO_RESULT'));
    expect(result.current.participant).toBeUndefined();
  });
});
