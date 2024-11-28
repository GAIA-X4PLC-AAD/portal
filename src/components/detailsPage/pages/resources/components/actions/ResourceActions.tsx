/* test coverage not required */
import Title from 'common/components/fields/title/Title';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import GaiaXButton from '../../../../../../common/components/buttons/GaiaXButton';
import NotificationDialog from '../../../../../../common/components/dialogs/NotificationDialog/NotificationDialog';
import Vertical from '../../../../../../common/components/layouts/Vertical';
import { ResourceDetailsContext } from '../../../../../context/ResourceDetailsContext';
import DataTransferInitiationProgress from '../../../../../resources/components/DataTransferInitiationProgress';
import DataTransferStatus from '../../../../../resources/components/DataTransferStatus';
import ResourceBuyingModal from '../../../../../resources/components/ResourceBuyingModal';
import { useResourceBuyingStateMachine } from '../../../../../resources/hooks/useResourceBuyingStateMachine';

import styles from './ResourceActions.module.css';

const ResourceActions = () => {
  const { t } = useTranslation();
  const resourceDetails = useContext(ResourceDetailsContext)
  const { state, dispatch } = useResourceBuyingStateMachine({
    contractId: resourceDetails?.contractId,
    serviceAccessPoint: resourceDetails?.serviceAccessPoint,
  })
  const title='Actions'

  return (
    <Vertical className={styles.sidebarCardContainer}>
      <Title className={styles.title}>{title}</Title>
      <GaiaXButton
        className={styles.sideBarCardButton}
        label={t('resources.download-description')}
        handleOnClick={() => {
        }}
      />
      <GaiaXButton
        className={styles.sideBarCardButton}
        label={t('details.view-graph')}
        handleOnClick={() => {
        }}
      />
      <DataTransferStatus state={state}/>
      <GaiaXButton
        className={styles.sideBarCardButton}
        label={t('details.sidebar-buy-button')}
        disabled={!['TRANSFER_ENABLED', 'FINISHED'].includes(state.name)}
        handleOnClick={() => {
          dispatch({ type: 'BUY' })
        }}
      />

      <>
        <NotificationDialog
          isOpen={state.name === 'ERROR_NOTIFICATION_DIALOG'}
          close={() => dispatch({ type: 'CLOSE' })}
          title={t('buy-dialog.data-transfer-failed')}
          message={state.name === 'ERROR_NOTIFICATION_DIALOG' ? state.message : ''}
        />
        <ResourceBuyingModal
          state={state}
          dispatch={dispatch}
          title={resourceDetails?.name || t('service-offerings.no-title')}
        />
        <DataTransferInitiationProgress
          state={state}
          dispatch={dispatch}
        />
      </>
    </Vertical>
  );
}
export default ResourceActions;
