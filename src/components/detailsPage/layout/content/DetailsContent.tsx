import React, { FC, ReactNode } from 'react';

import styles from './DetailsContent.module.css';

interface IDetailsContent {
    children: ReactNode;
}

// TODO: Remove this unnecessary Component. Replace with <Vertical> or <Horizontal> component.
const DetailsContent: FC<IDetailsContent> = ({ children }) => {
  return (
    <div className={styles['container']}>
      {children}
    </div>
  );
};

export default DetailsContent;
