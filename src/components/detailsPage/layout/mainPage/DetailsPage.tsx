import React, { FC, ReactNode } from 'react';

import styles from './DetailsPage.module.css';

interface IDetailsPage {
    children: ReactNode;
}

const DetailsPage: FC<IDetailsPage> = ({ children }) => {
  return (
    <div className={styles['container']}>
      {children}
    </div>
  );
};

export default DetailsPage;
