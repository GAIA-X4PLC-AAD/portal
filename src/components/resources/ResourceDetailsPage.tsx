import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

import Header from '../../common/components/header/Header';
import DetailsContent from '../../common/components/layouts/DetailsContent';
import DetailsSidebar from '../../common/components/layouts/DetailsSidebar';
import Main from '../../common/components/layouts/Main';
import LoadingIndicator from '../../common/components/loadingIndicator/LoadingIndicator';
import NoContent from '../../common/components/noContent/NoContent';
import { CombinedDetails } from '../../types/resources.model';
import { ResourceDetailsContext } from '../context/ResourceDetailsContext';

import ResourceActions from './components/ResourceActions';
import ResourceDetailMainContent from './components/ResourceDetailMainContent';
import ResourceMap from './components/ResourceMap';
import { loadCombinedResourceDetails } from './helpers/resourceDataFlow';

const ResourceDetailsPage = () => {
  const { t } = useTranslation();
  const [resourceDetails, setResourceDetails] = useState<CombinedDetails>();
  const { resourceId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const id = location.pathname.split('/resources/')[1];

  useEffect(() => {
    if (resourceId) {
      loadCombinedResourceDetails(resourceId)
        .then((response) => setResourceDetails(response))
        .finally(() => setIsLoading(false));
    }
  }, [resourceId]);

  return (
    <ResourceDetailsContext.Provider value={resourceDetails}>
      <Header breadcrumbs={[
        {
          label: t('left-menu.resources'),
          to: '/resources'
        },
        {
          label: resourceDetails?.details.name ?? '',
          to: `/resources/${id}`
        }
      ]}
      />
      <Main>
        <LoadingIndicator visible={isLoading}/>
        <NoContent message={t('resources.resource-detail-not-available')} visible={!isLoading && !resourceDetails}/>

        <DetailsContent visible={!isLoading && !!resourceDetails}>
          <ResourceDetailMainContent/>

          <DetailsSidebar>
            <ResourceMap mediaUrl={resourceDetails?.details.mediaUrl}/>
            <ResourceActions/>
          </DetailsSidebar>
        </DetailsContent>
      </Main>
    </ResourceDetailsContext.Provider>
  );
}

export default ResourceDetailsPage;
