import {
  Asset,
  calculateResourceFiltersAssetState,
  createFormatAssets,
  createTypeAssets,
  createVendorAssets,
  getAllFormats,
  getAllLabels,
  getResourceVendors,
  getSelectedAssets
} from '../../../../src/components/resources/helpers/resourceFilterHelper';
import {
  initialResourceFilterState,
  resourceFilterReducer,
  ResourceFilterState,
  setResourceFilterAssetsAction,
  setSearchTextAction,
  updateFilterAssetAction
} from '../../../../src/components/resources/helpers/resourceFilterReducer';
import {
  ontologies_General_HdMap_EnvironmentModel
} from '../../../__fixtures__/ontologies_General_HdMap_EnvironmentModel';

import {
  filteredBy_formatFilter_ASAMOpenDrive_ResourceFilterState,
  filteredBy_searchText_HdMap_ResourceFilterState,
  filteredBy_typeFilter_HdMap_ResourceFilterState,
  filteredBy_vendorFilter_MsgSystemsAG_ResourceFilterState,
  initiallyLoaded_ResourceFilterState
} from './__fixtures__/resourceFilterState_HdMap_EnvironmentModel_x2';
import { resources_HdMap_EnvironmentModel_x2 } from './__fixtures__/resources_HdMap_EnvironmentModel_x2';

describe('Reducer', () => {
  it('generates the "initiallyLoadedResourceFilterState" when "setResourceFilterAssetsAction" created from ' +
      '"ontologies_General_HdMap_EnvironmentModel" and "resources_HdMap_EnvironmentModel_x2" ' +
      'and is executed on "initialResourceFilterStatus"', () => {
    const action = setResourceFilterAssetsAction(
      ontologies_General_HdMap_EnvironmentModel,
      resources_HdMap_EnvironmentModel_x2
    );
    const nextState = resourceFilterReducer(initialResourceFilterState, action);

    expect(nextState.filteredResources.length).toEqual(3);
    expect(nextState).toEqual(initiallyLoaded_ResourceFilterState);
  })

  it('generates the "filteredBy_searchText_HdMap_ResourceFilterState" when "setSearchTextAction" created from ' +
      '"ontologies_General_HdMap_EnvironmentModel" and "resources_HdMap_EnvironmentModel_x2" ' +
      'and is executed on "initialResourceFilterStatus"', () => {
    const searchText = 'HdMap';
    const action = setSearchTextAction(
      searchText,
      ontologies_General_HdMap_EnvironmentModel,
      resources_HdMap_EnvironmentModel_x2
    );
    const nextState = resourceFilterReducer(initialResourceFilterState, action);

    expect(nextState.filteredResources.length).toEqual(1);
    expect(nextState).toEqual(filteredBy_searchText_HdMap_ResourceFilterState);
  })

  it('generates the "filteredBy_typeAssets_HdMap_ResourceFilterState" when "updateFilterAssetAction" created from ' +
      'selected type asset for which the filtering is desired ' +
      'and "ontologies_General_HdMap_EnvironmentModel" and "resources_HdMap_EnvironmentModel_x2" ' +
      'and is executed on "initiallyLoaded_ResourceFilterState"', () => {
    const hdMapTypeAsset = {
      id: 'HdMap',
      type: 'typeAssets',
      label: 'HdMap',
      value: true,
      disabled: false
    } as Asset;
    const action = updateFilterAssetAction(
      hdMapTypeAsset,
      ontologies_General_HdMap_EnvironmentModel,
      resources_HdMap_EnvironmentModel_x2
    );
    const nextState = resourceFilterReducer(initiallyLoaded_ResourceFilterState, action);

    expect(nextState.filteredResources.length).toEqual(1);
    expect(nextState).toEqual(filteredBy_typeFilter_HdMap_ResourceFilterState);
  })

  it('generates the "filteredBy_formatAssets_HdMap_ResourceFilterState" when "updateFilterAssetAction" created from ' +
      'selected format asset for which the filtering is desired ' +
      'and "ontologies_General_HdMap_EnvironmentModel" and "resources_HdMap_EnvironmentModel_x2" ' +
      'and is executed on "initiallyLoaded_ResourceFilterState"', () => {
    const asamOpenDriveFormatAsset = {
      id: 'ASAM OpenDRIVE',
      type: 'formatAssets',
      label: 'ASAM OpenDRIVE',
      value: true,
      disabled: false
    } as Asset;
    const action = updateFilterAssetAction(
      asamOpenDriveFormatAsset,
      ontologies_General_HdMap_EnvironmentModel,
      resources_HdMap_EnvironmentModel_x2
    );
    const nextState = resourceFilterReducer(initiallyLoaded_ResourceFilterState, action);

    expect(nextState.filteredResources.length).toEqual(1);
    expect(nextState).toEqual(filteredBy_formatFilter_ASAMOpenDrive_ResourceFilterState);
  })

  it('generates the "filteredBy_vendorAssets_MsgSystemsAG_ResourceFilterState" when "updateFilterAssetAction" created' +
      ' from selected format asset for which the filtering is desired ' +
      'and "ontologies_General_HdMap_EnvironmentModel" and "resources_HdMap_EnvironmentModel_x2" ' +
      'and is executed on "initiallyLoaded_ResourceFilterState"', () => {
    const msgSystemsAGVendorAsset = {
      id: 'msg systems ag',
      type: 'vendorAssets',
      label: 'msg systems ag',
      value: true,
      disabled: false
    } as Asset;
    const resources_msgSystemsAG_x1_vendor = resources_HdMap_EnvironmentModel_x2
      .map((resource, index) => !index ? resource : { ...resource, vendor: 'other' })
    const action = updateFilterAssetAction(
      msgSystemsAGVendorAsset,
      ontologies_General_HdMap_EnvironmentModel,
      resources_msgSystemsAG_x1_vendor
    );
    const nextState = resourceFilterReducer(initiallyLoaded_ResourceFilterState, action);

    expect(nextState.filteredResources.length).toEqual(1);
    expect(nextState).toEqual(filteredBy_vendorFilter_MsgSystemsAG_ResourceFilterState);
  })

  it('returns "initialResourceFilterState" if an unknown action is passed in', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const nextState = resourceFilterReducer(initialResourceFilterState, action);

    expect(nextState).toEqual(initialResourceFilterState);
  })
})

