import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Title from '../../../Title/Title';
import GaiaXButton from '../../../buttons/GaiaXButton';

import styles from './DetailActions.module.css';

interface IDetailActions {
    graphLink: string;
    downloadLink: string;
}

const DetailActions: FC<IDetailActions> = ({ graphLink, downloadLink }) => {
  const { t } = useTranslation();

  const visitWebsite = (url: string) => {
    return () => window.open(url, '_blank');
  }

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>
        <Title>{t('dashboard.actions')}</Title>
      </div>
      <div className={styles['buttons']}>
        <GaiaXButton label={t('details.view-graph')} handleOnClick={visitWebsite(graphLink)} width={'100%'}/>
        <GaiaXButton label={t('details.download-files')} handleOnClick={visitWebsite(downloadLink)} width={'100%'}/>
      </div>
    </div>
  );
};

export default DetailActions;
