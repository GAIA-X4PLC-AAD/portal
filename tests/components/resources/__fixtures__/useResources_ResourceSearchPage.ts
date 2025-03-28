import {Asset} from '../../../../src/components/resources/helpers/resourceFilterHelper';
import {ResourcesSearchPageContentType} from '../../../../src/components/resources/hooks/useResources';
import {Resource} from '../../../../src/types/resources.model';

export const normal_render = {
  resources: [
    {
      uri: 'did:resource-HdMap',
      name: 'HdMap Resource',
      format: 'ASAM OpenDRIVE',
      vendor: 'msg systems ag',
      labels: ['HdMap'],
      description: 'HdMap description',
      claimsGraphUri: ['https://resources.gx/HdMap']
    },
    {
      uri: 'did:resource-EnvironmentModel',
      name: 'EnvironmentModel resource',
      format: null,
      vendor: null,
      labels: ['EnvironmentModel'],
      description: 'EnvironmentModel description',
      claimsGraphUri: ['https://resources.gx/EnvironmentModel']
    }
  ] as Resource[],
  viewContentType: 'SHOW_RESOURCES' as ResourcesSearchPageContentType,
  typeAssets: [
    {
      id: 'HdMap',
      type: 'typeAssets',
      label: 'HdMap',
      value: true,
      disabled: false
    },
    {
      id: 'EnvironmentModel',
      type: 'typeAssets',
      label: 'EnvironmentModel',
      value: false,
      disabled: true
    }
  ] as Asset[],
  formatAssets: [
    {
      id: 'ASAM OpenDRIVE',
      type: 'formatAssets',
      label: 'ASAM OpenDRIVE',
      value: true,
      disabled: false
    }
  ] as Asset[],
  vendorAssets: [
    {
      id: 'msg systems ag',
      type: 'vendorAssets',
      label: 'msg systems ag',
      value: false,
      disabled: false
    }
  ] as Asset[],
  specificAssets: [],
  updateSearchText: jest.fn(() => {
  }),
  updateFilterAsset: jest.fn(() => {
  })
};
