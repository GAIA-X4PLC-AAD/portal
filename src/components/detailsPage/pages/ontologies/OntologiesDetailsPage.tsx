import { OntologyContext } from 'context/OntologyContext';
import { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import car from '../../../../assets/car.gif';
import { AuthContext } from '../../../../context/AuthContextProvider';
import { getOntologyById } from '../../../../services/ontologyService.utils';
import { Ontology } from '../../../../types/shapesAndOntologies.model';
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
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [ontology, setOntology] = useState<Ontology>();

  useEffect(() => {
    const loadOntology = async () => {
      try {
        const ontology = await getOntologyById(authContext, id);
        setOntology(ontology);
      } catch (error) {
        console.error('Error getting ontology:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id && authContext.isAuthenticated) {
      loadOntology();
    }

  }, [id, authContext.isAuthenticated]);

  if (!authContext.isAuthenticated) {
    return <p>You need to be authenticated to view this page.</p>;
  }

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
