import i18next from 'i18next';

import { SortOrder } from '../../../../src/common/components/buttons/SortListButton';
import { getAllLabels } from '../../../../src/components/resources/helpers/resourceFilterHelper';
import {
  getPropertyValue,
  getResourceSortMenuItems,
  getSortedResources,
  removeNonResourceTypeLabels,
  sortDataResources
} from '../../../../src/components/resources/helpers/resourcesHelper';
import { mockResources } from '../__fixtures__/resources';

import { resources_HdMap_EnvironmentModel_x2 } from './__fixtures__/resources_HdMap_EnvironmentModel_x2';

describe('removeNonResourceTypeLabels', () => {
  it('returns the value of a given property entry', () => {
    const obj = {
      property1: 'first property value',
      property2: 'second property value'
    }
    const entries = Object.entries(obj);
    expect(getPropertyValue(entries[0])).toEqual('first property value');
    expect(getPropertyValue(entries[1])).toEqual('second property value');
  })

  it('removes all labels which not contained by the "resourceTypes" input parameter', () => {
    const resourceTypes = ['HdMap', 'EnvironmentModel'];
    const result = removeNonResourceTypeLabels(resources_HdMap_EnvironmentModel_x2, resourceTypes);

    expect(getAllLabels(resources_HdMap_EnvironmentModel_x2).size).toBeGreaterThan(resourceTypes.length);
    expect(getAllLabels(result)).toEqual(new Set(resourceTypes));
  })
})

jest.mock('i18next', () => ({
  t: (key: string) => {
    const translations = {
      'resources.sort-menu.a-z': 'A to Z',
      'resources.sort-menu.z-a': 'Z to A',
      'resources.sort-menu.new': 'Newest offering first',
      'resources.sort-menu.old': 'Oldest offering first',
    };
    return translations[key] || key;
  },
}));

describe('getResourceSortMenuItems', () => {
  it('returns the correct menu items', () => {
    const menuItems = getResourceSortMenuItems();
    expect(menuItems).toEqual([
      { label: 'A to Z', sortOrder: 'ASC_NAME' },
      { label: 'Z to A', sortOrder: 'DESC_NAME' },
      { label: 'Newest offering first', sortOrder: 'DESC_DATE' },
      { label: 'Oldest offering first', sortOrder: 'ASC_DATE' },
    ]);
  })
});

describe('getSortedResources', () => {
  it('should sort resources in ascending order by name', () => {
    const expectedSortedResources = [
      mockResources[0],
      mockResources[1],
      mockResources[2],
    ];
    const sorted = getSortedResources(mockResources, SortOrder.ASC_NAME);
    expect(sorted).toEqual(expectedSortedResources);
  });

  it('should sort resources in descending order by name', () => {
    const expectedSortedResources = [
      mockResources[2],
      mockResources[1],
      mockResources[0],
    ];
    const sorted = getSortedResources(mockResources, SortOrder.DESC_NAME);
    expect(sorted).toEqual(expectedSortedResources);
  });

  it('should sort resources in ascending order by recording time', () => {
    const expectedSortedResources = [
      mockResources[0],
      mockResources[1],
      mockResources[2],
    ];
    const sorted = getSortedResources(mockResources, SortOrder.ASC_DATE);
    expect(sorted).toEqual(expectedSortedResources);
  });

  it('should sort resources in descending order by recording time', () => {
    const expectedSortedResources = [
      mockResources[2],
      mockResources[1],
      mockResources[0],
    ];
    const sorted = getSortedResources(mockResources, SortOrder.DESC_DATE);
    expect(sorted).toEqual(expectedSortedResources);
  });

});

describe('getPropertyValue', () => {
  it('returns the value of a given property entry', () => {
    const obj = {
      property1: 'first property value',
      property2: 'second property value',
      property3: 123,
      property4: true,
    };
    const entries = Object.entries(obj);
    expect(getPropertyValue(entries[0])).toEqual('first property value');
    expect(getPropertyValue(entries[1])).toEqual('second property value');
    expect(getPropertyValue(entries[2])).toEqual('123');
    expect(getPropertyValue(entries[3])).toEqual('true');
  });
});

describe('removeNonResourceTypeLabels', () => {
  it('removes all labels which are not contained by the "resourceTypes" input parameter', () => {
    const resourceTypes = ['HdMap', 'EnvironmentModel'];
    const result = removeNonResourceTypeLabels(resources_HdMap_EnvironmentModel_x2, resourceTypes);

    expect(getAllLabels(resources_HdMap_EnvironmentModel_x2).size).toBeGreaterThan(resourceTypes.length);
    expect(getAllLabels(result)).toEqual(new Set(resourceTypes));
  });

  it('handles empty resourceTypes array', () => {
    const resourceTypes = [];
    const result = removeNonResourceTypeLabels(resources_HdMap_EnvironmentModel_x2, resourceTypes);

    expect(getAllLabels(result).size).toBe(0);
  });

  it('handles empty resources array', () => {
    const resourceTypes = ['HdMap', 'EnvironmentModel'];
    const result = removeNonResourceTypeLabels([], resourceTypes);

    expect(result).toEqual([]);
  });
});

