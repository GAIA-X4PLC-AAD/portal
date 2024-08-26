import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import car from '../../assets/car.gif';

import styles from './LoadingIndicator.css';

interface ILoadingIndicator {
    visible: boolean
}

const LoadingIndicator: FC<ILoadingIndicator> = ({ visible }) => {
  const { t } = useTranslation()

  if (visible) {
    return (
      <div className={styles.newCarLoader}>
        <img src={car} alt={t('common.is-loading')} className={'car'}/>
      </div>
    )
  }
  return <></>
}

export default LoadingIndicator
