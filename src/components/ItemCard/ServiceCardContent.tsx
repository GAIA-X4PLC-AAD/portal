import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ServiceOffering } from '../../types/serviceOfferings.model';
import Title from '../Title/Title';
import GaiaXButton from '../buttons/GaiaXButton';

import styles from './ItemCard.module.css';

interface IServiceCardContent {
    service: ServiceOffering;
}

const ServiceCardContent: FC<IServiceCardContent> = ({ service }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigationToDetailsPage = () => {
    navigate(`/shapes/details/${service.claimsGraphUri}`);
  }

  return (
    <div className={styles.content}>
      <div style={{ textAlign: 'left' }}>
        <Title>{service.name || t('service-offerings.no-title')}</Title>
      </div>
      <p>{service.description || t('service-offerings.no-description')}</p>

      <div className={styles.button}>
        <GaiaXButton
          label={t('details.more-details')}
          handleOnClick={handleNavigationToDetailsPage}
        />
      </div>
    </div>
  );
}

export default ServiceCardContent;
