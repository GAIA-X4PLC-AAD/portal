/* test coverage not required */
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import GaiaXButton from '../../../common/components/buttons/GaiaXButton';
import NotificationDialog from '../../../common/components/dialogs/NotificationDialog/NotificationDialog';
import Title from '../../../common/components/fields/title/Title';
import Vertical from '../../../common/components/layouts/Vertical';
import { getAllSelfDescriptionDetails } from '../../../helpers/selfDescriptionDataFlow';
import { SelfDescriptionDetails } from '../../../types/selfDescription.model';
import { downloadFile } from '../../../utils/fileUtils';
import { ResourceDetailsContext } from '../../context/ResourceDetailsContext';
import { useResourceBuyingStateMachine } from '../hooks/useResourceBuyingStateMachine';

import DataTransferInitiationProgress from './DataTransferInitiationProgress';
import DataTransferStatus from './DataTransferStatus';
import styles from './ResourceActions.module.css';
import ResourceBuyingModal from './ResourceBuyingModal';

const ResourceActions = () => {
  const { t } = useTranslation();
  const resourceDetails = useContext(ResourceDetailsContext)
  const [downloadButtonVisible, setDownloadButtonVisible] = useState(false);
  const [selfDescriptions, setSelfDescriptions] = useState<SelfDescriptionDetails[] | undefined>(undefined);
  const { state, dispatch } = useResourceBuyingStateMachine({
    contractId: resourceDetails?.details.contractId,
    serviceAccessPoint: resourceDetails?.details.serviceAccessPoint,
  })
  const title='Actions';

  useEffect(() => {
    if (resourceDetails?.details.claimsGraphUri) {
      getAllSelfDescriptionDetails(resourceDetails?.details.claimsGraphUri)
        .then((response) => {
          setSelfDescriptions(response);
          if (response && response.length > 0) {
            setDownloadButtonVisible(true);
          }
        });
    }
  }, [resourceDetails?.details.claimsGraphUri]);

  const handleDownload = () => {
    selfDescriptions?.forEach((selfDescription) => {
      downloadFile(selfDescription.holder, selfDescription);
    });
  }

  return (
    <Vertical className={styles.sidebarCardContainer}>
      <Title className={styles.title}>{title}</Title>
      {downloadButtonVisible && (
        <GaiaXButton
          className={styles.sideBarCardButton}
          label={t('resources.download-description')}
          handleOnClick={handleDownload}
        />
      )}
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
          title={resourceDetails?.details.name || t('service-offerings.no-title')}
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
