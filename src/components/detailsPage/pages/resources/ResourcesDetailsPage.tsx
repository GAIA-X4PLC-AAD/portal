import { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

// @ts-ignore
import car from '../../../../assets/car.gif';
import { AuthContext } from '../../../../context/AuthContextProvider';
import { ResourceContext } from '../../../../context/ResourceContext';
import { ApiService } from '../../../../services/ApiService';
import { Resource } from '../../../../types/resources.model';
import { ARROW_RIGHT } from '../../../../utils/symbols';
import Header from '../../../header/Header';
import DetailsContent from '../../layout/content/DetailsContent';
import DetailsMainContent from '../../layout/mainContent/DetailsMainContent';
import DetailsPage from '../../layout/mainPage/DetailsPage';
import DetailsSidebar from '../../layout/sidebar/DetailsSidebar';

import ResourceMainContent from './ResourceMainContent';
import ResourceMap from './components/map/ResourceMap';
import ResourceOfferedBy from './components/offeredBy/ResourceOfferedBy';

const ResourceDetailsPage: FC = () => {
  const { t } = useTranslation();
  const { '*': id } = useParams();
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [resource, setResource] = useState<Resource>();
  const [name, setName] = useState<string>();

  useEffect(() => {
    const loadResource = async () => {
      try {
        const resource = await ApiService.getOneSelfDescriptions(id);
        setResource(resource);
        setName(resource.items[0]['properties(n)'].name);
      } catch (error) {
        console.error('Error getting resource:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id && authContext.isAuthenticated) {
      loadResource();
    }

  }, [id, authContext.isAuthenticated]);

  if (!authContext.isAuthenticated) {
    return <p>You need to be authenticated to view this page.</p>;
  }

  if (isLoading) {
    return (
      <div className="newCarLoader">
        <img src={car} alt="loading..." className="car"/>
      </div>
    );
  }

  if (!resource) {
    return <div>{t('resources.not-found')}</div>;
  }

  return (
    <DetailsPage>
      <Header title={`${t('left-menu.resources')} ${ARROW_RIGHT} ${name}`} />
      <ResourceContext.Provider value={resource}>
        <DetailsContent>
          <DetailsMainContent>
            <ResourceMainContent />
          </DetailsMainContent>
          <DetailsSidebar>
            <ResourceMap />
            <ResourceOfferedBy />
          </DetailsSidebar>
        </DetailsContent>
      </ResourceContext.Provider>
    </DetailsPage>
  );
}

export default ResourceDetailsPage;
