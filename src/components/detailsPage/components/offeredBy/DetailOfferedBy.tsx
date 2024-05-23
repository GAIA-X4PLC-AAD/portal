import { FC } from 'react';

import styles from './DetailOfferedBy.module.css';

interface IDetailOfferedBy {
    title: string;
}

const DetailOfferedBy: FC<IDetailOfferedBy> = ({ title }) => {
  return (
    <div className={styles['container']}>
    </div>
  );
};

export default DetailOfferedBy;
