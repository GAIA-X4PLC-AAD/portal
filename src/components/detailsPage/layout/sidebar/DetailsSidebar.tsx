import { FC, ReactNode } from 'react';

import styles from './DetailsSidebar.module.css';

interface IDetailsSidebar {
    children: ReactNode;

}

const DetailsSidebar: FC<IDetailsSidebar> = ({ children }) => {
  return (
    <div className={styles['container']}>
      {children}
    </div>
  );
}

export default DetailsSidebar;
