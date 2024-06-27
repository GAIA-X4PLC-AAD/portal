import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Title from '../../../Title/Title';

import styles from './DetailMap.module.css';

interface IDetailMap {
    title: string;
}

const DetailMap: FC<IDetailMap> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <div className={styles['container']}>
      <Title>{t('dashboard.map')}</Title>
    </div>
  );
};

export default DetailMap;
