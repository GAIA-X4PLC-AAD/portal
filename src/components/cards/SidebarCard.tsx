import Text from 'components/Text/Text';
import Title from 'components/Title/Title';
import GaiaXButton from 'components/buttons/GaiaXButton';
import Subtitle from 'components/subtitle/Subtitle';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ResourceDetails } from '../../types/resources.model';
import ResourceBuyingModal from '../resources/components/ResourceBuyingModal';

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
          setOpen(false)
          console.debug('transfer ...')
        }}
        onClose={() => setOpen(false)}
      />
      <div className={styles['sidebar-card-container']}>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <Text>{text}</Text>
        <GaiaXButton
          label={t('details.sidebar-buy-button')}
          handleOnClick={handleClickContactOrBuy}
          disabled={!resource.contractId}
        />
      </div>
    </>
  );
}
