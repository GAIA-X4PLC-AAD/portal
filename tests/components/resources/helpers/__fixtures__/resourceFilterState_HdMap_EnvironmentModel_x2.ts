import {ResourceFilterState} from '../../../../../src/components/resources/helpers/resourceFilterReducer';

export const initiallyLoaded_ResourceFilterState = {
  filteredResources: [
    {
      claimsGraphUri: [
        'https://www.gaia-x4plcaad.info/claims/physical-resource/57232ba1-7310-4f79-b64c-6793b378d76a'
      ],
      description: 'Generated description.',
      format: 'Unreal DataSmith',
      labels: [
        'Resource',
        'EnvironmentModel',
        'DataResource'
      ],
      name: 'Generated Data Resource',
      uri: 'https://www.gaia-x4plcaad.info/claims/data-resource/57232ba1-7310-4f79-b64c-6793b378d76a',
      vendor: 'msg systems ag',
      recordingTime: ""
    },
    {
      claimsGraphUri: [
        'https://www.gaia-x4plcaad.info/claims/service-access-point/fe9f0d7f-3a80-48ef-9630-a7c9c3c1e78f',
        'https://www.gaia-x4plcaad.info/claims/data-resource/fe9f0d7f-3a80-48ef-9630-a7c9c3c1e78f',
        'https://www.gaia-x4plcaad.info/claims/virtual-resource/fe9f0d7f-3a80-48ef-9630-a7c9c3c1e78f',
        'https://www.gaia-x4plcaad.info/claims/physical-resource/fe9f0d7f-3a80-48ef-9630-a7c9c3c1e78f'
      ],
      description: 'Generated description.',
      format: '',
      labels: [
        'Resource',
        'EnvironmentModel',
        'DataResource',
        'General'
      ],
      name: 'Generated Data Resource',
      uri: 'https://www.gaia-x4plcaad.info/claims/data-resource/fe9f0d7f-3a80-48ef-9630-a7c9c3c1e78f',
      vendor: 'msg systems ag',
      recordingTime: ""
    },
    {
      claimsGraphUri: [
        'https://www.gaia-x4plcaad.info/claims/physical-resource/01a9590e-e872-470f-b400-aaa513499114',
        'did:web:registry.gaia-x.eu:HdMap:wDgNY3gZAxMe3LjhdAZ9TbPiYnQ-yybNhCu8'
      ],
      description: 'Generated description.',
      format: 'ASAM OpenDRIVE',
      labels: [
        'Resource',
        'DataResource',
        'HdMap'
      ],
      name: 'Generated Data Resource',
      uri: 'did:web:registry.gaia-x.eu:HdMap:wDgNY3gZAxMe3LjhdAZ9TbPiYnQ-yybNhCu8',
      vendor: 'msg systems ag',
      recordingTime: ""
    }
  ],
  formatAssets: [
    {
      disabled: false,
      id: 'ASAM OpenDRIVE',
      label: 'ASAM OpenDRIVE',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Lanelet',
      label: 'Lanelet',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Road5',
      label: 'Road5',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Shape',
      label: 'Shape',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'road2sim',
      label: 'road2sim',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'roadXML',
      label: 'roadXML',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Autodesk FBX',
      label: 'Autodesk FBX',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'GLTF',
      label: 'GLTF',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'OpenSceneGraph',
      label: 'OpenSceneGraph',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: false,
      id: 'Unreal DataSmith',
      label: 'Unreal DataSmith',
      type: 'formatAssets',
      value: false
    }
  ],
  searchText: '',
  typeAssets: [
    {
      disabled: false,
      id: 'HdMap',
      label: 'HdMap',
      type: 'typeAssets',
      value: false
    },
    {
      disabled: false,
      id: 'EnvironmentModel',
      label: 'EnvironmentModel',
      type: 'typeAssets',
      value: false
    }
  ],
  vendorAssets: [
    {
      disabled: false,
      id: 'msg systems ag',
      label: 'msg systems ag',
      type: 'vendorAssets',
      value: false
    }
  ],
  specificAssets: [],
  resourceSpecialDetailsQuery: '',
  resourceSpecialDetails: []
} as ResourceFilterState;

