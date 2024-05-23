import { FC } from 'react';

import styles from './DetailSuitableOfferings.module.css';

interface IDetailSuitableOfferings {
    title: string;
}

const DetailSuitableOfferings: FC<IDetailSuitableOfferings> = ({ title }) => {
  return (
    <div className={styles['container']}>
    </div>
  );
};

export default DetailSuitableOfferings;
