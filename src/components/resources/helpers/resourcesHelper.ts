import { t } from 'i18next';

import { menuItem } from '../../../common/components/buttons/SortListButton';
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

export const getResourceSortMenuItems = (): menuItem[] => {
  return [
    { label: t('resources.sort-menu.a-z'), alias: 'ASC_NAME' },
    { label: t('resources.sort-menu.z-a'), alias: 'DESC_NAME' },
    // todo activate following after finding creation date in resources
    // { label: t('resources.sort-menu.new'), alias: 'ASC_DATE' },
    // { label: t('resources.sort-menu.old'), alias: 'DESC_DATE' },
  ];
}
