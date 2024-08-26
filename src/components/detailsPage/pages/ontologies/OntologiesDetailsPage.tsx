import { OntologyContext } from 'context/OntologyContext';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import car from '../../../../assets/car.gif';
import { fetchOntologyById } from '../../../../services/ontologyService.utils';
import { fetchAllSchemas } from '../../../../services/schemaApiService';
import { fetchAllShapesFromSchemas } from '../../../../services/shapeService.utils';
import { Ontology } from '../../../../types/ontologies.model';
import { ARROW_RIGHT } from '../../../../utils/symbols';
import Header from '../../../header/Header';
import DetailsContent from '../../layout/content/DetailsContent';
import DetailsMainContent from '../../layout/mainContent/DetailsMainContent';
import DetailsPage from '../../layout/mainPage/DetailsPage';
import DetailsSidebar from '../../layout/sidebar/DetailsSidebar';

import OntologyMainContent from './OntologyMainContent';
import OntologyActions from './components/actions/OntologyActions';
import OntologySuitableOfferings from './components/suitableOfferings/OntologySuitableOfferings';

const OntologiesDetailsPage: FC = () => {
  const { t } = useTranslation();
  const { '*': id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [ontology, setOntology] = useState<Ontology>();

  useEffect(() => {
    // TODO: Isn't it already available? Is it necessary to fetch the ontology? The view is probably opened from a
    //  search view where ontologies already have been fetched
    const loadOntology = async () => {
      try {
        const schemas = await fetchAllSchemas();
        const shapes = await fetchAllShapesFromSchemas(schemas);
        const ontology = await fetchOntologyById(shapes, id);
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
            <OntologyMainContent />
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
