import { FC } from 'react';

import styles from './DetailSuitableDataOfferings.module.css';

interface IDetailSuitableDataOfferings {
    title: string;
}

const DetailSuitableDataOfferings: FC<IDetailSuitableDataOfferings> = ({ title }) => {
  return (
    <div className={styles['container']}>
    </div>
  );
};

export default DetailSuitableDataOfferings;
