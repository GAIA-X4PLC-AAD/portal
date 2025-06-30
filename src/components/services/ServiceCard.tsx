import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import GaiaXButton from '../../common/components/buttons/GaiaXButton';
import Title from '../../common/components/fields/title/Title';
import Markdown from '../../common/components/markdown/Markdown';
import { Service } from '../../types/services.model';

import styles from './ServiceCard.module.css';

export interface IServiceCard {
    serviceCardData: Service;
}

const ServiceCard: FC<IServiceCard> = ({ serviceCardData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { serviceId, name, descriptionShort, descriptionLong, imageUrl, price, navigationUrl } = serviceCardData;

  const handleNavigationToServicePage = () => {
    navigate('/services/' + serviceId);
  }

  return (
    <div className={styles.card}>
      <section className={styles.cardHeader}>
        <img src={imageUrl} alt={name} className={styles.cardImage} />
      </section>

      <section className={styles.cardContent}>
        <Title className={styles.cardName}>{name}</Title>
        <Markdown>{descriptionShort}</Markdown>
        <Markdown>{'Preis: ' + price}</Markdown>

        <div className={styles.buttonContainer}>
          <GaiaXButton
            className={styles.detailsButton}
            label={t('services.to-service')}
            handleOnClick={handleNavigationToServicePage}
          />
        </div>
      </section>
    </div>
  );
}

export default ServiceCard;
