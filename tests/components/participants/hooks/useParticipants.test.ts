import { act, renderHook, waitFor } from '@testing-library/react';

import { useParticipants } from '../../../../src/components/participants/hooks/useParticipants';

import { mockParticipants } from './__fixtures__/participants';

const loadParticipants = jest.fn();
jest.mock('../../../../src/components/participants/helpers/participantDataFlow', () => ({
  loadParticipants: () => loadParticipants(),
}));

describe('useParticipants', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
  });

  it('should return SHOW_PARTICIPANTS when participants are fetched', async () => {
    // Mock loadParticipants to resolve with participant data
    loadParticipants.mockResolvedValue(mockParticipants);

    const { result } = renderHook(() => useParticipants());

    await waitFor(() => expect(result.current.viewContentType).toBe('SHOW_PARTICIPANTS'));
    expect(result.current.participants).toEqual(mockParticipants);
  });

  it('should return SHOW_NO_RESULTS when no participants are found', async () => {
    // Mock loadParticipants to resolve with an empty array
    loadParticipants.mockResolvedValue([]);

    const { result } = renderHook(() => useParticipants());

    await waitFor(() => expect(result.current.viewContentType).toBe('SHOW_NO_RESULTS'));
    expect(result.current.participants).toEqual([]);
  });

  it('should filter participants based on search text', async () => {
    // Mock loadParticipants to resolve with participant data including "msg systems ag"
    loadParticipants.mockResolvedValue(mockParticipants);

    const { result } = renderHook(() => useParticipants());

    // Wait for participants to load
    await waitFor(() => expect(result.current.viewContentType).toBe('SHOW_PARTICIPANTS'));

    // Search for "msg systems ag"
    act(() => {
      result.current.search('msg systems ag');
    });

    await waitFor(() => {
      expect(result.current.participants.length).toBe(2);
    });
  });
});
