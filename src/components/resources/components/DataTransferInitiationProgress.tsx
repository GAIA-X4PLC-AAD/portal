import classnames from 'classnames';
import { t } from 'i18next';
import React, { FC } from 'react';

import GaiaXButton from '../../../common/components/buttons/GaiaXButton';
import Modal from '../../../common/components/dialogs/./Modal/Modal';
import ModalFooter from '../../../common/components/dialogs/./Modal/ModalFooter';
import ModalHeader from '../../../common/components/dialogs/./Modal/ModalHeader';
import ModalXButton from '../../../common/components/dialogs/./Modal/ModalXButton';
import Message from '../../../common/components/dialogs/Message/Message';
import ModalBody from '../../../common/components/dialogs/Modal/ModalBody';
import Title from '../../Title/Title';
import { ResourceBuyingAction, ResourceBuyingState } from '../helpers/resourceBuyingStateMachine';

import styles from './DataTransferInitiationProgress.module.css';

interface ResourceBuyingModalProps {
  state: ResourceBuyingState,
  dispatch: React.Dispatch<ResourceBuyingAction>,
}

const DataTransferInitiationProgress: FC<ResourceBuyingModalProps> = ({
  state,
  dispatch,
}) => {

  return (
    <Modal
      isOpen={[
        'RETRIEVE_CONTRACT_INFORMATION',
        'CONTRACT_NEGOTIATION',
        'RETRIEVE_AGREEMENT_INFORMATION',
        'DATA_TRANSFER_INITIATION'
      ].includes(state.name)}
      className={styles.modal}
    >
      <ModalHeader>
        <Title>{t('buy-dialog.data-transfer-initiation-progress')}</Title>
        <ModalXButton onClose={() => dispatch({ type: 'CANCEL' })}/>
      </ModalHeader>

      <ModalBody className={styles.modalBody}>
        <Message className={styles.message}>{getDataTransferProgressMessage(state)}</Message>
        <progress value={getDataTransferProgress(state)} max={13} className={styles.progress}/>
      </ModalBody>

      <ModalFooter>
        <GaiaXButton
          label={t('buy-dialog.cancel-button')}
          handleOnClick={() => dispatch({ type: 'CANCEL' })}
          className={classnames([styles.cancelButton, styles.actionButton])}
        />
      </ModalFooter>
    </Modal>
  )
}

const getDataTransferProgressMessage = (state: ResourceBuyingState) => {
  switch (state.name) {

  case 'RETRIEVE_CONTRACT_INFORMATION':
    return t('buy-dialog.retrieve-contract-info')

  case 'CONTRACT_NEGOTIATION':
    return t('buy-dialog.negotiate-contract')

  case 'RETRIEVE_AGREEMENT_INFORMATION':
    if (!state.nrOfRetries) {
      return t('buy-dialog.retrieve-agreement-info')
    }
    return `${t('buy-dialog.retrieve-agreement-info')} (${state.nrOfRetries} / 10)`

  case 'DATA_TRANSFER_INITIATION':
    return t('buy-dialog.initiate-data-transfer')

  default:
    return ''
  }
}

const getDataTransferProgress = (state: ResourceBuyingState) => {
  switch (state.name) {

  case 'RETRIEVE_CONTRACT_INFORMATION':
    return 1

  case 'CONTRACT_NEGOTIATION':
    return 2

  case 'RETRIEVE_AGREEMENT_INFORMATION':
    return 3 + state.nrOfRetries;

  case 'DATA_TRANSFER_INITIATION':
    return 13

  default:
    return 0
  }
}
export default DataTransferInitiationProgress
