import { useTranslation } from "react-i18next";

export const useNavbar = () => {
  const { t } = useTranslation();

  const navbarAssets = [
    {
      path: "/service-offerings",
      navigationItemName: t("left-menu.tooltip.service-offerings"),
    },
    {
      path: "/participants",
      navigationItemName: t("left-menu.tooltip.participants"),
    },
    {
      path: "/resources",
      navigationItemName: t("left-menu.tooltip.resources"),
    },
    {
      path: "/about",
      navigationItemName: t("left-menu.about"),
    },
    {
      path: "/support",
      navigationItemName: t("left-menu.support"),
    },
  ];

  return navbarAssets;
};
