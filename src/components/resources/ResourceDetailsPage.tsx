import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Header from '../../common/components/header/Header';
import DetailsContent from '../../common/components/layouts/DetailsContent';
import DetailsSidebar from '../../common/components/layouts/DetailsSidebar';
import Main from '../../common/components/layouts/Main';
import LoadingIndicator from '../../common/components/loadingIndicator/LoadingIndicator';
import NoContent from '../../common/components/noContent/NoContent';
import { ResourceDetails } from '../../types/resources.model';
import { ARROW_RIGHT } from '../../utils/symbols';
import { ResourceDetailsContext } from '../context/ResourceDetailsContext';

import ResourceActions from './components/ResourceActions';
import ResourceDetailMainContent from './components/ResourceDetailMainContent';
import ResourceMap from './components/ResourceMap';
import { loadResourceDetails } from './helpers/resourceDataFlow';

const ResourceDetailsPage = () => {
  const { t } = useTranslation();
  const [resourceDetails, setResourceDetails] = useState<ResourceDetails>();
  const { resourceId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (resourceId) {
      loadResourceDetails(resourceId)
        .then((response) => setResourceDetails(response))
        .finally(() => setIsLoading(false))
    }
  }, [resourceId]);

  return (
    <ResourceDetailsContext.Provider value={resourceDetails}>
      <Header
        title={`${t('left-menu.resources')} ${resourceDetails ? ARROW_RIGHT : ''} ${resourceDetails?.name || ''}`}/>
      <Main>
        <LoadingIndicator visible={isLoading}/>
        <NoContent message={t('resources.resource-detail-not-available')} visible={!isLoading && !resourceDetails}/>

        <DetailsContent visible={!isLoading && !!resourceDetails}>
          <ResourceDetailMainContent/>

          <DetailsSidebar>
            <ResourceMap mediaUrl={''}/>
            <ResourceActions/>
          </DetailsSidebar>
        </DetailsContent>
      </Main>
    </ResourceDetailsContext.Provider>
  );
}

export default ResourceDetailsPage;
