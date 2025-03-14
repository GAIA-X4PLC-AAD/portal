import React from 'react';
import { useTranslation } from 'react-i18next';

import Text from '../../../common/components/fields/././text/Text';
import { ResourceBuyingState } from '../helpers/resourceBuyingStateMachine';

import styles from './DataTransferStatus.module.css';

interface DataTransferStatusProps {
  state: ResourceBuyingState
}

const DataTransferStatus: React.FC<DataTransferStatusProps> = ({ state }) => {
  const { t } = useTranslation();

  if (state.name === 'CHECKING_DATA_TRANSFER_STATUS' || state.name === 'FINISHED') {
    return (
      <div className={styles.transferStateContainer}>
        <Text className={styles.transferStateLabel}>
          {t('buy-dialog.transfer-state')}
        </Text>
        <Text className={styles.transferStateValue}>
          {`${state.status}`}
        </Text>
      </div>)
  }
  return <></>
}

export default DataTransferStatus
