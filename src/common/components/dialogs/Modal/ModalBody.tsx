import React from 'react';

import styles from './ModalBody.module.css';

interface ModalBodyProps {
  children: React.ReactNode
}

const ModalBody: React.FC<ModalBodyProps> = ({ children }) => (
  <div className={styles.modalBody}>
    {children}
  </div>
)

export default ModalBody;
