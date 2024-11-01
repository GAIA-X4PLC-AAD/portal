import classnames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Title from '../../../../components/Title/Title';
import { AlertIcon } from '../../../styles';
import GaiaXButton from '../../buttons/GaiaXButton';
import Message from '../Message/Message';
import Modal from '../Modal/Modal';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import ModalHeader from '../Modal/ModalHeader';
import ModalXButton from '../Modal/ModalXButton';

import styles from './NotificationDialog.module.css';

interface NotificationDialogProps {
  isOpen: boolean,
  close: () => void,
  title: string,
  message: string
}

const NotificationDialog: React.FC<NotificationDialogProps> = ({
  isOpen,
  close,
  title,
  message
}) => {
  const { t } = useTranslation()

  return (
    <Modal isOpen={isOpen} className={styles.modal}>
      <ModalHeader>
        <Title>{title}</Title>
        <ModalXButton onClose={close}/>
      </ModalHeader>

      <ModalBody className={styles.modalBody}>
        <AlertIcon/> <Message>{message}</Message>
      </ModalBody>

      <ModalFooter>
        <GaiaXButton
          label={t('common.close')}
          handleOnClick={close}
          className={classnames([styles.cancelButton, styles.actionButton])}
        />
      </ModalFooter>
    </Modal>
  )
}

export default NotificationDialog
