import {Resource} from "../../../../src/types/resources.model";

export const mockResources: Resource[] = [
    {
        claimsGraphUri: [
            'https://www.gaia-x4plcaad.info/claims/physical-resource/57232ba1-7310-4f79-b64c-6793b378d76a'
        ],
        vendor: 'msg systems ag',
        format: 'Unreal DataSmith',
        name: 'Generated Data Resource1',
        description: 'Generated description.',
        uri: 'https://www.gaia-x4plcaad.info/claims/data-resource/57232ba1-7310-4f79-b64c-6793b378d76a',
        recordingTime: '2024-08-19T18:05:00',
        labels: [
            'Resource',
            'EnvironmentModel',
            'DataResource'
        ]
    },
    {
        claimsGraphUri: [
            'https://www.gaia-x4plcaad.info/claims/service-access-point/fe9f0d7f-3a80-48ef-9630-a7c9c3c1e78f',
            'https://www.gaia-x4plcaad.info/claims/data-resource/fe9f0d7f-3a80-48ef-9630-a7c9c3c1e78f',
            'https://www.gaia-x4plcaad.info/claims/virtual-resource/fe9f0d7f-3a80-48ef-9630-a7c9c3c1e78f',
            'https://www.gaia-x4plcaad.info/claims/physical-resource/fe9f0d7f-3a80-48ef-9630-a7c9c3c1e78f'
        ],
        vendor: 'msg systems ag',
        format: null,
        name: 'Generated Data Resource2',
        description: 'Generated description.',
        uri: 'https://www.gaia-x4plcaad.info/claims/data-resource/fe9f0d7f-3a80-48ef-9630-a7c9c3c1e78f',
        recordingTime: '2025-08-19T18:05:00',
        labels: [
            'Resource',
            'EnvironmentModel',
            'DataResource',
            'General'
        ]
    },
    {
        claimsGraphUri: [
            'https://www.gaia-x4plcaad.info/claims/physical-resource/01a9590e-e872-470f-b400-aaa513499114',
            'did:web:registry.gaia-x.eu:HdMap:wDgNY3gZAxMe3LjhdAZ9TbPiYnQ-yybNhCu8'
        ],
        vendor: 'msg systems ag',
        format: 'ASAM OpenDRIVE',
        name: 'Generated Data Resource3',
        description: 'Generated description.',
        uri: 'did:web:registry.gaia-x.eu:HdMap:wDgNY3gZAxMe3LjhdAZ9TbPiYnQ-yybNhCu8',
        recordingTime: '2026-08-19T18:05:00',
        labels: [
            'Resource',
            'DataResource',
            'HdMap'
        ]
    }
];
