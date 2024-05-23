import { FC } from 'react';

import styles from './DetailActions.module.css';

interface IDetailActions {
    title: string;
}

const DetailActions: FC<IDetailActions> = ({ title }) => {
  return (
    <div className={styles['container']}>
    </div>
  );
};

export default DetailActions;
