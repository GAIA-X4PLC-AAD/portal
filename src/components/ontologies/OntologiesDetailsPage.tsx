/* test coverage not required */
import { OntologyContext } from 'components/context/OntologyContext';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import car from '../../assets/car.gif';
import Header from '../../common/components/header/Header';
import { fetchOntologyById } from '../../services/ontologyService.utils';
import { fetchAllSchemas } from '../../services/schemaApiService';
import { fetchAllShapesFromSchemas } from '../../services/shapeService.utils';
import { Ontology } from '../../types/ontologies.model';
import { ARROW_RIGHT } from '../../utils/symbols';
import DetailsContent from '../detailsPage/layout/content/DetailsContent';
import DetailsMainContent from '../detailsPage/layout/mainContent/DetailsMainContent';
import DetailsPage from '../detailsPage/layout/mainPage/DetailsPage';
import DetailsSidebar from '../detailsPage/layout/sidebar/DetailsSidebar';

import OntologyActions from './components/OntologyActions';
import OntologyDetailMainContent from './components/OntologyDetailMainContent';
import OntologySuitableOfferings from './components/OntologySuitableOfferings';

const OntologiesDetailsPage: FC = () => {
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
    <DetailsPage>
      <Header title={`${t('left-menu.shapesAndOntologies')} ${ARROW_RIGHT} ${ontology.subject}`} />
      <OntologyContext.Provider value={ontology}>
        <DetailsContent>
          <DetailsMainContent>
            <OntologyDetailMainContent/>
          </DetailsMainContent>
          <DetailsSidebar>
            <OntologySuitableOfferings />
            <OntologyActions />
          </DetailsSidebar>
        </DetailsContent>
      </OntologyContext.Provider>
    </DetailsPage>
  );
}

export default OntologiesDetailsPage;
