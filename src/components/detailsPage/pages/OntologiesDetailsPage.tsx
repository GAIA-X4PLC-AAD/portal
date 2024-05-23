import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Class, Ontology } from '../../../utils/dataMapper';
import DetailActions from '../components/actions/DetailActions';
import DetailsMainContent from '../components/mainContent/DetailsMainContent';
import DetailSuitableOfferings from '../components/suitableOfferings/DetailSuitableOfferings';
import DetailsPage from '../layout/mainPage/DetailsPage';
import DetailsSidebar from '../layout/sidebar/DetailsSidebar';
import DetailsTitle from '../title/DetailsTitle';

interface IOntologiesDetailsPage {
    ontology: Ontology;
}

const OntologiesDetailsPage: FC = () => {
  const { t } = useTranslation();

  const shapey1: Class = {
    name: 'name',
    label: 'label',
    subClasses: []
  };

  const shapey2: Class = {
    name: 'name',
    label: 'label',
    subClasses: []
  };

  const ontologyey: Ontology = {
    base: 'https://base.com/',
    contributors: ['contributor1', 'contributor2'],
    label: 'label',
    version: 'version',
    classes: [shapey1, shapey2],
    claimsGraphUri: 'claimsGraphUri'
  }

  return (
    <DetailsPage>
      <DetailsTitle title={t('left-menu.shapesAndOntologies') + ' \u2192 ' + ontologyey.base} />
      <DetailsMainContent>
        <div>content</div>
      </DetailsMainContent>
      <DetailsSidebar>
        <DetailSuitableOfferings title={'lala'} />
        <DetailActions title={'lulu'} />
      </DetailsSidebar>
    </DetailsPage>
  );
}

export default OntologiesDetailsPage;
