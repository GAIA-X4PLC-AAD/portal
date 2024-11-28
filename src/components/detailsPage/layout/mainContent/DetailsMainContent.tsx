import React, { FC, ReactNode } from 'react';

import styles from './DetailsMainContent.module.css';

interface IDetailsMainContent {
    children: ReactNode;
}

// TODO: Remove this unnecessary Component. Replace with <Vertical> or <Horizontal> component.
const DetailsMainContent: FC<IDetailsMainContent> = ({ children }) => {
  return (
    <div className={styles['container']}>
      {children}
    </div>
  );
};

export default DetailsMainContent;
