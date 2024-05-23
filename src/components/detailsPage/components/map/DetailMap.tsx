import { FC } from 'react';

import styles from './DetailMap.module.css';

interface IDetailMap {
    title: string;
}

const DetailMap: FC<IDetailMap> = ({ title }) => {
  return (
    <div className={styles['container']}>
    </div>
  );
};

export default DetailMap;
