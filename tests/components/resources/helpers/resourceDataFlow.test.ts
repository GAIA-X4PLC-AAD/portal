import { loadResourceDetails, loadResources } from '../../../../src/components/resources/helpers/resourceDataFlow';

import resources from './__fixtures__/cypherQuery_getAllResources_HdMap_EnvironmentModel_x2.json';
import {
  resources_HdMap_EnvironmentModel_x2 as expectedResources
} from './__fixtures__/resources_HdMap_EnvironmentModel_x2';

const errorLog = jest.fn();
const getAllResources = jest.fn();
const getResourceDetails = jest.fn();

jest.mock('../../../../src/services/cypherQueryApiService', () => ({
  CypherQueryApiService: {
    getAllResources: (resourceTypes: string[]) => getAllResources(resourceTypes),
    getResourceDetails: (resourceUri: string) => getResourceDetails(resourceUri)
  }
}))

describe('loadResources', () => {
  console.error = errorLog
  console.debug = () => jest.fn(); // Disable debug logging

  const resourceTypes = ['Georeference', 'HdMap', 'EnvironmentModel', 'OSITrace'];

  it('returns empty array if no resource types', async () => {
    const result = await loadResources([]);
    expect(result).toEqual([]);
  })

  it('the backend Data will be transformed to a Resource array', async () => {
    getAllResources.mockResolvedValueOnce(resources);

    const result = await loadResources(resourceTypes);
    expect(result).toEqual(expectedResources);
  })

  it('logs and throws further an error', async () => {
    const error = new Error('Some Backend Error');
    getAllResources.mockRejectedValueOnce(error);

    await expect(() => loadResources(resourceTypes)).rejects.toThrow('Some Backend Error');
    expect(errorLog).toBeCalledWith('Error fetching resources:', error);
  })

  it('loads resource details', async () => {
    const uri = 'https://www.gaia-x4plcaad.info/claims/data-resource/a131cd65-a961-448f-aad3-3a0a603a89bf';
    getResourceDetails.mockResolvedValueOnce({
      items: [
        {
          name: 'Generated Data Resource',
          contractId: '983424233',
          uri,
          serviceAccessPoint: {
            name: 'edc_pr',
            host: 'edc-pr.gxfs.gx4fm.org/',
            protocol: 'https',
            port: '443',
            version: '0.2.1'
          },
          labels: [
            'Resource',
            'DataResource',
            'HdMap'
          ]
        }
      ]
    })

    const result = await loadResourceDetails(uri)
    expect(result).toEqual({
      contractId: '983424233',
      name: 'Generated Data Resource',
      serviceAccessPoint: {
        host: 'edc-pr.gxfs.gx4fm.org/',
        name: 'edc_pr',
        port: '443',
        protocol: 'https',
        version: '0.2.1'
      },
      uri
    })
  })

  it('loads resource details, no resource for the give uri', async () => {
    const uri = 'https://www.gaia-x4plcaad.info/claims/data-resource/a131cd65-a961-448f-aad3-3a0a603a89bf';
    getResourceDetails.mockResolvedValueOnce({
      items: []
    })

    await expect(loadResourceDetails(uri)).rejects.toThrow(`Data resource with the given uri '${uri}' does not exists!`);
  })

  it('loads resource details, more than one found', async () => {
    const uri = 'https://www.gaia-x4plcaad.info/claims/data-resource/a131cd65-a961-448f-aad3-3a0a603a89bf';
    getResourceDetails.mockResolvedValueOnce({
      items: [
        {
          name: 'Generated Data Resource 1',
          contractId: '983424233',
          uri,
          serviceAccessPoint: {
            name: 'edc_pr',
            host: 'edc-pr.gxfs.gx4fm.org/',
            protocol: 'https',
            port: '443',
            version: '0.2.1'
          },
          labels: [
            'Resource',
            'DataResource',
            'HdMap'
          ]
        },
        {
          name: 'Generated Data Resource 2',
          contractId: '134576864',
          uri,
          serviceAccessPoint: {
            name: 'edc_pr',
            host: 'edc-pr.gxfs.gx4fm.org/',
            protocol: 'https',
            port: '443',
            version: '0.2.1'
          },
          labels: [
            'Resource',
            'DataResource',
            'HdMap'
          ]
        }
      ]
    })

    await expect(loadResourceDetails(uri)).rejects.toThrow(`Multiple resources exists with the given uri '${uri}'`);
  })
})
