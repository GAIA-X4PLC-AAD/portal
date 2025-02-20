import {ServiceOffering} from '../../../../src/types/serviceOfferings.model';

export const mockServiceOfferings: ServiceOffering[] = [
    {
        name: 'ServiceOffering 1',
        labels: ['ServiceOffering 1 label'],
        uri: 'uri1',
        description: 'description 1',
        recordingTime: '2024-08-19T18:05:00'
    },
    {
        name: 'ServiceOffering 2',
        labels: ['ServiceOffering 2 label'],
        uri: 'uri2',
        description: 'description 2',
        recordingTime: '2025-08-19T18:05:00'
    },
    {
        name: 'ZServiceOffering 3',
        labels: ['ZServiceOffering 3 label'],
        uri: 'uri3',
        description: 'description 3',
        recordingTime: '2026-08-19T18:05:00'
    }];
