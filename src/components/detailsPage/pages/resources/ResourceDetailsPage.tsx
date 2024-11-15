/* test coverage not required */
import MapCard from 'components/cards/MapCard';
import SidebarCard from 'components/cards/SidebarCard';
import { AuthContext } from 'context/AuthContextProvider';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import NoContent from '../../../../common/components/././NoContent/NoContent';
import { ResourceDetails } from '../../../../types/resources.model';
import LoadingIndicator from '../../../loading_view/LoadingIndicator';
import { loadResourceDetails } from '../../../resources/helpers/resourceDataFlow';

import styles from './ResourceDatails.module.css';
import ResourceMainContent from './ResourceMainContent';

export default function ResourceDetailsPage() {
  const authContext = useContext(AuthContext);
  const [selfDescriptionData, setSelfDescriptionData] = useState<ResourceDetails | null>(null);
  const { resourceId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetSelfDescriptions = async () => {
      try {
        const response = await loadResourceDetails(decodeURI(resourceId || ''));
        console.log('Fetched resource details: ', response);
        if (response) {
          setSelfDescriptionData(response);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (resourceId && authContext.isAuthenticated) {
      fetchAndSetSelfDescriptions();
    }
  }, [resourceId, authContext.isAuthenticated]);

  return (
    <div className={styles['details-page-container']}>
      <LoadingIndicator visible={isLoading}/>
      {!isLoading && (
        <>
          <NoContent message={'No data available.'} visible={!selfDescriptionData}/>
          {selfDescriptionData && (
            <>
              <div>
                <ResourceMainContent cardData={{ name: '', description: '', items: [] }}/>
              </div>
              <div>
                <MapCard/>
                <SidebarCard
                  title="Offered by"
                  subtitle="3D Mapping Solutions GmbH"
                  text="We offer high-precision 3D map data of roads and urban environments for applications in autonomous driving, robotics, urban planning and navigation systems."
                  resource={selfDescriptionData}
                />
              </div>
            </>)}
        </>
      )}
    </div>
  );
}
