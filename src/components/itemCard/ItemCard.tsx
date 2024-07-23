import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Resource } from '../../types/resources.model';
import { Ontology, Shape } from '../../types/shapesAndOntologies.model';
import Title from '../Title/Title';

import styles from './ItemCard.module.css';
import OntologyCardContent from './content/OntologyCardContent';
import ResourceCardContent from './content/ResourceCardContent';
import ShapeCardContent from './content/ShapeCardContent';

interface IItemCard {
    label: string;
    isGaiaXCompliant?: boolean;
    ontology?: Ontology;
    shape?: Shape;
    resource?: Resource;
}

const ItemCard: FC<IItemCard> = ({ label, isGaiaXCompliant, ontology, shape, resource }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <div className={styles.label}>
        <Title>{label}</Title>
        {isGaiaXCompliant === undefined ? null : (
          isGaiaXCompliant ? (
            <p>{t('resources.is-gaia-x-compliant')}</p>
          ) : (
            <p>{t('resources.not-gaia-x-compliant')}</p>
          )
        )}
      </div>
      <div className={styles.content}>
        {ontology ? (
          <OntologyCardContent ontology={ontology} />
        ) : shape ? (
          <ShapeCardContent shape={shape} />
        ) : resource ? (
          <ResourceCardContent resource={resource} />
        ) :null}
      </div>
    </div>
  );
}

export default ItemCard;
