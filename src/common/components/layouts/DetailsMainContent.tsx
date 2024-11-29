import React, { FC } from 'react';

import styles from './DetailsMainContent.module.css';
import Vertical from './Vertical';

interface DetailsMainContentProps {
    children?: React.ReactNode
}

const DetailsMainContent: FC<DetailsMainContentProps> = ({ children }) => {
  return (
    <Vertical className={styles.detailsMainContent}>
      {children}
    </Vertical>
  )
}

export default DetailsMainContent;
