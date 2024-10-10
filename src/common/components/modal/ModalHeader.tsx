import React from 'react';

import styles from './ModalHeader.module.css';

interface ModalHeaderProps {
  children: React.ReactNode
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ children }) => (
  <div className={styles.modalHeader}>
    {children}
  </div>
)

export default ModalHeader;
