import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import car from '../../assets/car.gif';
import { AuthContext } from '../../context/AuthContextProvider';
import { AuthContextValues } from '../../context/AuthContextValues';
import { ApiService } from '../../services/ApiService';
import { mapOntologies, mapShapesAndOntologies, Ontology } from '../../utils/dataMapper';
import Text from '../Text/Text';
import Title from '../Title/Title';
import SelfDescriptionCard from '../cards/SelfDescriptionCard';
import SearchBar from '../searchBar/SearchBar';

import styles from './ShapesAndOntologies.module.css';

const ShapesAndOntologies = () => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [originalOntologies, setOriginalOntologies] = useState<Ontology[]>([]);
  const [filteredOntologies, setFilteredOntologies] = useState<Ontology[]>([]);

  // todo im not completely satisfied with the way i fetch the ontologies. Would it be better to have the fetching logic in a separate file?
  const fetchOntologies = async (authContext: AuthContextValues) => {
    const response = await ApiService.getAllSchemas(authContext);
    const ontologiesStringArray = mapShapesAndOntologies(response);
    const promises = ontologiesStringArray.map((item) => ApiService.getSchemaWithId(authContext, item));
    return await Promise.all(promises);
  };

  useEffect(() => {
    const loadOntologies = async () => {
      setIsLoading(true);
      try {
        const ontologyPromises = await fetchOntologies(authContext);
        const ontologiesDetailed = mapOntologies(ontologyPromises);
        setOriginalOntologies(ontologiesDetailed);
        setFilteredOntologies(ontologiesDetailed);
      } catch (error) {
        console.error('Error fetching self descriptions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOntologies();
  }, []);

  // todo To stringify the whole object is a very simple solution. Would it be better to iterate over the variables of the ontology, also separate over the classes and contributors?
  const handleSearch = (query: string) => {
    if (query === '') {
      setFilteredOntologies(originalOntologies);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = originalOntologies.filter(ontology => {
        const ontologyString = JSON.stringify(ontology).toLowerCase();
        return ontologyString.includes(lowerCaseQuery);
      });
      setFilteredOntologies(filtered);
    }
  };

  return (
    <div>
      <header className={styles['header-container']}>
        <div className={styles['header-title']}>
          <Title>{t('left-menu.shapesAndOntologies')}({filteredOntologies.length} {t('dashboard.results')})</Title>
        </div>
      </header>
      <div className={styles['shapesAndOntologies-content-container']}>
        {authContext.isAuthenticated && (
          <div className={styles.content}>
            <div>
              <SearchBar placeholder={t('ontologies.searchBarText')} onSearch={handleSearch} />
              {isLoading ? (
                <div className="newCarLoader">
                  <img src={car} alt="loading..." className="car"/>
                </div>
              ) : (
                filteredOntologies.length > 0 ? (
                  filteredOntologies.map((ontology, index) => (
                    <SelfDescriptionCard
                      key={index}
                      label={t('ontologies.title')}
                      name={ontology.base}
                      description={ontology.label}
                      selfDescription={ontology}
                    />
                  ))
                ) : (
                  <Text>{t('ontologies.noOntologiesAvailable')}</Text>
                )
              )}
            </div>
          </div>
        )}
      </div>
      {!authContext.isAuthenticated && <p>You are not authenticated!</p>}
    </div>
  );
};

export default ShapesAndOntologies;
