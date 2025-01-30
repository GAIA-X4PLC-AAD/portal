import { t } from 'i18next';

import { menuItem } from '../../../common/components/buttons/SortListButton';

export const getServiceOfferingSortMenuItems = (): menuItem[] => {
  return [
    { label: t('service-offerings.sort-menu.a-z'), alias: 'ASC_NAME' },
    { label: t('service-offerings.sort-menu.z-a'), alias: 'DESC_NAME' },
    // todo activate following after finding creation date in service offerings
    // { label: t('service-offerings.sort-menu.new'), alias: 'ASC_DATE' },
    // { label: t('service-offerings.sort-menu.old'), alias: 'DESC_DATE' },
  ];
}

export type ServiceOfferingSortOrder = 'ASC_NAME' | 'DESC_NAME' | 'ASC_DATE' | 'DESC_DATE';
