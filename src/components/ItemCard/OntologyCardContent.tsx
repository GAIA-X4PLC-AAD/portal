import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import GaiaXButton from '../../common/components/buttons/GaiaXButton';
import Link from '../../common/components/fields/link/Link';
import Markdown from '../../common/components/markdown/Markdown';
import { Ontology } from '../../types/ontologies.model';

import styles from './ItemCard.module.css';

interface IOntologyCardContent {
    ontology: Ontology;
}

const OntologyCardContent: FC<IOntologyCardContent> = ({ ontology } ) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigationToDetailsPage = () => {
    const encodedUri = encodeURIComponent(ontology.subject);
    navigate(`/ontologies/details/${encodedUri}`);
  }

  return (
    <section className={styles.cardContent}>
      <Link className={styles.cardName} url={ontology.subject}/>
      {
        ontology.description && <Markdown>{ontology.description}</Markdown>
      }
      <div className={styles.buttonContainer}>
        <GaiaXButton
          className={styles.detailsButton}
          label={t('details.more-details')}
          handleOnClick={handleNavigationToDetailsPage}
        />
      </div>
    </section>
  );
}

export default OntologyCardContent;
