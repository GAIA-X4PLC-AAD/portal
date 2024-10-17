import classnames from 'classnames';
import GaiaXButton from 'common/components/buttons/GaiaXButton';
import Text from 'common/components/fields/Text/Text';
import Title from 'components/Title/Title';
import { useTransferState } from 'components/resources/hooks/useTransferState';
import Subtitle from 'components/subtitle/Subtitle';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ResourceDetails } from '../../types/resources.model';
import ResourceBuyingModal from '../resources/components/ResourceBuyingModal';
import { resourceDataTransfer } from '../resources/helpers/resourceDataFlow';

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
  const [isOpen, setOpen] = useState(false);
  const { isVisible, transferState, startMonitoring } = useTransferState();

  const handleClickContactOrBuy = () => {
    setOpen(true);
  };

  return (
    <>
      <ResourceBuyingModal
        isOpen={isOpen}
        title={resource.name}
        resourceDetails={resource}
        onTransfer={(transferInput) => {
          resourceDataTransfer(transferInput)
            .then((transferProcessInformation) => {
              startMonitoring(transferInput, transferProcessInformation)
            })
            .catch(() => {
              console.debug('error')
            })
            .finally(() => setOpen(false))

        }}
        onClose={() => setOpen(false)}
      />
      <div className={styles['sidebar-card-container']}>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <Text>{text}</Text>
        <Text className={styles.transferStateLabel} visible={isVisible}>{t('buy-dialog.transfer-state')}</Text>
        <Text className={styles.transferState} visible={isVisible}>
          <span className={styles.transferStateValue}>{`${transferState}`}</span>
        </Text>
        <GaiaXButton
          className={classnames([styles.buyButton])}
          label={t('details.sidebar-buy-button')}
          handleOnClick={handleClickContactOrBuy}
          disabled={!resource.contractId || !!transferState}
        />
      </div>
    </>
  );
}
