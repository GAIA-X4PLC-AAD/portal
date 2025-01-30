import { t } from 'i18next';

export const getServiceOfferingSortMenuItems = () => {
  return [
    t('service-offerings.sort-menu.a-z'),
    t('service-offerings.sort-menu.z-a'),
    t('service-offerings.sort-menu.new'),
    t('service-offerings.sort-menu.old')
  ];
}
