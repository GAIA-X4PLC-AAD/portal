import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Title from '../../../../components/Title/Title';
import GaiaXButton from '../../buttons/GaiaXButton';
import Modal from '../Modal/Modal';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
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
          <LanguageOption languageCode={'en'}/>
          <LanguageOption languageCode={'de'}/>
        </ul>
      </ModalBody>

      <ModalFooter className={styles.modalFooter}>
        <GaiaXButton label={t('left-menu.close')} handleOnClick={close}/>
      </ModalFooter>
    </Modal>
  )
}

export default LanguageSelectionModal;
