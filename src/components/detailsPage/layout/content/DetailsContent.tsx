import { FC, ReactNode } from 'react';

import styles from './DetailsContent.module.css';

interface IDetailsContent {
    children: ReactNode;
}

const DetailsContent: FC<IDetailsContent> = ({ children }) => {
  return (
    <div className={styles['container']}>
      {children}
    </div>
  );
};

export default DetailsContent;
