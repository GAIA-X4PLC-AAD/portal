import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Title from '../../../Title/Title';

import styles from './DetailSuitableDataOfferings.module.css';

interface IDetailSuitableDataOfferings {
    title: string;
}

const DetailSuitableDataOfferings: FC<IDetailSuitableDataOfferings> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <div className={styles['container']}>
      <Title>{t('dashboard.suitable-data-offerings')}</Title>
    </div>
  );
};

export default DetailSuitableDataOfferings;
