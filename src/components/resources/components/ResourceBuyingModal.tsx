import classnames from 'classnames';
import ModalBody from 'common/components/modal/ModalBody';
import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ResourceDetails } from 'types/resources.model';

import Modal from '../../../common/components/modal/Modal';
import ModalFooter from '../../../common/components/modal/ModalFooter';
import ModalHeader from '../../../common/components/modal/ModalHeader';
import ModalXButton from '../../../common/components/modal/ModalXButton';
import { DataTransferInputProps } from '../../../types/edc.model';
import Title from '../../Title/Title';
import GaiaXButton from '../../buttons/GaiaXButton';

import styles from './ResourceBuyingModal.module.css';

interface ResourceBuyingModalProps {
  isOpen: boolean,
  title: string,
  resourceDetails: ResourceDetails,
  onTransfer: (props: DataTransferInputProps) => void,
  onClose: () => void,
}

const ResourceBuyingModal: FC<ResourceBuyingModalProps> = ({
  isOpen,
  title,
  resourceDetails,
  onTransfer,
  onClose
}) => {
  const { t } = useTranslation();

  const producerBaseUrl = useMemo(() => {
    const protocol = resourceDetails.serviceAccessPoint ? resourceDetails.serviceAccessPoint.protocol : '';
    const host = resourceDetails.serviceAccessPoint ? resourceDetails.serviceAccessPoint.host.replace(/\/$/, '') : '';
    return `${protocol}://${host}`
  }, []);
  const [consumerBaseUrl, setConsumerBaseUrl] = useState(`${process.env.REACT_APP_DEFAULT_EDC_CONSUMER.replace(/\/$/, '')}`);
  const [container, setContainer] = useState(`${process.env.REACT_APP_DEFAULT_EDC_DESTINATION_CONTAINER}`);
  const [account, setAccount] = useState(`${process.env.REACT_APP_DEFAULT_EDC_DESTINATION_ACCOUNT}`);

  const submit = (event) => {
    console.debug('onTransfer has been called')
    event.preventDefault()
    if (event.target.checkValidity()) {
      onTransfer({
        contractId: resourceDetails.contractId || '',
        edc: {
          consumerBaseUrl,
          producerBaseUrl
        },
        dataDestination: {
          container,
          account
        }
      })
    } else {
      event.target.reportValidity();
    }
  }

  return (
    <form onSubmit={submit}>
      <Modal isOpen={isOpen} className={styles.modal}>
        <ModalHeader>
          <Title>{title}</Title>
          <ModalXButton onClose={onClose}/>
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
            type="submit"
          />
          <GaiaXButton
            label={t('buy-dialog.cancel-button')}
            handleOnClick={onClose}
            className={classnames([styles.cancelButton, styles.actionButton])}
          />
        </ModalFooter>
      </Modal>
    </form>
  )
}

export default ResourceBuyingModal
