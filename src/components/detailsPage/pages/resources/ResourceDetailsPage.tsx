import MapCard from 'components/cards/MapCard';
import SidebarCard from 'components/cards/SidebarCard';
import { AuthContext } from 'context/AuthContextProvider';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CypherQueryApiService as cypherQuery } from 'services/cypherQueryApiService';

import LoadingIndicator from '../../../loading_view/LoadingIndicator';
import NoContent from '../../../nocontent/NoContent';

import styles from './ResourceDatails.module.css';
import ResourceMainContent from './ResourceMainContent';

export default function ResourceDetailsPage() {
  const authContext = useContext(AuthContext);
  const [selfDescriptionData, setSelfDescriptionData] = useState(null);
  const { resourceId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetSelfDescriptions = async () => {
      try {
        const response = await cypherQuery.getOneSelfDescriptions(resourceId);
        console.log('Fetched data: ', response);
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
                <ResourceMainContent cardData={selfDescriptionData}/>
              </div>
              <div>
                <MapCard/>
                <SidebarCard
                  title="Offered by"
                  subtitle="3D Mapping Solutions GmbH"
                  text="We offer high-precision 3D map data of roads and urban environments for applications in autonomous driving, robotics, urban planning and navigation systems."
                />
              </div>
            </>)}
        </>
      )}
    </div>
  );
}
