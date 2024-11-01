import classnames from 'classnames';
import ModalBody from 'common/components/dialogs/Modal/ModalBody';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import GaiaXButton from '../../../common/components/buttons/GaiaXButton';
import Modal from '../../../common/components/dialogs/./Modal/Modal';
import ModalFooter from '../../../common/components/dialogs/./Modal/ModalFooter';
import ModalHeader from '../../../common/components/dialogs/./Modal/ModalHeader';
import ModalXButton from '../../../common/components/dialogs/./Modal/ModalXButton';
import Title from '../../Title/Title';
import { ResourceBuyingAction, ResourceBuyingState } from '../helpers/resourceBuyingStateMachine';

import styles from './ResourceBuyingModal.module.css';

interface ResourceBuyingModalProps {
  state: ResourceBuyingState,
  dispatch: React.Dispatch<ResourceBuyingAction>,
  title: string,
}

const ResourceBuyingModal: FC<ResourceBuyingModalProps> = ({
  state,
  dispatch,
  title,
}) => {
  const { t } = useTranslation();

  const [consumerBaseUrl, setConsumerBaseUrl] = useState();
  const [account, setAccount] = useState(`${process.env.REACT_APP_DEFAULT_EDC_DESTINATION_ACCOUNT}`);
  const [container, setContainer] = useState(`${process.env.REACT_APP_DEFAULT_EDC_DESTINATION_CONTAINER}`);

  useEffect(() => {
    if (state.name === 'TRANSFER_DIALOG') {
      setConsumerBaseUrl(state.edcConsumerBaseUrl);
      setAccount(state.dataDestinationAccount);
      setContainer(state.dataDestinationContainer);
    }
  }, [state.name]);

  const submit = (event) => {
    event.preventDefault()
    if (event.target.checkValidity()) {
      dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl: consumerBaseUrl,
          dataDestinationAccount: account,
          dataDestinationContainer: container
        }
      })
    } else {
      event.target.reportValidity();
    }
  }

  return (
    <form onSubmit={submit}>
      <Modal isOpen={state.name === 'TRANSFER_DIALOG'} className={styles.modal}>
        <ModalHeader>
          <Title>{title}</Title>
          <ModalXButton onClose={() => dispatch({ type: 'CANCEL' })}/>
        </ModalHeader>

        <ModalBody>
          <label className={styles.label} htmlFor="EDC address">
            {`${t('buy-dialog.edc-address')}*`}
            <input
              className={styles.edcTextInput}
              type="text"
              name="EDC address"
              placeholder={t('buy-dialog.enter-edc-address')}
              value={consumerBaseUrl}
              onChange={(event) => setConsumerBaseUrl(event.target.value)}
              required
            />
          </label>

          <label className={styles.label} htmlFor="EDC destination account">
            {`${t('buy-dialog.edc-destination-account')}*`}
            <input
              className={styles.edcTextInput}
              type="text"
              name="EDC destination account"
              placeholder={t('buy-dialog.enter-edc-destination-account')}
              value={account}
              onChange={(event) => setAccount(event.target.value)}
              required
            />
          </label>

          <label className={styles.label} htmlFor="EDC destination container">
            {`${t('buy-dialog.edc-destination-container')}*`}
            <input
              className={styles.edcTextInput}
              type="text"
              name="EDC destination container"
              placeholder={t('buy-dialog.enter-edc-destination-container')}
              value={container}
              onChange={(event) => setContainer(event.target.value)}
              required
            />
          </label>
        </ModalBody>

        <ModalFooter>
          <GaiaXButton
            label={t('buy-dialog.transfer-button')}
            className={classnames([styles.transferButton, styles.actionButton])}
            disabled={state.name !== 'TRANSFER_DIALOG' || !state.contractId || !state.serviceAccessPoint}
            type="submit"
          />
          <GaiaXButton
            label={t('buy-dialog.cancel-button')}
            handleOnClick={() => dispatch({ type: 'CANCEL' })}
            className={classnames([styles.cancelButton, styles.actionButton])}
          />
        </ModalFooter>
      </Modal>
    </form>
  )
}

export default ResourceBuyingModal
