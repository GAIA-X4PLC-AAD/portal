import React from 'react';
import { useTranslation } from 'react-i18next';

import Title from '../../../common/components/fields/title/Title';

import styles from './ServiceOfferingSuitableOfferings.module.css'

const ServiceOfferingSuitableOfferings = () => {
  const { t } = useTranslation();

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>
        <Title>{t('service-offerings.suitable-offerings')}</Title>
      </div>
      <div className={styles['links']}>
      </div>
    </div>
  )
}

export default ServiceOfferingSuitableOfferings;