describe('createTypeAssets', () => {
  it('Creates a list of types from a list of type ids, marks disabled if not present in any of the resources' +
      ' passed in', () => {
    const result = createTypeAssets(
      ['HdMap', 'EnvironmentModel'],
      []
    );

    expect(result.length).toEqual(2);
    expect(result).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: 'HdMap',
        value: false,
        disabled: true
      }),
      expect.objectContaining({
        id: 'EnvironmentModel',
        value: false,
        disabled: true
      }),
    ]))
  })

  it('Marks enabled if it is present in the resources', () => {
    const result = createTypeAssets(
      ['HdMap', 'EnvironmentModel', 'Other'],
      resources_HdMap_EnvironmentModel_x2
    );

    expect(result.length).toEqual(3);
    expect(result).toEqual([
      expect.objectContaining({
        id: 'HdMap',
        value: false,
        disabled: false
      }),
      expect.objectContaining({
        id: 'EnvironmentModel',
        value: false,
        disabled: false
      }),
      expect.objectContaining({
        id: 'Other',
        value: false,
        disabled: true
      })
    ])
  })
})

describe('getAllLabels', () => {
  it('returns all available resource types present in the resources list', () => {
    const result = getAllLabels(resources_HdMap_EnvironmentModel_x2);
    expect(result).toEqual(new Set(['DataResource', 'EnvironmentModel', 'General', 'HdMap', 'Resource']));
  })
})

