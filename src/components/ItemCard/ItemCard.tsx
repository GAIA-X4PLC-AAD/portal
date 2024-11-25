import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import GaiaXButton from '../../common/components/buttons/GaiaXButton';
import Markdown from '../../common/components/markdown/Markdown';
import Title from '../Title/Title';

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
      <div className={styles.label}>
        <Title>{label}</Title>
        {
          isGaiaXCompliant
            ? <p>{t('common.is-gaia-x-compliant')}</p>
            : <p>{t('common.not-gaia-x-compliant')}</p>
        }
      </div>
      <div className={styles.content}>
        <section className={styles.content}>
          <Title>{title}</Title>
          {
            description && <Markdown>{description}</Markdown>
          }
          <div className={styles.button}>
            <GaiaXButton
              label={t('details.more-details')}
              handleOnClick={handleNavigationToDetailsPage}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default ItemCard;
