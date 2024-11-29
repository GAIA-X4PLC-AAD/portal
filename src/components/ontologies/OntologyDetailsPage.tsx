/* test coverage not required */
import { OntologyContext } from 'components/context/OntologyContext';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import car from '../../assets/car.gif';
import Header from '../../common/components/header/Header';
import Horizontal from '../../common/components/layouts/Horizontal';
import Main from '../../common/components/layouts/Main';
import Vertical from '../../common/components/layouts/Vertical';
import LoadingIndicator from '../../common/components/loadingIndicator/LoadingIndicator';
import NoContent from '../../common/components/noContent/NoContent';
import { fetchOntologyById } from '../../services/ontologyService.utils';
import { fetchAllSchemas } from '../../services/schemaApiService';
import { fetchAllShapesFromSchemas } from '../../services/shapeService.utils';
import { Ontology } from '../../types/ontologies.model';
import { ARROW_RIGHT } from '../../utils/symbols';

import styles from './OntologyDetailsPage.module.css';
import OntologyActions from './components/OntologyActions';
import OntologyDetailMainContent from './components/OntologyDetailMainContent';
import OntologySuitableOfferings from './components/OntologySuitableOfferings';

const OntologyDetailsPage: FC = () => {
  const { t } = useTranslation();
  const { '*': id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [ontology, setOntology] = useState<Ontology>();

  useEffect(() => {
    const loadOntology = async () => {
      try {
        const schemas = await fetchAllSchemas();
        const shapes = await fetchAllShapesFromSchemas(schemas);
        const ontology = await fetchOntologyById(shapes, id || '');
        setOntology(ontology);
      } catch (error) {
        console.error('Error getting ontology:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOntology();

  }, [id]);

  if (isLoading) {
    return (
      <div className="newCarLoader">
        <img src={car} alt="loading..." className="car"/>
      </div>
    );
  }

  if (!ontology) {
    return <div>{t('ontologies.not-found')}</div>;
  }

  return (
    <OntologyContext.Provider value={ontology}>
      <Header
        title={`${t('left-menu.shapesAndOntologies')} ${ontology ? ARROW_RIGHT : ''} ${ontology?.subject || ''}`}/>
      <Main>
        <LoadingIndicator visible={isLoading}/>
        <NoContent message={t('ontologies.ontology-detail-not-available')} visible={!isLoading && !ontology}/>

        <Horizontal className={styles.mainContentContainer} visible={!isLoading && !!ontology}>
          <OntologyDetailMainContent/>

          <Vertical className={styles.sidebarContainer}>
            <OntologySuitableOfferings/>
            <OntologyActions/>
          </Vertical>
        </Horizontal>
      </Main>
    </OntologyContext.Provider>
  );
}

export default OntologyDetailsPage;