describe('createFormatAssets', () => {
  it('Creates a list of formats from a list of format ids, marks disabled if not present in any of the resources' +
      ' passed in, marks unselected if it is not selected also in the "prevFormatAssets"', () => {
    const result = createFormatAssets(
      ['Autodesk FBX', 'GLTF', 'OpenSceneGraph', 'Unreal DataSmith', 'ASAM OSI GroundTruth',
        'ASAM OSI SensorView', 'ASAM OSI SensorData', 'ASAM OpenDRIVE', 'Lanelet', 'Road5', 'Shape',
        'road2sim', 'roadXML'],
      [],
      []
    );

    expect(result.length).toEqual(13);
    expect(result).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: 'ASAM OpenDRIVE',
        value: false,
        disabled: true
      }),
      expect.objectContaining({
        id: 'Autodesk FBX',
        value: false,
        disabled: true
      }),
    ]))
  })

  it('Marks enabled if it is present in the resources', () => {
    const result = createFormatAssets(
      ['Autodesk FBX', 'GLTF', 'OpenSceneGraph', 'Unreal DataSmith', 'ASAM OSI GroundTruth',
        'ASAM OSI SensorView', 'ASAM OSI SensorData', 'ASAM OpenDRIVE', 'Lanelet', 'Road5', 'Shape',
        'road2sim', 'roadXML'],
      [],
      resources_HdMap_EnvironmentModel_x2
    );

    expect(result.length).toEqual(13);
    expect(result).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: 'ASAM OpenDRIVE',
        value: false,
        disabled: false
      }),
      expect.objectContaining({
        id: 'Autodesk FBX',
        value: false,
        disabled: true
      }),
    ]))
  })

  it('Marks selected if it was selected also in the "prevFormatAssets"', () => {
    const result = createFormatAssets(
      ['Autodesk FBX', 'GLTF', 'OpenSceneGraph', 'Unreal DataSmith', 'ASAM OSI GroundTruth',
        'ASAM OSI SensorView', 'ASAM OSI SensorData', 'ASAM OpenDRIVE', 'Lanelet', 'Road5', 'Shape',
        'road2sim', 'roadXML'],
        [
          {
            id: 'ASAM OpenDRIVE',
            value: true
          }
        ] as Asset[],
        []);

    expect(result.length).toEqual(13);
    expect(result).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: 'ASAM OpenDRIVE',
        value: true,
        disabled: true
      }),
      expect.objectContaining({
        id: 'Autodesk FBX',
        value: false,
        disabled: true
      }),
    ]))
  })
})

describe('getAllFormats', () => {
  it('returns all available formats present in the resources list', () => {
    const result = getAllFormats(resources_HdMap_EnvironmentModel_x2);

    expect(result).toEqual(new Set(['ASAM OpenDRIVE', 'Unreal DataSmith']));
  })
})

describe('createVendorAssets', () => {
  it('Creates a list of vendors from a list of vendor ids, marks disabled if not present in any of the resources' +
      ' passed in, marks unselected if it is not selected also in the "prevVendorAssets"', () => {
    const result = createVendorAssets(['msg systems ag', 'other'], [], []);
    expect(result).toEqual([
      expect.objectContaining({
        id: 'msg systems ag',
        value: false,
        disabled: true
      }),
      expect.objectContaining({
        id: 'other',
        value: false,
        disabled: true
      }),
    ])
  })

  it('Marks enabled if it is present in the resources', () => {
    const result = createVendorAssets(['msg systems ag', 'other'], [], resources_HdMap_EnvironmentModel_x2);
    expect(result).toEqual([
      expect.objectContaining({
        id: 'msg systems ag',
        value: false,
        disabled: false
      }),
      expect.objectContaining({
        id: 'other',
        value: false,
        disabled: true
      }),
    ])
  })

  it('Marks selected if it was selected also in the "prevVendorAssets"', () => {
    const result = createVendorAssets(['msg systems ag', 'other'], [
      {
        id: 'msg systems ag',
        value: true
      }
    ] as Asset[], []);

    expect(result).toEqual([
      expect.objectContaining({
        id: 'msg systems ag',
        value: true,
        disabled: true
      }),
      expect.objectContaining({
        id: 'other',
        value: false,
        disabled: true
      }),
    ])
  })
})

