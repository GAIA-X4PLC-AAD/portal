import i18next from 'i18next';

import { MenuItemObject, SortOrder } from '../../../common/components/buttons/SortListButton';
import { Resource } from '../../../types/resources.model';

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

export const getResourceSortMenuItems = (): MenuItemObject[] => {
  return [
    { label: i18next.t('resources.sort-menu.a-z'), sortOrder: SortOrder.ASC_NAME },
    { label: i18next.t('resources.sort-menu.z-a'), sortOrder: SortOrder.DESC_NAME },
    // todo activate following after finding creation date in resources
    // { label: i18next.t('resources.sort-menu.new'), alias: 'ASC_DATE' },
    // { label: i18next.t('resources.sort-menu.old'), alias: 'DESC_DATE' },
  ];
}

export const getSortedResources = (resources: Resource[], sortOrder: SortOrder) => {
  switch (sortOrder) {
  case SortOrder.ASC_NAME:
    return resources.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
  case SortOrder.DESC_NAME:
    return resources.sort((a, b) => (b.name ?? '').localeCompare(a.name ?? ''));
  default: return resources;
  }
}
