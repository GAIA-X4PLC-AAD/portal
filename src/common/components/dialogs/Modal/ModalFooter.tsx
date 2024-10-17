import React from 'react';

import styles from './ModalFooter.module.css';

interface ModalFooterProps {
  children: React.ReactNode
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => (
  <div className={styles.modalFooter}>
    {children}
  </div>
)

export default ModalFooter;
