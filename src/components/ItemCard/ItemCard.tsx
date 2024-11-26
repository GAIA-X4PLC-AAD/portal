/* test coverage not required */
import classNames from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Subtitle from '../../common/components/fields/subtitle/Subtitle';
import Text from '../../common/components/fields/text/Text';
import { Ontology } from '../../types/ontologies.model';
import { Participant } from '../../types/participants.model';
import { Resource } from '../../types/resources.model';
import { ServiceOffering } from '../../types/serviceOfferings.model';
import { Shape } from '../../types/shapes.model';

import styles from './ItemCard.module.css';
import OntologyCardContent from './OntologyCardContent';
import ParticipantCardContent from './ParticipantCardContent';
import ResourceCardContent from './ResourceCardContent';
import ServiceCardContent from './ServiceCardContent';
import ShapeCardContent from './ShapeCardContent';

interface IItemCard {
    label: string;
    isGaiaXCompliant?: boolean;
    ontology?: Ontology;
    shape?: Shape;
    service?: ServiceOffering
    resource?: Resource,
    participant?: Participant
}

const ItemCard: FC<IItemCard> = ({
  label,
  isGaiaXCompliant,
  ontology,
  shape,
  service,
  resource,
  participant
}) => {
  const { t } = useTranslation();

  return (
    <div data-testid={getTestId({ ontology, shape, service, resource, participant })}
      className={classNames(styles.card, 'item-card')}>
      <section className={styles.cardHeader}>
        <Subtitle className={styles.label}>{label}</Subtitle>
        {
          isGaiaXCompliant
            ? <Text className={styles.labelGaiaXCompliant}>{t('common.is-gaia-x-compliant')}</Text>
            : <Text className={styles.labelGaiaXCompliant}>{t('common.not-gaia-x-compliant')}</Text>
        }
      </section>
      <>
        {ontology ? (
          <OntologyCardContent ontology={ontology}/>
        ) : shape ? (
          <ShapeCardContent shape={shape}/>
        ) : service ? (
          <ServiceCardContent service={service}/>
        ) : resource ? (
          <ResourceCardContent resource={resource}/>
        ) : participant ? (
          <ParticipantCardContent participant={participant}/>
        ) : (
          <></>
        )}
      </>
    </div>
  );
}

export default ItemCard;

const getTestId = ({ ontology, shape, service, resource, participant }:
                       {
                           ontology?: Ontology,
                           shape?: Shape,
                           service?: ServiceOffering,
                           resource?: Resource,
                           participant?: Participant
                       }) => (
  ontology
    ? 'Card:' + ontology.subject
    : shape
      ? 'Card:' + shape.shaclShapeName
      : service
        ? 'Card:' + service.uri + ':' + service.name
        : resource
          ? 'Card:' + resource.uri + ':' + resource.name
          : participant
            ? 'Card:' + participant.legalName
            : ''
)
