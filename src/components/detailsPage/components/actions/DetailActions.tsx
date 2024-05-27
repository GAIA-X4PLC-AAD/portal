import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Title from '../../../Title/Title';

import styles from './DetailActions.module.css';

interface IDetailActions {
    title: string;
}

const DetailActions: FC<IDetailActions> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <div className={styles['container']}>
      <Title>{t('dashboard.actions')}</Title>
    </div>
  );
};

export default DetailActions;
