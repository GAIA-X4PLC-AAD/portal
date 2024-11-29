import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import GaiaXButton from '../../../common/components/buttons/GaiaXButton';
import Title from '../../../common/components/fields/title/Title';
import { downloadTurtleFile } from '../../../services/schemaService.utils';
import { OntologyContext } from '../../context/OntologyContext';

import styles from './OntologyActions.module.css';

// eslint-disable-next-line no-unused-vars
enum graphRoutes {
  // eslint-disable-next-line no-unused-vars
    shapesAndOntologies = '/shapesAndOntologies/graph/',
}

const OntologyActions: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const ontology = useContext(OntologyContext);
  if (!ontology) {
    return <div>{t('ontologies.not-found')}</div>;
  }

  const handleNavigationToGraphPage = () => {
    const encodedUri = encodeURIComponent(ontology.subject);
    navigate(`${graphRoutes.shapesAndOntologies}${encodedUri}`);
  }

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>
        <Title>{t('dashboard.actions')}</Title>
      </div>
      <div className={styles['buttons']}>
        <GaiaXButton label={t('details.view-graph')} handleOnClick={() => handleNavigationToGraphPage()}/>
        <GaiaXButton label={t('details.download-file')} handleOnClick={() => downloadTurtleFile(ontology.subject)}/>
      </div>
    </div>
  );
};

export default OntologyActions;
