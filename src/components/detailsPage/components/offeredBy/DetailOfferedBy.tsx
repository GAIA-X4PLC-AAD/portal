import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Title from '../../../Title/Title';

import styles from './DetailOfferedBy.module.css';

interface IDetailOfferedBy {
    title: string;
}

const DetailOfferedBy: FC<IDetailOfferedBy> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <div className={styles['container']}>
      <Title>{t('dashboard.offered-by')}</Title>
    </div>
  );
};

export default DetailOfferedBy;
