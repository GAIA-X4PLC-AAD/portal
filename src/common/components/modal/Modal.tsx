import classnames from 'classnames';
import React from 'react';

import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  className: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  className,
  children
}) => {
  if (!isOpen) {
    return <></>;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={classnames([styles.modalContent, className])} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
