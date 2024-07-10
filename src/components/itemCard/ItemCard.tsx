import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Ontology, Shape } from '../../types/shapesAndOntologies.model';
import Title from '../Title/Title';

import styles from './ItemCard.module.css';
import OntologyCardContent from './OntologyCardContent';
import ShapeCardContent from './ShapeCardContent';

interface IItemCard {
    label: string;
    isGaiaXCompliant?: boolean;
    ontology?: Ontology;
    shape?: Shape;
}

const ItemCard: FC<IItemCard> = ({ label, isGaiaXCompliant, ontology, shape }) => {
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
      <div>
        {ontology ? (
          <OntologyCardContent ontology={ontology} />
        ) : shape ? (
          <ShapeCardContent shape={shape} />
        ) : null}
      </div>
    </div>
  );
}

export default ItemCard;
