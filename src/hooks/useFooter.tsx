import { useTranslation } from 'react-i18next';

export const useFooter = () => {
  const { t } = useTranslation();

  return [
    {
      path: 'https://www.msg.group/en/privacy',
      navigationItemName: t('links.privacy'),
    },
    {
      path: 'https://www.msg.group/en/imprint',
      navigationItemName: t('links.imprint'),
    },
  ];
};
