import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import car from '../../assets/car.gif';

import styles from './LoadingIndicator.css';

interface ILoadingIndicator {
    isLoading: boolean
}

const LoadingIndicator: FC<ILoadingIndicator> = ({ isLoading }) => {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className={styles.newCarLoader}>
        <img src={car} alt={t('common.is-loading')} className={'car'}/>
      </div>
    )
  }
  return <></>
}

export default LoadingIndicator