describe('getResourceVendors', () => {
  it('returns the ids of all vendors present in the resources', () => {
    const vendors = getResourceVendors(resources_HdMap_EnvironmentModel_x2
      .map((resource, index) => index === 0
        ? { ...resource, vendor: 'msg systems ag' }
        : { ...resource, vendor: 'other' }))
    expect(vendors).toEqual(new Set(['msg systems ag', 'other']));
  })
})

describe('getSelectedAssets', () => {
  console.debug = jest.fn(); // Disable debug logging

  it('Only assets which are not disabled and with value equal true are selected', () => {
    const assets = [
      {
        id: 'General',
        disabled: false,
        value: false,
      },
      {
        id: 'EnvironmentModel',
        disabled: true,
        value: true
      },
      {
        id: 'HdMap',
        disabled: false,
        value: true
      }
    ] as Asset[];

    const result = getSelectedAssets(assets);
    expect(result).toEqual(['HdMap'])
  })

  it('returns "NOTHING" if nothing is selected and not empty list.', () => {
    const assets = [
      {
        id: 'General',
        disabled: false,
        value: false,
      },
      {
        id: 'EnvironmentModel',
        disabled: true,
        value: true
      },
      {
        id: 'HdMap',
        disabled: true,
        value: true
      }
    ] as Asset[];

    const result = getSelectedAssets(assets);
    expect(result).toEqual('NOTHING');
  })
})

