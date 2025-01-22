import { renderHook, waitFor } from '@testing-library/react';

import { useServiceOfferingDetails } from '../../../../src/components/serviceOfferings/hooks/useServiceOfferingDetails';
import { mockServiceOfferingDetails } from '../__fixtures__/mockServiceOfferingDetails';

const loadServiceOfferingDetails = jest.fn();
jest.mock('../../../../src/components/serviceOfferings/helpers/serviceOfferingDataFlow', () => ({
  loadServiceOfferingDetails: () => loadServiceOfferingDetails(),
}))

describe('useServiceOfferingDetails', () => {
  const uri = 'https://www.gaia-x4plcaad.info/tt/claims/software-resource/f5f91d21-6106-4bf2-a915-3191daed9677'

  console.error = jest.fn();
  console.warn = jest.fn();
  console.debug = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('should return SHOW_SERVICE_OFFERING', async () => {
    loadServiceOfferingDetails.mockResolvedValue(mockServiceOfferingDetails);
    const { result } = renderHook(() => useServiceOfferingDetails(uri));

    await waitFor(() => {
      expect(result.current.viewContentType).toBe('SHOW_SERVICE_OFFERING');
      expect(result.current.serviceOfferingDetails).toEqual(mockServiceOfferingDetails);
    });
  })

  it('should return SHOW_NO_RESULT', async () => {
    loadServiceOfferingDetails.mockResolvedValue(undefined);
    const { result } = renderHook(() => useServiceOfferingDetails(uri));

    await waitFor(() => {
      expect(result.current.viewContentType).toBe('SHOW_NO_RESULT');
      expect(result.current.serviceOfferingDetails).toBeUndefined()
    });
  })
})
