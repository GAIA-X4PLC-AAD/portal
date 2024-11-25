/* test coverage not required */
import Title from 'components/Title/Title';
import React from 'react';
import { useTranslation } from 'react-i18next';

import GaiaXButton from '../../../../../../common/components/buttons/GaiaXButton';

import styles from './ResourceActions.module.css';

const ResourceActions = () => {
  const { t } = useTranslation();
  const title='Actions'

  return (
    <div className={styles['sidebar-card-container']}>
      <Title>{title}</Title>
      <GaiaXButton
        label={t('resources.download-description')}
        handleOnClick={() => {}}
      />
      <GaiaXButton
        label={t('details.view-graph')}
        handleOnClick={() => {}}
      />
      <GaiaXButton
        label={t('resources.contact-provider')}
        handleOnClick={() => {}}
      />
    </div>
  );
}
export default ResourceActions;
