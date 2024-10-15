import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Title from '../../../../../Title/Title';

import styles from './ShapeSuitableOfferings.module.css';

const ShapeSuitableOfferings: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>
        <Title>{t('dashboard.suitable-offerings')}</Title>
      </div>
      <div className={styles['links']}>
      </div>
    </div>
  );
};

export default ShapeSuitableOfferings;
