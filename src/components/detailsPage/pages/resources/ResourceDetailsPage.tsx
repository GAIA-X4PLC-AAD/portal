/* test coverage not required */
import Header from 'common/components/header/Header';
import { ResourceDetailsContext } from 'components/context/ResourceDetailsContext';
import DetailsContent from 'components/detailsPage/layout/content/DetailsContent';
import DetailsMainContent from 'components/detailsPage/layout/mainContent/DetailsMainContent';
import DetailsSidebar from 'components/detailsPage/layout/sidebar/DetailsSidebar';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import LoadingIndicator from '../../../../common/components/loadingIndicator/LoadingIndicator';
import NoContent from '../../../../common/components/noContent/NoContent';
import { ResourceDetails } from '../../../../types/resources.model';
import { ARROW_RIGHT } from '../../../../utils/symbols';
import { loadResourceDetails } from '../../../resources/helpers/resourceDataFlow';
import DetailsPage from '../../layout/mainPage/DetailsPage';

import ResourceMainContent from './ResourceMainContent';
import ResourceActions from './components/actions/ResourceActions';
import ResourceMap from './components/map/ResourceMap';

const ResourceDetailsPage = () => {
  const { t } = useTranslation();
  const [resourceDetails, setResourceDetails] = useState<ResourceDetails>();
  const { resourceId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadResourceDetails(resourceId)
      .then((response) => setResourceDetails(response))
      .finally(() => setIsLoading(false))
  }, [resourceId]);

  return (
    <>
      <LoadingIndicator visible={isLoading}/>
      {!isLoading && (
        <>
          <NoContent message={'No data available.'} visible={!resourceDetails}/>
          {resourceDetails && (
            <DetailsPage>
              <Header title={`${t('left-menu.resources')} ${ARROW_RIGHT} ${resourceDetails.name}`} />
              <ResourceDetailsContext.Provider value={resourceDetails}>
                <DetailsContent>
                  <DetailsMainContent>
                    <ResourceMainContent />
                  </DetailsMainContent>
                  <DetailsSidebar>
                    <ResourceMap />
                    <ResourceActions />
                  </DetailsSidebar>
                </DetailsContent>
              </ResourceDetailsContext.Provider>
            </DetailsPage>
          )}
        </>
      )}
    </>
  );
}

export default ResourceDetailsPage;