export const filteredBy_searchText_HdMap_ResourceFilterState = {
  filteredResources: [
    {
      claimsGraphUri: [
        'https://www.gaia-x4plcaad.info/claims/physical-resource/01a9590e-e872-470f-b400-aaa513499114',
        'did:web:registry.gaia-x.eu:HdMap:wDgNY3gZAxMe3LjhdAZ9TbPiYnQ-yybNhCu8'
      ],
      description: 'Generated description.',
      format: 'ASAM OpenDRIVE',
      labels: [
        'Resource',
        'DataResource',
        'HdMap'
      ],
      name: 'Generated Data Resource',
      uri: 'did:web:registry.gaia-x.eu:HdMap:wDgNY3gZAxMe3LjhdAZ9TbPiYnQ-yybNhCu8',
      vendor: 'msg systems ag',
      recordingTime: ""
    }
  ],
  formatAssets: [
    {
      disabled: false,
      id: 'ASAM OpenDRIVE',
      label: 'ASAM OpenDRIVE',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Lanelet',
      label: 'Lanelet',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Road5',
      label: 'Road5',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Shape',
      label: 'Shape',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'road2sim',
      label: 'road2sim',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'roadXML',
      label: 'roadXML',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Autodesk FBX',
      label: 'Autodesk FBX',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'GLTF',
      label: 'GLTF',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'OpenSceneGraph',
      label: 'OpenSceneGraph',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: false,
      id: 'Unreal DataSmith',
      label: 'Unreal DataSmith',
      type: 'formatAssets',
      value: false
    }
  ],
  searchText: 'HdMap',
  typeAssets: [
    {
      disabled: false,
      id: 'HdMap',
      label: 'HdMap',
      type: 'typeAssets',
      value: false
    },
    {
      disabled: false,
      id: 'EnvironmentModel',
      label: 'EnvironmentModel',
      type: 'typeAssets',
      value: false
    }
  ],
  vendorAssets: [
    {
      disabled: false,
      id: 'msg systems ag',
      label: 'msg systems ag',
      type: 'vendorAssets',
      value: false
    }
  ],
  specificAssets: [],
  resourceSpecialDetailsQuery: '',
  resourceSpecialDetails: []
} as ResourceFilterState;

export const filteredBy_typeFilter_HdMap_ResourceFilterState = {
  filteredResources: [
    {
      claimsGraphUri: [
        'https://www.gaia-x4plcaad.info/claims/physical-resource/01a9590e-e872-470f-b400-aaa513499114',
        'did:web:registry.gaia-x.eu:HdMap:wDgNY3gZAxMe3LjhdAZ9TbPiYnQ-yybNhCu8'
      ],
      description: 'Generated description.',
      format: 'ASAM OpenDRIVE',
      labels: [
        'Resource',
        'DataResource',
        'HdMap'
      ],
      name: 'Generated Data Resource',
      uri: 'did:web:registry.gaia-x.eu:HdMap:wDgNY3gZAxMe3LjhdAZ9TbPiYnQ-yybNhCu8',
      vendor: 'msg systems ag',
      recordingTime: ""
    }
  ],
  formatAssets: [
    {
      disabled: false,
      id: 'ASAM OpenDRIVE',
      label: 'ASAM OpenDRIVE',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Lanelet',
      label: 'Lanelet',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Road5',
      label: 'Road5',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Shape',
      label: 'Shape',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'road2sim',
      label: 'road2sim',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'roadXML',
      label: 'roadXML',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Autodesk FBX',
      label: 'Autodesk FBX',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'GLTF',
      label: 'GLTF',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'OpenSceneGraph',
      label: 'OpenSceneGraph',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Unreal DataSmith',
      label: 'Unreal DataSmith',
      type: 'formatAssets',
      value: false
    }
  ],
  searchText: '',
  typeAssets: [
    {
      disabled: false,
      id: 'HdMap',
      label: 'HdMap',
      type: 'typeAssets',
      value: true
    },
    {
      disabled: false,
      id: 'EnvironmentModel',
      label: 'EnvironmentModel',
      type: 'typeAssets',
      value: false
    }
  ],
  vendorAssets: [
    {
      disabled: false,
      id: 'msg systems ag',
      label: 'msg systems ag',
      type: 'vendorAssets',
      value: false
    }
  ],
  specificAssets: [],
  resourceSpecialDetailsQuery: '',
  resourceSpecialDetails: []
} as ResourceFilterState;

