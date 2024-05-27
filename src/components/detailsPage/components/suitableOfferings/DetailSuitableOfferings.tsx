import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Title from '../../../Title/Title';

import styles from './DetailSuitableOfferings.module.css';

interface IDetailSuitableOfferings {
    title: string;
}

const DetailSuitableOfferings: FC<IDetailSuitableOfferings> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <div className={styles['container']}>
      <Title>{t('dashboard.suitable-offerings')}</Title>
    </div>
  );
};

export default DetailSuitableOfferings;
