import i18next from 'i18next';

import { MenuItemObject, SortOrder } from '../../../common/components/buttons/SortListButton';
import { ServiceOffering } from '../../../types/serviceOfferings.model';

export const getServiceOfferingSortMenuItems = (): MenuItemObject[] => {
  return [
    { label: i18next.t('service-offerings.sort-menu.a-z'), sortOrder: SortOrder.ASC_NAME },
    { label: i18next.t('service-offerings.sort-menu.z-a'), sortOrder: SortOrder.DESC_NAME },
    { label: i18next.t('service-offerings.sort-menu.new'), sortOrder: SortOrder.DESC_DATE },
    { label: i18next.t('service-offerings.sort-menu.old'), sortOrder: SortOrder.ASC_DATE },
  ];
}

export const getSortedServiceOfferings = (serviceOfferings: ServiceOffering[], sortOrder: SortOrder) => {
  const offeringsToSort = [...serviceOfferings];
  switch (sortOrder) {
  case SortOrder.ASC_NAME:
    return offeringsToSort.sort((a, b) => {
      if (!a.name) {return 1;}
      if (!b.name) {return -1;}
      return a.name.localeCompare(b.name);
    });
  case SortOrder.DESC_NAME:
    return offeringsToSort.sort((a, b) => {
      if (!a.name) {return 1;}
      if (!b.name) {return -1;}
      return b.name.localeCompare(a.name);
    });
  case SortOrder.ASC_DATE:
    return offeringsToSort.sort((a, b) => {
      if (!a.recordingTime) {return 1;}
      if (!b.recordingTime) {return -1;}
      return new Date(a.recordingTime).getTime() - new Date(b.recordingTime).getTime();
    });
  case SortOrder.DESC_DATE:
    return offeringsToSort.sort((a, b) => {
      if (!a.recordingTime) {return 1;}
      if (!b.recordingTime) {return -1;}
      return new Date(b.recordingTime).getTime() - new Date(a.recordingTime).getTime();
    });
  default: return offeringsToSort;
  }
}
