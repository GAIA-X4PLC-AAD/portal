import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Ontology } from '../../types/ontologies.model';
import { Resource } from '../../types/resources.model';
import { ServiceOffering } from '../../types/serviceOfferings.model';
import { Shape } from '../../types/shapes.model';
import Title from '../Title/Title';

import styles from './ItemCard.module.css';
import OntologyCardContent from './OntologyCardContent';
import ResourceCardContent from './ResourceCardContent';
import ServiceCardContent from './ServiceCardContent';
import ShapeCardContent from './ShapeCardContent';

interface IItemCard {
    label: string;
    isGaiaXCompliant?: boolean;
    ontology?: Ontology;
    shape?: Shape;
    service?: ServiceOffering
    resource?: Resource
}

const ItemCard: FC<IItemCard> = ({
  label,
  isGaiaXCompliant,
  ontology,
  shape,
  service,
  resource
}) => {
  const { t } = useTranslation();

  return (
    <div data-testid={getTestId({ ontology, shape, service, resource })} className={styles.card}>
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
        {ontology ? (
          <OntologyCardContent ontology={ontology} />
        ) : shape ? (
          <ShapeCardContent shape={shape} />
        ) : service ? (
          <ServiceCardContent service={service}/>
        ) : resource ? (
          <ResourceCardContent resource={resource}/>
        ) : (
          <></>
        )}
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
