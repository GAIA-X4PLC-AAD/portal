import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import car from '../../assets/car.gif';
import { AuthContext } from '../../context/AuthContextProvider';
import { useFilters } from '../../context/ResourceFilterContext';
import { useResourceFilter } from '../../hooks/useResourceFilter';
import { ApiService } from '../../services/ApiService';
import { Resource, mapResources } from '../../utils/dataMapper';
import Text from '../Text/Text';
import SelfDescriptionCard from '../cards/SelfDescriptionCard';
import Filter from '../filter/Filter';
import Header from '../header/Header';
import SearchBar from '../searchBar/SearchBar';

import styles from './Resources.module.css';

const Resources = () => {
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const [resourceData, setResourceData] = useState<Resource[]>([]);
  const [filteredResourceData, setFilteredResourceData] = useState<Resource[]>([]);
  const { filters } = useFilters();
  const { typeAssets, formatAssets, vendorAssets, fetchFilteredData } = useResourceFilter();
  const { toggleResourceFilter } = useFilters();

  // Fetch all resources on component mount
  useEffect(() => {
    const fetchAndSetSelfDescriptions = async () => {
      setIsLoading(true);
      try {
        const response = await ApiService.getAllResources(authContext);
        console.log('My fetched data: ', response);
        const map = mapResources(response);
        setResourceData(map);
        setFilteredResourceData(map);
      } catch (error) {
        console.error('Error fetching self descriptions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetSelfDescriptions();
  }, []);

  // Fetch filtered resources based on the filters
  useEffect(() => {
    setIsLoading(true);
    fetchFilteredData()
      .then((data) => {
        const map = mapResources(data);
        setResourceData(map);
        setFilteredResourceData(map);
      })
      .catch((error) => {
        console.error('Error in fetching data:', error);
      });
    setIsLoading(false);
  }, [filters]);

  const handleSearch = (query: string) => {
    if (query === '') {
      setFilteredResourceData(resourceData);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = resourceData.filter(resource => {
        const resourceString = JSON.stringify(resource).toLowerCase();
        return resourceString.includes(lowerCaseQuery);
      });
      setFilteredResourceData(filtered);
    }
  };

  return (
    <div>
      <Header title={`${t('left-menu.resources')}(${filteredResourceData.length}) ${t('dashboard.results')}`}/>
      <div className={styles['resource-content-container']}>
        <Filter
          typeAssets={typeAssets}
          formatAssets={formatAssets}
          vendorAssets={vendorAssets}
          toggleFilter={toggleResourceFilter}
        />
        {authContext.isAuthenticated && (
          <div className={styles.content}>
            <div>
              <SearchBar placeholder={t('resources.search-bar-text')} onSearch={handleSearch}/>
            </div>
            <div>
              {isLoading && (
                <div className="newCarLoader">
                  <img src={car} alt="loading..." className="car"/>
                </div>
              )}
              {!isLoading && filteredResourceData.length > 0 ? (
                filteredResourceData.map((resource) => {
                  return (
                    <SelfDescriptionCard
                      key={resource.name}
                      label={resource.label}
                      isGaiaXComlpiant={true}
                      name={resource.name}
                      description={resource.description}
                      selfDescription={resource}
                    />
                  );
                })
              ) : (
                <Text>{t('resources.no-offerings-available')}</Text>
              )}
            </div>
          </div>
        )}
      </div>
      {!authContext.isAuthenticated && (
        <p>{t('resources.not-authenticated')}</p>
      )}
    </div>
  );
};
export default Resources;
