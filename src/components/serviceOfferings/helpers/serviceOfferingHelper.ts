import i18next from 'i18next';

import { MenuItemObject, SortOrder } from '../../../common/components/buttons/SortListButton';
import { ServiceOffering } from '../../../types/serviceOfferings.model';

export const getServiceOfferingSortMenuItems = (): MenuItemObject[] => {
  return [
    { label: i18next.t('service-offerings.sort-menu.a-z'), sortOrder: SortOrder.ASC_NAME },
    { label: i18next.t('service-offerings.sort-menu.z-a'), sortOrder: SortOrder.DESC_NAME },
    // todo activate following after finding creation date in service offerings
    // { label: i18next.t('service-offerings.sort-menu.new'), alias: 'ASC_DATE' },
    // { label: i18next.t('service-offerings.sort-menu.old'), alias: 'DESC_DATE' },
  ];
}

export const getSortedServiceOfferings = (serviceOfferings: ServiceOffering[], sortOrder: SortOrder) => {
  switch (sortOrder) {
  case SortOrder.ASC_NAME:
    return serviceOfferings.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
  case SortOrder.DESC_NAME:
    return serviceOfferings.sort((a, b) => (b.name ?? '').localeCompare(a.name ?? ''));
  default: return serviceOfferings;
  }
}
