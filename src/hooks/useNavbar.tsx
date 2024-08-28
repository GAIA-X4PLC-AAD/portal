import { useTranslation } from 'react-i18next';

export const useNavbar = () => {
  const { t } = useTranslation();

  return [
    // These were commented out for the Hannover Fair - they will be added back later
    // {
    //   path: "/service-offerings",
    //   navigationItemName: t("left-menu.tooltip.service-offerings"),
    // },
    // {
    //   path: "/participants",
    //   navigationItemName: t("left-menu.tooltip.participants"),
    // },
    {
      path: '/resources',
      navigationItemName: t('left-menu.tooltip.resources'),
    },
    {
      path: '/about',
      navigationItemName: t('left-menu.about'),
    },
    {
      path: '/ontologies',
      navigationItemName: t('ontologies.titles'),
    },
    {
      path: '/shapes',
      navigationItemName: t('shapes.titles'),
    },
    {
      path: '/support',
      navigationItemName: t('left-menu.support'),
    },
  ];
};
