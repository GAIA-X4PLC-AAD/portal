import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import GaiaXButton from '../../common/components/buttons/GaiaXButton';
import Markdown from '../../common/components/markdown/Markdown';
import Title from '../Title/Title';
import Subtitle from '../subtitle/Subtitle';

import styles from './ItemCard.module.css';
import { ItemCardData } from './itemCardHelper';

export interface IItemCard {
    itemCardData: ItemCardData;
}

const ItemCard: FC<IItemCard> = ({ itemCardData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { label, isGaiaXCompliant, title, description, navigationUrl, testId } = itemCardData;

  const handleNavigationToDetailsPage = () => {
    navigate(navigationUrl);
  }

  return (
    <div data-testid={testId} className={styles.card}>
      <section className={styles.cardHeader}>
        <Subtitle className={styles.label}>{label}</Subtitle>
        {
          isGaiaXCompliant
            ? <Text className={styles.labelGaiaXCompliant}>{t('common.is-gaia-x-compliant')}</Text>
            : <Text className={styles.labelGaiaXCompliant}>{t('common.not-gaia-x-compliant')}</Text>
        }
      </section>

      <section className={styles.cardContent}>
        <Title className={styles.cardName}>{title}</Title>
        {
          description && <Markdown>{description}</Markdown>
        }
        <div className={styles.buttonContainer}>
          <GaiaXButton
            className={styles.detailsButton}
            label={t('details.more-details')}
            handleOnClick={handleNavigationToDetailsPage}
          />
        </div>
      </section>
    </div>
  );
}

export default ItemCard;
