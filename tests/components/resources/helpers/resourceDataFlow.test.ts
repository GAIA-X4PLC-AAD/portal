import { loadResources } from '../../../../src/components/resources/helpers/resourceDataFlow';

import resources from './__fixtures__/cypherQuery_getAllResources_HdMap_EnvironmentModel_x2.json';
import {
  resources_HdMap_EnvironmentModel_x2 as expectedResources
} from './__fixtures__/resources_HdMap_EnvironmentModel_x2';

const errorLog = jest.fn();
const getAllResources = jest.fn();

jest.mock('../../../../src/services/cypherQueryApiService', () => ({
  CypherQueryApiService: {
    getAllResources: (resourceTypes: string[]) => getAllResources(resourceTypes),
  }
}))

describe('loadResources', () => {
  console.error = errorLog
  console.debug = () => jest.fn(); // Disable debug logging

  const resourceTypes = ['Georeference', 'HdMap', 'EnvironmentModel', 'OSITrace'];

  it.skip('the backend Data will be transformed to a Resource array', async () => {
    getAllResources.mockResolvedValueOnce(resources.items);

    const result = await loadResources(resourceTypes);
    expect(result).toEqual(expectedResources);
  })

  it('logs and throws further an error', async () => {
    const error = new Error('Some Backend Error');
    getAllResources.mockRejectedValueOnce(error);

    await expect(() => loadResources(resourceTypes)).rejects.toThrow('Some Backend Error');
    expect(errorLog).toBeCalledWith('Error fetching resources:', error);
  })
})
