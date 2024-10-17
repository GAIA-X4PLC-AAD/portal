import GaiaXButton from 'common/components/buttons/GaiaXButton';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './LanguageModal.module.css';

interface ILanguageModal {
  isOpen: boolean;
  onClose: () => void;
  changeLanguage: (languageCode: string) => void;
}

const LanguageModal = ({ isOpen, onClose, changeLanguage }: ILanguageModal) => {
  const { t } = useTranslation();

  if (!isOpen) {return null;}

  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']}>
        <h1>{t('left-menu.choose-language')}</h1>
        <p>{t('left-menu.select-system-language')}</p>
        <ul className={styles['language-list']}>
          <li
            onClick={() => changeLanguage('en')}
            className={styles['language-item']}
          >
            {t('left-menu.english')}
          </li>
          <li
            onClick={() => changeLanguage('de')}
            className={styles['language-item']}
          >
            {t('left-menu.german')}
          </li>
          <GaiaXButton label={t('left-menu.close')} handleOnClick={onClose} />
        </ul>
      </div>
    </div>
  );
};

export default LanguageModal;
