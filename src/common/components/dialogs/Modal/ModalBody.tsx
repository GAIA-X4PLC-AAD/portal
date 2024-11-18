import classnames from 'classnames';
import React from 'react';

import styles from './ModalBody.module.css';

interface ModalBodyProps {
  className?: string
  children: React.ReactNode
}

const ModalBody: React.FC<ModalBodyProps> = ({ className, children }) => (
  <div className={classnames([className, styles.modalBody])}>
    {children}
  </div>
)

export default ModalBody;
