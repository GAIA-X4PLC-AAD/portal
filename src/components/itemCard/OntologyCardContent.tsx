import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Ontology } from '../../types/shapesAndOntologies.model';
import Title from '../Title/Title';
import GaiaXButton from '../buttons/GaiaXButton';

import styles from './ItemCard.module.css';

interface IOntologyCardContent {
    ontology: Ontology;
}

const OntologyCardContent: FC<IOntologyCardContent> = ({ ontology } ) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigationToDetailsPage = () => {
    const encodedUri = encodeURIComponent(ontology.subject);
    navigate(`/shapesAndOntologies/details/${encodedUri}`);
  }

  return (
    <div className={styles.content}>
      <div style={{ textAlign: 'left' }}>
        <Title>{ontology.subject}</Title>
      </div>
      <p>{ontology.description}</p>
      <div className={styles.button}>
        <GaiaXButton
          label={t('details.more-details')}
          handleOnClick={handleNavigationToDetailsPage}
        />
      </div>
    </div>
  );
}

export default OntologyCardContent;
