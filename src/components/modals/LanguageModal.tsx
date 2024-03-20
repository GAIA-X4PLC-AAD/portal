// LanguageModal.js
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import GaiaXButton from "components/buttons/GaiaXButton";

import styles from "./LanguageModal.module.css"; // Create and import your styles

interface ILanguageModal {
  isOpen: boolean;
  onClose: () => void;
  changeLanguage: (languageCode: string) => void;
}

const LanguageModal = ({ isOpen, onClose, changeLanguage }: ILanguageModal) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h1>{t("left-menu.choose-language")}</h1>
        <p>{t("left-menu.select-system-language")}</p>
        <ul className={styles.languageList}>
          <li
            onClick={() => changeLanguage("en")}
            className={styles.languageItem}
          >
            {t("left-menu.english")}
          </li>
          <li
            onClick={() => changeLanguage("de")}
            className={styles.languageItem}
          >
            {t("left-menu.german")}
          </li>
          <li
            onClick={() => changeLanguage("es")}
            className={styles.languageItem}
          >
            {t("left-menu.spanish")}
          </li>
          <GaiaXButton label={t("left-menu.close")} handleOnClick={onClose} />
        </ul>
      </div>
    </div>
  );
};

export default LanguageModal;
