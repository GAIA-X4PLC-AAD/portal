import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import Header from '../../common/components/header/Header';
import DetailsContent from '../../common/components/layouts/DetailsContent';
import DetailsSidebar from '../../common/components/layouts/DetailsSidebar';
import Main from '../../common/components/layouts/Main';
import LoadingIndicator from '../../common/components/loadingIndicator/LoadingIndicator';
import NoContent from '../../common/components/noContent/NoContent';
import { Ontology } from '../../types/ontologies.model';
import { OntologyContext } from '../context/OntologyContext';

import OntologyActions from './components/OntologyActions';
import OntologyDetailMainContent from './components/OntologyDetailMainContent';
import OntologySuitableOfferings from './components/OntologySuitableOfferings';
import { loadOntology } from './helpers/ontologyDataFlow';

const OntologyDetailsPage: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const ontologyId = location.pathname.split('/ontologies/')[1];
  const [isLoading, setIsLoading] = useState(true);
  const [ontology, setOntology] = useState<Ontology>();

  useEffect(() => {
    if (ontologyId) {
      loadOntology(ontologyId)
        .then((response) => setOntology(response))
        .finally(() => setIsLoading(false));
    }
  }, [ontologyId]);

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
            to: `/ontologies/${ontologyId}`
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