describe('calculateResourceFiltersAssetState', () => {

  it('With no selected filter passed in, the resource list will not be filtered' +
      'the assets are created from ontologies.', () => {
    const result = calculateResourceFiltersAssetState(
      ontologies_General_HdMap_EnvironmentModel,
      [...resources_HdMap_EnvironmentModel_x2],
      initialResourceFilterState
    )

    expect(result.filteredResources).toEqual(resources_HdMap_EnvironmentModel_x2);

    expect(result.typeAssets).toEqual([
      {
        id: 'HdMap',
        type: 'typeAssets',
        label: 'HdMap',
        value: false,
        disabled: false
      },
      {
        id: 'EnvironmentModel',
        type: 'typeAssets',
        label: 'EnvironmentModel',
        value: false,
        disabled: false
      }
    ]);

    expect(result.formatAssets.filter(asset => !asset.disabled).length).toEqual(2);
    expect(result.formatAssets).toEqual(expect.arrayContaining([
      {
        id: 'ASAM OpenDRIVE',
        type: 'formatAssets',
        label: 'ASAM OpenDRIVE',
        value: false,
        disabled: false
      },
      {
        id: 'Unreal DataSmith',
        type: 'formatAssets',
        label: 'Unreal DataSmith',
        value: false,
        disabled: false
      }
    ]));

    expect(result.vendorAssets.filter(asset => !asset.disabled).length).toEqual(1)
    expect(result.vendorAssets).toEqual([
      expect.objectContaining({ id: 'msg systems ag', disabled: false })
    ]);
  })

  it('Pass in "HdMap" as previously select, will not affect the disabled state of the other asset types,' +
      'it will also filter the resources list', () => {
    const result = calculateResourceFiltersAssetState(
      ontologies_General_HdMap_EnvironmentModel,
      [...resources_HdMap_EnvironmentModel_x2],
        {
          filteredResources: [],
          typeAssets: [
            {
              id: 'HdMap',
              type: 'typeAssets',
              label: 'HdMap',
              value: true,
              disabled: false
            },
          ] as Asset[],
          formatAssets: [],
          vendorAssets: [],
        } as ResourceFilterState
    )

    expect(result.filteredResources.length).toEqual(1);
    expect(result.filteredResources).toEqual([
      expect.objectContaining({
        labels: ['Resource', 'DataResource', 'HdMap']
      })
    ]);

    expect(result.typeAssets.filter(asset => !asset.value).length).toEqual(1);
    expect(result.typeAssets).toEqual(expect.arrayContaining([
      {
        id: 'HdMap',
        type: 'typeAssets',
        label: 'HdMap',
        value: true,
        disabled: false
      }
    ]));

    expect(result.formatAssets.filter(asset => !asset.disabled).length).toEqual(1);
    expect(result.formatAssets).toEqual(expect.arrayContaining([
      {
        id: 'ASAM OpenDRIVE',
        type: 'formatAssets',
        label: 'ASAM OpenDRIVE',
        value: false,
        disabled: false
      },
    ]));

    expect(result.vendorAssets.filter(asset => !asset.disabled).length).toEqual(1)
    expect(result.vendorAssets).toEqual([
      expect.objectContaining({ id: 'msg systems ag', disabled: false })
    ]);
  })

  it('Pass in "EnvironmentModel" as previously select, will affect the disabled state of the other asset types,' +
      'it will also filter the resources list', () => {
    const result = calculateResourceFiltersAssetState(
      ontologies_General_HdMap_EnvironmentModel,
      [...resources_HdMap_EnvironmentModel_x2],
        {
          filteredResources: [],
          typeAssets: [
            {
              id: 'EnvironmentModel',
              type: 'typeAssets',
              label: 'EnvironmentModel',
              value: true,
              disabled: false
            },
          ] as Asset[],
          formatAssets: [],
          vendorAssets: [],
        } as ResourceFilterState
    )

    expect(result.filteredResources.length).toEqual(2);
    expect(result.filteredResources).toEqual([
      expect.objectContaining({
        labels: expect.arrayContaining(['EnvironmentModel'])
      }),
      expect.objectContaining({
        labels: expect.arrayContaining(['EnvironmentModel'])
      })
    ]);

    expect(result.typeAssets.filter(asset => !asset.value).length).toEqual(1);
    expect(result.typeAssets).toEqual(expect.arrayContaining([
      {
        id: 'EnvironmentModel',
        type: 'typeAssets',
        label: 'EnvironmentModel',
        value: true,
        disabled: false
      }
    ]));

    expect(result.formatAssets.filter(asset => !asset.disabled).length).toEqual(1);
    expect(result.formatAssets).toEqual(expect.arrayContaining([
      {
        id: 'Unreal DataSmith',
        type: 'formatAssets',
        label: 'Unreal DataSmith',
        value: false,
        disabled: false
      }
    ]));

    expect(result.vendorAssets.filter(asset => !asset.disabled).length).toEqual(1)
    expect(result.vendorAssets).toEqual([
      expect.objectContaining({ id: 'msg systems ag', disabled: false })
    ]);
  })

  it('Pass in "EnvironmentModel" type and "ASAM OpenDRIVE" format filters as previously select, will affect the' +
      ' disabled state of the other asset types, it will also filter the resources list', () => {
    const result = calculateResourceFiltersAssetState(
      ontologies_General_HdMap_EnvironmentModel,
      [...resources_HdMap_EnvironmentModel_x2],
        {
          filteredResources: [],
          typeAssets: [
            {
              id: 'EnvironmentModel',
              type: 'typeAssets',
              label: 'EnvironmentModel',
              value: true,
              disabled: false
            },
          ] as Asset[],
          formatAssets: [
            {
              id: 'ASAM OpenDRIVE',
              type: 'formatAssets',
              label: 'ASAM OpenDRIVE',
              value: true,
              disabled: false
            },
          ],
          vendorAssets: [],
        } as ResourceFilterState
    )

    expect(result.filteredResources.length).toEqual(2);

    expect(result.typeAssets.filter(asset => !asset.value).length).toEqual(1);
    expect(result.typeAssets).toEqual(expect.arrayContaining([
      {
        id: 'EnvironmentModel',
        type: 'typeAssets',
        label: 'EnvironmentModel',
        value: true,
        disabled: false
      }
    ]));

    expect(result.formatAssets.filter(asset => !asset.disabled).length).toEqual(1);
    expect(result.formatAssets).toEqual(expect.arrayContaining([
      {
        id: 'Unreal DataSmith',
        type: 'formatAssets',
        label: 'Unreal DataSmith',
        value: false,
        disabled: false
      }
    ]));

    expect(result.vendorAssets.filter(asset => !asset.disabled).length).toEqual(1);
  })

  it('Pass in "vendor filter" as previously selected it will filter the resources list', () => {
    const result = calculateResourceFiltersAssetState(
      ontologies_General_HdMap_EnvironmentModel,
      [
        ...resources_HdMap_EnvironmentModel_x2
          .map((resource, index) => index === 0
            ? { ...resource, vendor: 'msg systems ag' }
            : { ...resource, vendor: 'other' })
      ],
        {
          filteredResources: [],
          typeAssets: [],
          formatAssets: [],
          vendorAssets: [
            {
              id: 'msg systems ag',
              type: 'vendorAssets',
              label: 'msg systems ag',
              value: true,
              disabled: false
            },
          ],
        } as ResourceFilterState
    )

    expect(result.filteredResources.length).toEqual(1);

    expect(result.typeAssets.filter(asset => !asset.value).length).toEqual(2);

    expect(result.formatAssets.filter(asset => !asset.disabled).length).toEqual(2);
    expect(result.formatAssets).toEqual(expect.arrayContaining([
      {
        id: 'ASAM OpenDRIVE',
        type: 'formatAssets',
        label: 'ASAM OpenDRIVE',
        value: false,
        disabled: false
      },
      {
        id: 'Unreal DataSmith',
        type: 'formatAssets',
        label: 'Unreal DataSmith',
        value: false,
        disabled: false,
      }
    ]));

    expect(result.vendorAssets.filter(asset => !asset.disabled).length).toEqual(2)
    expect(result.vendorAssets).toEqual([
      expect.objectContaining({ id: 'msg systems ag', value: true, disabled: false }),
      expect.objectContaining({ id: 'other', value: false, disabled: false })
    ]);
  })

  it('returns a filtered resource list if searchText is set, but does not effect the filter type assets', () => {
    const result = calculateResourceFiltersAssetState(
      ontologies_General_HdMap_EnvironmentModel,
      [...resources_HdMap_EnvironmentModel_x2],
        {
          filteredResources: [],
          typeAssets: [],
          formatAssets: [],
          vendorAssets: [],
          searchText: '72-'
        } as ResourceFilterState
    )

    expect(result.filteredResources.length).toEqual(1);
    expect(result.typeAssets).toEqual([
      {
        id: 'HdMap',
        type: 'typeAssets',
        label: 'HdMap',
        value: false,
        disabled: false
      },
      {
        id: 'EnvironmentModel',
        type: 'typeAssets',
        label: 'EnvironmentModel',
        value: false,
        disabled: false
      }
    ]);
    expect(result.formatAssets.filter(asset => !asset.disabled).length).toEqual(2);
    expect(result.formatAssets).toEqual(expect.arrayContaining([
      {
        id: 'ASAM OpenDRIVE',
        type: 'formatAssets',
        label: 'ASAM OpenDRIVE',
        value: false,
        disabled: false
      },
      {
        id: 'Unreal DataSmith',
        label: 'Unreal DataSmith',
        type: 'formatAssets',
        value: false,
        disabled: false,
      }
    ]));

    expect(result.vendorAssets.filter(asset => !asset.disabled).length).toEqual(1)
    expect(result.vendorAssets).toEqual([
      expect.objectContaining({ id: 'msg systems ag', disabled: false })
    ]);
  })

})
