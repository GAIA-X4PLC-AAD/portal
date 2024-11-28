/* test coverage not required */
import Main from 'common/components/layouts/Main';
import Vertical from 'common/components/layouts/Vertical';
import { ResourceDetailsContext } from 'components/context/ResourceDetailsContext';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Header from '../../../../common/components/header/Header';
import Horizontal from '../../../../common/components/layouts/Horizontal';
import LoadingIndicator from '../../../../common/components/loadingIndicator/LoadingIndicator';
import NoContent from '../../../../common/components/noContent/NoContent';
import { ResourceDetails } from '../../../../types/resources.model';
import { ARROW_RIGHT } from '../../../../utils/symbols';
import { loadResourceDetails } from '../../../resources/helpers/resourceDataFlow';

import styles from './ResourceDetailsPage.module.css'
import ResourceMainContent from './ResourceMainContent';
import ResourceActions from './components/actions/ResourceActions';
import ResourceMap from './components/map/ResourceMap';

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

        <Horizontal className={styles.mainContentContainer} visible={!isLoading && !!resourceDetails}>
          <ResourceMainContent/>

          <Vertical className={styles.sidebarContainer}>
            <ResourceMap/>
            <ResourceActions/>
          </Vertical>

        </Horizontal>
      </Main>
    </ResourceDetailsContext.Provider>
  );
}

export default ResourceDetailsPage;
