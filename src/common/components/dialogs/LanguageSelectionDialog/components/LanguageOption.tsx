import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import i18n from '../../../../../i18n';

import styles from './LanguageOption.module.css';

const changeLanguage = (languageCode: string) => {
  i18n.changeLanguage(languageCode);
};

interface LanguageOptionProps {
  languageCode: string;
  onClick: () => void;
}

const LanguageOption: FC<LanguageOptionProps> = ({ languageCode, onClick }) => {
  const { t } = useTranslation();

  return (
    <li onClick={() => {
      onClick();
      changeLanguage(languageCode);
    }} className={styles.languageItem}>
      {t(`left-menu.${languageCode}`)}
    </li>
  )
}

export default LanguageOption;
