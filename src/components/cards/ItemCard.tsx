import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Ontology } from '../../types/shapesAndOntologies.model';
import Title from '../Title/Title';
import GaiaXButton from '../buttons/GaiaXButton';

import styles from './ItemCard.module.css';

interface IItemCard {
    label: string;
    isGaiaXComlpiant?: boolean;
    ontology: Ontology;
}

enum detailRoutes {
    shapesAndOntologies = '/shapesAndOntologies/details/',
}

const ItemCard: FC<IItemCard> = ({ label, isGaiaXComlpiant, ontology }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigationToDetailsPage = () => {
    const encodedUri = encodeURIComponent(ontology.subject);
    navigate(`${detailRoutes.shapesAndOntologies}${encodedUri}`);
  }

  return (
    <div className={styles.card}>
      <div className={styles.label}>
        <Title>{label}</Title>
        {isGaiaXComlpiant === undefined ? null : (
          isGaiaXComlpiant ? (
            <p>{t('resources.is-gaia-x-compliant')}</p>
          ) : (
            <p>{t('resources.not-gaia-x-compliant')}</p>
          )
        )}
      </div>
      <div className={styles.content}>
        <Title>{ontology.subject}</Title>
        <p>{ontology.description}</p>
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
