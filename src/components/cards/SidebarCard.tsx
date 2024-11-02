import classnames from 'classnames';
import GaiaXButton from 'common/components/buttons/GaiaXButton';
import Text from 'common/components/fields/Text/Text';
import Title from 'components/Title/Title';
import Subtitle from 'components/subtitle/Subtitle';
import React from 'react';
import { useTranslation } from 'react-i18next';

import NotificationDialog from '../../common/components/dialogs/NotificationDialog/NotificationDialog';
import { ResourceDetails } from '../../types/resources.model';
import DataTransferInitiationProgress from '../resources/components/DataTransferInitiationProgress';
import DataTransferStatus from '../resources/components/DataTransferStatus';
import ResourceBuyingModal from '../resources/components/ResourceBuyingModal';
import { useResourceBuyingStateMachine } from '../resources/hooks/useResourceBuyingStateMachine';

import styles from './SidebarCard.module.css';

interface ISidebarCard {
  title: string;
  subtitle: string;
  text: string;
  resource: ResourceDetails;
}

export default function SidebarCard({
  title,
  subtitle,
  text,
  resource
}: Readonly<ISidebarCard>) {
  const { t } = useTranslation();
  const { state, dispatch } = useResourceBuyingStateMachine({
    contractId: resource.contractId,
    serviceAccessPoint: resource.serviceAccessPoint,
  });

  const handleClickBuyButton = () => {
    dispatch({ type: 'BUY' })
  };

  return (
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
        title={resource.name}
      />
      <DataTransferInitiationProgress
        state={state}
        dispatch={dispatch}
      />
      <div className={styles['sidebar-card-container']}>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <Text>{text}</Text>
        <DataTransferStatus state={state}/>
        <GaiaXButton
          className={classnames([styles.buyButton])}
          label={t('details.sidebar-buy-button')}
          handleOnClick={handleClickBuyButton}
          disabled={!['TRANSFER_ENABLED', 'FINISHED'].includes(state.name)}
        />
      </div>
    </>
  );
}
