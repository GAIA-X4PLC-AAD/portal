import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Ontology, Shape } from '../../../utils/ontologyMapper';
import Header from '../../header/Header';
import DetailActions from '../components/actions/DetailActions';
import DetailsMainContent from '../components/mainContent/DetailsMainContent';
import MainContentOntology from '../components/mainContent/ontology/MainContentOntology';
import DetailSuitableOfferings from '../components/suitableOfferings/DetailSuitableOfferings';
import DetailsContent from '../layout/content/DetailsContent';
import DetailsPage from '../layout/mainPage/DetailsPage';
import DetailsSidebar from '../layout/sidebar/DetailsSidebar';

interface IOntologiesDetailsPage {
    ontology: Ontology;
}

const OntologiesDetailsPage: FC = () => {
  const { t } = useTranslation();

  const shapey1: Shape = {
    comment: 'comment',
    label: 'label',
    subClasses: []
  };

  const shapey2: Shape = {
    comment: 'comment',
    label: 'label',
    subClasses: []
  };

  const ontologyey: Ontology = {
    subject: 'https://base.com/',
    contributors: ['contributor1', 'contributor2'],
    description: 'label',
    version: 'version',
    shapes: [shapey1, shapey2],
  }

  return (
    <DetailsPage>
      <Header title={t('left-menu.shapesAndOntologies') + ' \u2192 ' + ontologyey.subject} />
      <DetailsContent>
        <DetailsMainContent>
          <MainContentOntology ontology={ontologyey} />
        </DetailsMainContent>
        <DetailsSidebar>
          <DetailSuitableOfferings title={'lala'} />
          <DetailActions title={'lulu'} />
        </DetailsSidebar>
      </DetailsContent>
    </DetailsPage>
  );
}

export default OntologiesDetailsPage;