describe('getResourceSortMenuItems', () => {
  it('returns the correct menu items', () => {
    const menuItems = getResourceSortMenuItems();
    expect(menuItems).toEqual([
      { label: 'A to Z', sortOrder: 'ASC_NAME' },
      { label: 'Z to A', sortOrder: 'DESC_NAME' },
      { label: 'Newest offering first', sortOrder: 'DESC_DATE' },
      { label: 'Oldest offering first', sortOrder: 'ASC_DATE' },
    ]);
  });

  it('handles missing translations', () => {
    jest.spyOn(i18next, 't').mockImplementation((key) => key);
    const menuItems = getResourceSortMenuItems();
    expect(menuItems).toEqual([
      { label: 'resources.sort-menu.a-z', sortOrder: 'ASC_NAME' },
      { label: 'resources.sort-menu.z-a', sortOrder: 'DESC_NAME' },
      { label: 'resources.sort-menu.new', sortOrder: 'DESC_DATE' },
      { label: 'resources.sort-menu.old', sortOrder: 'ASC_DATE' },
    ]);
    jest.spyOn(i18next, 't').mockRestore();
  });
});

describe('getSortedResources', () => {
  it('should sort resources in ascending order by name', () => {
    const expectedSortedResources = [
      mockResources[0],
      mockResources[1],
      mockResources[2],
    ];
    const sorted = getSortedResources(mockResources, SortOrder.ASC_NAME);
    expect(sorted).toEqual(expectedSortedResources);
  });

  it('should sort resources in descending order by name', () => {
    const expectedSortedResources = [
      mockResources[2],
      mockResources[1],
      mockResources[0],
    ];
    const sorted = getSortedResources(mockResources, SortOrder.DESC_NAME);
    expect(sorted).toEqual(expectedSortedResources);
  });

  it('should sort resources in ascending order by recording time', () => {
    const expectedSortedResources = [
      mockResources[0],
      mockResources[1],
      mockResources[2],
    ];
    const sorted = getSortedResources(mockResources, SortOrder.ASC_DATE);
    expect(sorted).toEqual(expectedSortedResources);
  });

  it('should sort resources in descending order by recording time', () => {
    const expectedSortedResources = [
      mockResources[2],
      mockResources[1],
      mockResources[0],
    ];
    const sorted = getSortedResources(mockResources, SortOrder.DESC_DATE);
    expect(sorted).toEqual(expectedSortedResources);
  });

  it('handles resources with missing names ASC', () => {
    const resourcesWithMissingNames = [
      { name: 'Resource A', recordingTime: '2023-01-01' },
      { recordingTime: '2023-01-02' },
      { name: 'Resource C', recordingTime: '2023-01-03' },
    ];
    const sorted = getSortedResources(resourcesWithMissingNames, SortOrder.ASC_NAME);
    expect(sorted).toEqual([
      { name: 'Resource A', recordingTime: '2023-01-01' },
      { name: 'Resource C', recordingTime: '2023-01-03' },
      { recordingTime: '2023-01-02' },
    ]);
  });

  it('handles resources with missing names DESC', () => {
    const resourcesWithMissingNames = [
      { name: 'Resource A', recordingTime: '2023-01-01' },
      { recordingTime: '2023-01-02' },
      { name: 'Resource C', recordingTime: '2023-01-03' },
    ];
    const sorted = getSortedResources(resourcesWithMissingNames, SortOrder.DESC_NAME);
    expect(sorted).toEqual([
      { name: 'Resource C', recordingTime: '2023-01-03' },
      { name: 'Resource A', recordingTime: '2023-01-01' },
      { recordingTime: '2023-01-02' },
    ]);
  });

  it('handles resources with missing recording times ASC', () => {
    const resourcesWithMissingTimes = [
      { name: 'Resource A', recordingTime: '2023-01-01' },
      { name: 'Resource B' },
      { name: 'Resource C', recordingTime: '2023-01-03' },
    ];
    const sorted = getSortedResources(resourcesWithMissingTimes, SortOrder.ASC_DATE);
    expect(sorted).toEqual([
      { name: 'Resource A', recordingTime: '2023-01-01' },
      { name: 'Resource C', recordingTime: '2023-01-03' },
      { name: 'Resource B' },
    ]);
  });

  it('handles resources with missing recording times DESC', () => {
    const resourcesWithMissingTimes = [
      { name: 'Resource A', recordingTime: '2023-01-01' },
      { name: 'Resource B' },
      { name: 'Resource C', recordingTime: '2023-01-03' },
    ];
    const sorted = getSortedResources(resourcesWithMissingTimes, SortOrder.DESC_DATE);
    expect(sorted).toEqual([
      { name: 'Resource C', recordingTime: '2023-01-03' },
      { name: 'Resource A', recordingTime: '2023-01-01' },
      { name: 'Resource B' },
    ]);
  });
});

describe('sortDataResources', () => {
  it('sorts resources alphabetically with "general" first', () => {
    const dataResources = [
      { resourceItemName: 'general' },
      { resourceItemName: 'beta' },
      { resourceItemName: 'alpha' },
    ];
    const sorted = sortDataResources(dataResources);
    expect(sorted).toEqual([
      { resourceItemName: 'general' },
      { resourceItemName: 'alpha' },
      { resourceItemName: 'beta' },
    ]);
  });

  it('handles empty array', () => {
    const sorted = sortDataResources([]);
    expect(sorted).toEqual([]);
  });

  it('handles array without "general"', () => {
    const dataResources = [
      { resourceItemName: 'beta' },
      { resourceItemName: 'alpha' },
    ];
    const sorted = sortDataResources(dataResources);
    expect(sorted).toEqual([
      { resourceItemName: 'alpha' },
      { resourceItemName: 'beta' },
    ]);
  });
});
