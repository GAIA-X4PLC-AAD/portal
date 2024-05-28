import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Ontology } from '../../../../utils/ontologyMapper';
import { ARROW_RIGHT } from '../../../../utils/symbols';
import Header from '../../../header/Header';
import DetailActions from '../../components/actions/DetailActions';
import DetailSuitableOfferings from '../../components/suitableOfferings/DetailSuitableOfferings';
import DetailsContent from '../../layout/content/DetailsContent';
import DetailsMainContent from '../../layout/mainContent/DetailsMainContent';
import DetailsPage from '../../layout/mainPage/DetailsPage';
import DetailsSidebar from '../../layout/sidebar/DetailsSidebar';

import MainContentOntology from './MainContentOntology';

interface IOntologiesDetailsPage {
    ontology: Ontology;
}

const OntologiesDetailsPage: FC<IOntologiesDetailsPage> = ({ ontology }) => {
  const { t } = useTranslation();

  return (
    <DetailsPage>
      <Header title={t('left-menu.shapesAndOntologies') + ' ' + ARROW_RIGHT + ' ' + ontology.subject} />
      <DetailsContent>
        <DetailsMainContent>
          <MainContentOntology ontology={ontology} />
        </DetailsMainContent>
        <DetailsSidebar>
          <DetailSuitableOfferings linksForOfferings={ontology.linksForOfferings} />
          <DetailActions graphLink={ontology.graphLink} downloadLink={ontology.downloadLink}/>
        </DetailsSidebar>
      </DetailsContent>
    </DetailsPage>
  );
}

export default OntologiesDetailsPage;
