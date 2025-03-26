import i18next from 'i18next';

import { MenuItemObject, SortOrder } from '../../../common/components/buttons/SortListButton';
import { Resource, ResourceItem } from '../../../types/resources.model';

/**
 * Returns the value of an object property represented as an object entry.
 *
 * @param objectEntry the object property for which the value should be returned.
 */
export const getPropertyValue = (objectEntry: [string, any]) => String(objectEntry[1])

/**
 * Removes from the labels list of each resource the labels which are not a type of resource
 * This has relevance when displaying the resource list. We do not want to show the above-mentioned labels.
 *
 * @param resources the original resource list.
 * @param resourceTypes the types to be considered as resource types.
 * @return returns  copy of the original resources without the labels.
 */
export const removeNonResourceTypeLabels = (resources: Resource[], resourceTypes: string[]) => {
  return resources.map(resource => ({
    ...resource,
    labels: resource.labels.filter(label => resourceTypes.includes(label))
  }));
}

/**
 * Returns the menu items for the sort menu.
 */
export const getResourceSortMenuItems = (): MenuItemObject[] => {
  return [
    { label: i18next.t('resources.sort-menu.a-z'), sortOrder: SortOrder.ASC_NAME },
    { label: i18next.t('resources.sort-menu.z-a'), sortOrder: SortOrder.DESC_NAME },
    { label: i18next.t('resources.sort-menu.new'), sortOrder: SortOrder.DESC_DATE },
    { label: i18next.t('resources.sort-menu.old'), sortOrder: SortOrder.ASC_DATE },
  ];
}

/**
 * Returns the resources sorted by the selected sort order.
 * @param resources the resources to be sorted.
 * @param sortOrder the sort order.
 */
export const getSortedResources = (resources: Resource[], sortOrder: SortOrder) => {
  const resourcesToSort = [...resources];
  switch (sortOrder) {
  case SortOrder.ASC_NAME:
    return resourcesToSort.sort((a, b) => {
      if (!a.name) {return 1;}
      if (!b.name) {return -1;}
      return a.name.localeCompare(b.name);
    });
  case SortOrder.DESC_NAME:
    return resourcesToSort.sort((a, b) => {
      if (!a.name) {return 1;}
      if (!b.name) {return -1;}
      return b.name.localeCompare(a.name);
    });
  case SortOrder.ASC_DATE:
    return resourcesToSort.sort((a, b) => {
      if (!a.recordingTime) {return 1;}
      if (!b.recordingTime) {return -1;}
      return new Date(a.recordingTime).getTime() - new Date(b.recordingTime).getTime();
    });
  case SortOrder.DESC_DATE:
    return resourcesToSort.sort((a, b) => {
      if (!a.recordingTime) {return 1;}
      if (!b.recordingTime) {return -1;}
      return new Date(b.recordingTime).getTime() - new Date(a.recordingTime).getTime();
    });
  default: return resourcesToSort;
  }
}

/**
 * Sorts the data resources alphabetically and with general in the first place.
 * @param dataResource the data resources to be sorted.
 */
export const sortDataResources = (dataResource: ResourceItem[]): ResourceItem[] => {
  const dataToSort = [...dataResource];
  return dataToSort.sort((a, b) => {
    if (a.resourceItemName === 'general') {return -1;}
    if (b.resourceItemName === 'general') {return 1;}
    return a.resourceItemName.localeCompare(b.resourceItemName);
  });
};