export const filteredBy_formatFilter_ASAMOpenDrive_ResourceFilterState = {
  filteredResources: [
    {
      claimsGraphUri: [
        'https://www.gaia-x4plcaad.info/claims/physical-resource/01a9590e-e872-470f-b400-aaa513499114',
        'did:web:registry.gaia-x.eu:HdMap:wDgNY3gZAxMe3LjhdAZ9TbPiYnQ-yybNhCu8'
      ],
      description: 'Generated description.',
      format: 'ASAM OpenDRIVE',
      labels: [
        'Resource',
        'DataResource',
        'HdMap'
      ],
      name: 'Generated Data Resource',
      uri: 'did:web:registry.gaia-x.eu:HdMap:wDgNY3gZAxMe3LjhdAZ9TbPiYnQ-yybNhCu8',
      vendor: 'msg systems ag',
      recordingTime: ""
    }
  ],
  formatAssets: [
    {
      disabled: false,
      id: 'ASAM OpenDRIVE',
      label: 'ASAM OpenDRIVE',
      type: 'formatAssets',
      value: true
    },
    {
      disabled: true,
      id: 'Lanelet',
      label: 'Lanelet',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Road5',
      label: 'Road5',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Shape',
      label: 'Shape',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'road2sim',
      label: 'road2sim',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'roadXML',
      label: 'roadXML',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Autodesk FBX',
      label: 'Autodesk FBX',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'GLTF',
      label: 'GLTF',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'OpenSceneGraph',
      label: 'OpenSceneGraph',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: false,
      id: 'Unreal DataSmith',
      label: 'Unreal DataSmith',
      type: 'formatAssets',
      value: false
    }
  ],
  searchText: '',
  typeAssets: [
    {
      disabled: false,
      id: 'HdMap',
      label: 'HdMap',
      type: 'typeAssets',
      value: false
    },
    {
      disabled: false,
      id: 'EnvironmentModel',
      label: 'EnvironmentModel',
      type: 'typeAssets',
      value: false
    }
  ],
  vendorAssets: [
    {
      disabled: false,
      id: 'msg systems ag',
      label: 'msg systems ag',
      type: 'vendorAssets',
      value: false
    }
  ],
  specificAssets: [],
  resourceSpecialDetailsQuery: '',
  resourceSpecialDetails: []
} as ResourceFilterState;

export const filteredBy_vendorFilter_MsgSystemsAG_ResourceFilterState = {
  filteredResources: [
    {
      claimsGraphUri: [
        'https://www.gaia-x4plcaad.info/claims/physical-resource/57232ba1-7310-4f79-b64c-6793b378d76a'
      ],
      description: 'Generated description.',
      format: 'Unreal DataSmith',
      labels: [
        'Resource',
        'EnvironmentModel',
        'DataResource'
      ],
      name: 'Generated Data Resource',
      uri: 'https://www.gaia-x4plcaad.info/claims/data-resource/57232ba1-7310-4f79-b64c-6793b378d76a',
      vendor: 'msg systems ag',
      recordingTime: ""
    }
  ],
  formatAssets: [
    {
      disabled: false,
      id: 'ASAM OpenDRIVE',
      label: 'ASAM OpenDRIVE',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Lanelet',
      label: 'Lanelet',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Road5',
      label: 'Road5',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Shape',
      label: 'Shape',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'road2sim',
      label: 'road2sim',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'roadXML',
      label: 'roadXML',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'Autodesk FBX',
      label: 'Autodesk FBX',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'GLTF',
      label: 'GLTF',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: true,
      id: 'OpenSceneGraph',
      label: 'OpenSceneGraph',
      type: 'formatAssets',
      value: false
    },
    {
      disabled: false,
      id: 'Unreal DataSmith',
      label: 'Unreal DataSmith',
      type: 'formatAssets',
      value: false
    }
  ],
  searchText: '',
  typeAssets: [
    {
      disabled: false,
      id: 'HdMap',
      label: 'HdMap',
      type: 'typeAssets',
      value: false
    },
    {
      disabled: false,
      id: 'EnvironmentModel',
      label: 'EnvironmentModel',
      type: 'typeAssets',
      value: false
    }
  ],
  vendorAssets: [
    {
      disabled: false,
      id: 'msg systems ag',
      label: 'msg systems ag',
      type: 'vendorAssets',
      value: true
    },
    {
      disabled: false,
      id: 'other',
      label: 'other',
      type: 'vendorAssets',
      value: false
    }
  ],
  specificAssets: [],
  resourceSpecialDetailsQuery: '',
  resourceSpecialDetails: []
} as ResourceFilterState;
