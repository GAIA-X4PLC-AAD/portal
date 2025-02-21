import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import car from '../../assets/car.gif';
import Header from '../../common/components/header/Header';
import DetailsContent from '../../common/components/layouts/DetailsContent';
import DetailsSidebar from '../../common/components/layouts/DetailsSidebar';
import Main from '../../common/components/layouts/Main';
import LoadingIndicator from '../../common/components/loadingIndicator/LoadingIndicator';
import NoContent from '../../common/components/noContent/NoContent';
import { fetchOntologyById } from '../../services/ontologyService.utils';
import { fetchAllSchemas } from '../../services/schemaApiService';
import { fetchAllShapesFromSchemas } from '../../services/shapeService.utils';
import { Ontology } from '../../types/ontologies.model';
import { OntologyContext } from '../context/OntologyContext';

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
        breadcrumbs={[
          {
            label: t('left-menu.shapesAndOntologies'),
            to: '/ontologies'
          },
          {
            label: ontology?.subject ?? '',
            to: `/ontologies/details/${id}`
          }]}
      />
      <Main>
        <LoadingIndicator visible={isLoading}/>
        <NoContent message={t('ontologies.ontology-detail-not-available')} visible={!isLoading && !ontology}/>

        <DetailsContent visible={!isLoading && !!ontology}>
          <OntologyDetailMainContent/>

          <DetailsSidebar>
            <OntologySuitableOfferings/>
            <OntologyActions/>
          </DetailsSidebar>
        </DetailsContent>
      </Main>
    </OntologyContext.Provider>
  );
}

export default OntologyDetailsPage;
