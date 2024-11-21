import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import GaiaXButton from '../../../../../../common/components/buttons/GaiaXButton';
import { OntologyContext } from '../../../../../../context/OntologyContext';
import { downloadTurtleFile } from '../../../../../../services/schemaService.utils';
import Title from '../../../../../Title/Title';

import styles from './OntologyActions.module.css';

 
enum graphRoutes {
   
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
