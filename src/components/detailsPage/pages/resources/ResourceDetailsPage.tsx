import DetailsContent from 'components/detailsPage/layout/content/DetailsContent';
import DetailsMainContent from 'components/detailsPage/layout/mainContent/DetailsMainContent';
import DetailsSidebar from 'components/detailsPage/layout/sidebar/DetailsSidebar';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { CypherQueryApiService as cypherQuery } from 'services/cypherQueryApiService';

import NoContent from '../../../../common/components/NoContent/NoContent';
import { ResourceDetailsContext } from '../../../../context/ResourceDetailsContext';
import { ResourceDetails2 } from '../../../../types/resources.model';
import { ARROW_RIGHT } from '../../../../utils/symbols';
import Header from '../../../header/Header';
import LoadingIndicator from '../../../loading_view/LoadingIndicator';
import DetailsPage from '../../layout/mainPage/DetailsPage';

import ResourceMainContent from './ResourceMainContent';
import ResourceActions from './components/actions/ResourceActions';
import ResourceMap from './components/map/ResourceMap';

const ResourceDetailsPage = () => {
  const { t } = useTranslation();
  const [resourceDetails, setResourceDetails] = useState<ResourceDetails2>();
  const { '*': resourceId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetResourceDetails = async () => {
      try {
        const response = await cypherQuery.getOneResourceWithDetails(resourceId);
        console.log('Fetched data: ',  response);
        if (response) {
          setResourceDetails(response);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetResourceDetails();

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
