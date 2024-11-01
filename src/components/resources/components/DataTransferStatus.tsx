import React from 'react';
import { useTranslation } from 'react-i18next';

import Text from '../../../common/components/fields/Text/Text';
import { ResourceBuyingState } from '../helpers/resourceBuyingStateMachine';

import styles from './DataTransferStatus.module.css';

interface DataTransferStatusProps {
  state: ResourceBuyingState
}

const DataTransferStatus: React.FC<DataTransferStatusProps> = ({ state }) => {
  const { t } = useTranslation();
  return (
    <>
      <Text className={styles.transferStateLabel}
        visible={[
          'CHECKING_DATA_TRANSFER_STATUS',
          'DISPLAY_DATA_TRANSFER_STATUS',
          'FINISHED'
        ].includes(state.name)}>
        {t('buy-dialog.transfer-state')}
      </Text>
      <Text className={styles.transferState}
        visible={[
          'CHECKING_DATA_TRANSFER_STATUS',
          'DISPLAY_DATA_TRANSFER_STATUS',
          'FINISHED'
        ].includes(state.name)}>
        <span className={styles.transferStateValue}>
          {`${'status' in state ? state.status : ''}`}
        </span>
      </Text>
    </>
  )
}

export default DataTransferStatus
