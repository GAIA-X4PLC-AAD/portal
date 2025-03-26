import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import GaiaXButton from '../../../common/components/buttons/GaiaXButton';
import Title from '../../../common/components/fields/title/Title';
import Vertical from '../../../common/components/layouts/Vertical';
import { getAllSelfDescriptionDetails } from '../../../helpers/selfDescriptionDataFlow';
import { SelfDescriptionDetails } from '../../../types/selfDescription.model';
import { downloadFile } from '../../../utils/fileUtils';
import { ServiceOfferingDetailsContext } from '../../context/ServiceOfferingDetailsContext';

import styles from './ServiceOfferingActions.module.css';

const ServiceOfferingActions = () => {
  const { t } = useTranslation();
  const serviceOfferingDetails = useContext(ServiceOfferingDetailsContext)
  const [downloadButtonVisible, setDownloadButtonVisible] = useState(false);
  const [selfDescriptions, setSelfDescriptions] = useState<SelfDescriptionDetails[] | undefined>(undefined);
  const title = 'Actions'

  useEffect(() => {
    if (serviceOfferingDetails.serviceOfferingDetails?.claimsGraphUri) {
      getAllSelfDescriptionDetails(serviceOfferingDetails.serviceOfferingDetails?.claimsGraphUri)
        .then((response) => {
          setSelfDescriptions(response);
          if (response && response.length > 0) {
            setDownloadButtonVisible(true);
          }
        });
    }
  }, [serviceOfferingDetails.serviceOfferingDetails?.claimsGraphUri]);

  const handleDownload = () => {
    selfDescriptions?.forEach((selfDescription) => {
      downloadFile(selfDescription.holder, selfDescription);
    });
  }

  return (<Vertical className={styles.sidebarCardContainer}>
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
    <GaiaXButton
      className={styles.sideBarCardButton}
      label={t('details.sidebar-buy-button')}
      handleOnClick={() => {
      }}
    />
  </Vertical>)
}

export default ServiceOfferingActions;
