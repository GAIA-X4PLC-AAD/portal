import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import GaiaXButton from '../../../common/components/buttons/GaiaXButton';
import Title from '../../../common/components/fields/title/Title';
import Vertical from '../../../common/components/layouts/Vertical';
import { getSchemaById } from '../../../services/schemaApiService';
import { downloadFile } from '../../../utils/fileUtils';
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

  const handleTurtleDownload = async () => {
    const response = await getSchemaById(ontology.subject);
    downloadFile(ontology.subject, '.ttl', response);
  }

  return (
    <Vertical className={styles.sidebarCardContainer}>
      <Title className={styles.title}>{t('dashboard.actions')}</Title>

      <GaiaXButton
        className={styles.sideBarCardButton}
        label={t('details.view-graph')}
        handleOnClick={() => handleNavigationToGraphPage()}
      />
      <GaiaXButton
        className={styles.sideBarCardButton}
        label={t('details.download-file')}
        handleOnClick={handleTurtleDownload}
      />
    </Vertical>
  );
};

export default OntologyActions;
