import GaiaXButton from 'common/components/buttons/GaiaXButton';
import React, { FC } from 'react';

import styles from './ModalXButton.module.css'

interface ModalXButtonProps {
  onClose: () => void;
}

const ModalXButton: FC<ModalXButtonProps> = ({ onClose }) =>
  <GaiaXButton
    className={styles.closeButton}
    handleOnClick={onClose}
  >
    &times;
  </GaiaXButton>

export default ModalXButton;