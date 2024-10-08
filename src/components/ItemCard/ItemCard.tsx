import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Markdown from '../../common/markdown/Markdown';
import { Ontology } from '../../types/ontologies.model';
import { Resource } from '../../types/resources.model';
import { ServiceOffering } from '../../types/serviceOfferings.model';
import { Shape } from '../../types/shapes.model';
import Title from '../Title/Title';
import GaiaXButton from '../buttons/GaiaXButton';

import styles from './ItemCard.module.css';
import { ItemCardData } from './itemCardHelper';

interface IItemCard {
    itemCardData: ItemCardData;
}

const ItemCard: FC<IItemCard> = ({ itemCardData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { label, isGaiaXCompliant, title, description, navigationUrl } = itemCardData;

  const handleNavigationToDetailsPage = () => {
    navigate(navigationUrl);
  }

  return (
    // <div data-testid={getTestId({ ontology, shape, service, resource })} className={classNames(styles.card, 'item-card')}>
    <div className={styles.card}>
      <div className={styles.label}>
        <Title>{label}</Title>
        {isGaiaXCompliant === undefined ? null : (
          isGaiaXCompliant ? (
            <p>{t('common.is-gaia-x-compliant')}</p>
          ) : (
            <p>{t('common.not-gaia-x-compliant')}</p>
          )
        )}
      </div>
      <div className={styles.content}>
        <div style={{ textAlign: 'left' }}>
          <Title>{title}</Title>
        </div>
        <Markdown>{description}</Markdown>
        <div className={styles.button}>
          <GaiaXButton
            label={t('details.more-details')}
            handleOnClick={handleNavigationToDetailsPage}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemCard;

const getTestId = ({ ontology, shape, service, resource }:
                       {
                           ontology?: Ontology,
                           shape?: Shape,
                           service?: ServiceOffering,
                           resource?: Resource
                       }) => (
  ontology
    ? 'Card:' + ontology.subject
    : shape
      ? 'Card:' + shape.shaclShapeName
      : service
        ? 'Card:' + service.uri + ':' + service.name
        : resource
          ? 'Card:' + resource.uri + ':' + resource.name
          : ''
)
