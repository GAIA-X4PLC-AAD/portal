import { SortOrder } from '../../../../src/common/components/buttons/SortListButton';
import { getAllLabels } from '../../../../src/components/resources/helpers/resourceFilterHelper';
import {
  getPropertyValue, getResourceSortMenuItems, getSortedResources,
  removeNonResourceTypeLabels
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
