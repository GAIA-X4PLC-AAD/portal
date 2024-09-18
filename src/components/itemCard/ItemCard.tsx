import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Ontology } from '../../types/ontologies.model';
import { Shape } from '../../types/shapes.model';
import { ServiceOffering } from '../../utils/dataMapper';
import Title from '../Title/Title';

import styles from './ItemCard.module.css';
import OntologyCardContent from './OntologyCardContent';
import ServiceCardContent from './ServiceCardContent';
import ShapeCardContent from './ShapeCardContent';

interface IItemCard {
    label: string;
    isGaiaXCompliant?: boolean;
    ontology?: Ontology;
    shape?: Shape;
    service?: ServiceOffering
}

const ItemCard: FC<IItemCard> = ({ label, isGaiaXCompliant, ontology, shape, service }) => {
  const { t } = useTranslation();

  return (
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
        {ontology ? (
          <OntologyCardContent ontology={ontology} />
        ) : shape ? (
          <ShapeCardContent shape={shape} />
        ) : service ? (
          <ServiceCardContent service={service}/>
        ) : null}
      </div>
    </div>
  );
}

export default ItemCard;