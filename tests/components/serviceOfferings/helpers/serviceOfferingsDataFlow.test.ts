import BusinessObjectsNotFound from '../../../../src/common/errorHandling/exceptions/BusinessObjectsNotFound';
import MultipleBusinessObjectsFound from '../../../../src/common/errorHandling/exceptions/MultipleBusinessObjectsFound';
import {
  loadServiceOfferingDetails,
  loadServiceOfferings
} from '../../../../src/components/serviceOfferings/helpers/serviceOfferingDataFlow';
import { mockServiceOfferingDetails } from '../__fixtures__/mockServiceOfferingDetails';
import { mockServiceOfferings } from '../__fixtures__/mockServiceOfferings';

const getServiceOfferings = jest.fn();
const getServiceOfferingDetails = jest.fn();

jest.mock('../../../../src/services/cypherQueryApiService', () => ({
  CypherQueryApiService: {
    getServiceOfferings: () => getServiceOfferings(),
    getServiceOfferingDetails: (uri: string) => getServiceOfferingDetails(uri),
  }
}));

describe('Service-Offerings Data Flow', () => {
  console.error = jest.fn();
  console.warn = jest.fn();
  console.debug = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  })

  describe('loadServiceOfferings', () => {
    it('should load service-offerings successfully', async () => {
      const mockServiceOfferingsQueryResults = { totalCount: 2, items: [...mockServiceOfferings] };
      getServiceOfferings.mockResolvedValue(mockServiceOfferingsQueryResults);

      const serviceOfferings = await loadServiceOfferings()

      expect(serviceOfferings).toEqual(mockServiceOfferings);
      expect(getServiceOfferings).toHaveBeenCalledTimes(1);
    })

    it('should throw an error when loading service-offerings fails', async () => {
      const errorMessage = 'Failed to fetch service-offerings';

      // Mock the API to reject with an error
      getServiceOfferings.mockRejectedValue(new Error(errorMessage));

      // Assert that an error is thrown
      await expect(loadServiceOfferings()).rejects.toThrow(errorMessage);
      expect(getServiceOfferings).toHaveBeenCalledTimes(1);
    });
  })

  describe('loadServiceOfferingDetails', () => {
    it('should load serviceOfferingDetails successfully', async () => {
      const mockServiceOfferingDetailsQueryResults = { totalCount: 1, items: [mockServiceOfferingDetails] };

      getServiceOfferingDetails.mockResolvedValue(mockServiceOfferingDetailsQueryResults);

      const serviceOfferingDetails = await loadServiceOfferingDetails('myTestUri');

      expect(serviceOfferingDetails).toEqual(mockServiceOfferingDetails);
      expect(getServiceOfferingDetails).toHaveBeenCalledWith('myTestUri');
    })

    it('should throw BusinessObjectNotFound when no service-offerings are found', async () => {
      const mockResponse = { totalCount: 0, items: [] };

      // Mock the API response
      getServiceOfferingDetails.mockResolvedValue(mockResponse);

      // Assert that BusinessObjectNotFound is thrown
      await expect(loadServiceOfferingDetails('Non-existent service-offering')).rejects.toThrow(BusinessObjectsNotFound);
    });
  })

  it('should throw MultipleBusinessObjectFound when more than one service-offering is found', async () => {
    const mockResponse = {
      totalCount: 2,
      items: [{ ...mockServiceOfferingDetails, name: 'service offering 1' }, {
        ...mockServiceOfferingDetails,
        name: 'service offering 2'
      }]
    };

    // Mock the API response
    getServiceOfferingDetails.mockResolvedValue(mockResponse);

    // Assert that MultipleBusinessObjectFound is thrown
    await expect(loadServiceOfferingDetails('Duplicate service-offering')).rejects.toThrow(MultipleBusinessObjectsFound);
  });

  it('should throw an error when fetching service-offering details fails', async () => {
    const errorMessage = 'Failed to fetch service-offering details';

    // Mock the API to reject with an error
    getServiceOfferingDetails.mockRejectedValue(new Error(errorMessage));

    // Assert that an error is thrown
    await expect(loadServiceOfferingDetails('Service-offering')).rejects.toThrow(errorMessage);
    expect(getServiceOfferingDetails).toHaveBeenCalledWith('Service-offering');
  });
})
