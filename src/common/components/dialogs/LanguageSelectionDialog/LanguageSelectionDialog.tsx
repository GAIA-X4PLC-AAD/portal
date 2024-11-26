import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Title from '../../fields/title/Title';
import Modal from '../Modal/Modal';
import ModalBody from '../Modal/ModalBody';
import ModalHeader from '../Modal/ModalHeader';
import ModalXButton from '../Modal/ModalXButton';

import styles from './LanguageSelectionDialog.module.css'
import LanguageOption from './components/LanguageOption';

interface LanguageSelectionModalProps {
  isOpen: boolean;
  close: () => void;
}

const LanguageSelectionModal: FC<LanguageSelectionModalProps> = ({ isOpen, close }) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} className={styles.modal}>
      <ModalHeader>
        <Title>{t('left-menu.choose-language')}</Title>
        <ModalXButton onClose={close}/>
      </ModalHeader>

      <ModalBody className={styles.modalBody}>
        <ul className={styles.languageList}>
          <LanguageOption languageCode={'en'} onClick={close}/>
          <LanguageOption languageCode={'de'} onClick={close}/>
        </ul>
      </ModalBody>
    </Modal>
  )
}

export default LanguageSelectionModal;
