import classnames from 'classnames';
import React from 'react';

import styles from './ModalFooter.module.css';

interface ModalFooterProps {
  className?: string
  children: React.ReactNode
}

const ModalFooter: React.FC<ModalFooterProps> = ({ className, children }) => (
  <div className={classnames([className, styles.modalFooter])}>
    {children}
  </div>
)

export default ModalFooter;
