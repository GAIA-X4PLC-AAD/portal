/* test coverage not required */
import Title from 'common/components/fields/title/Title';
import React from 'react';
import { useTranslation } from 'react-i18next';

import GaiaXButton from '../../../../../../common/components/buttons/GaiaXButton';
import Vertical from '../../../../../../common/components/layouts/Vertical';

import styles from './ResourceActions.module.css';

const ResourceActions = () => {
  const { t } = useTranslation();
  const title='Actions'

  return (
    <Vertical className={styles.sidebarCardContainer}>
      <Title className={styles.title}>{title}</Title>
      <GaiaXButton
        className={styles.sideBarCardButton}
        label={t('resources.download-description')}
        handleOnClick={() => {}}
      />
      <GaiaXButton
        className={styles.sideBarCardButton}
        label={t('details.view-graph')}
        handleOnClick={() => {}}
      />
      <GaiaXButton
        className={styles.sideBarCardButton}
        label={t('resources.contact-provider')}
        handleOnClick={() => {}}
      />
    </Vertical>
  );
}
export default ResourceActions;
