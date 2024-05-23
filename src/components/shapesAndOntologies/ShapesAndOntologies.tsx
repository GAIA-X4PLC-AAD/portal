import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import car from '../../assets/car.gif';
import { AuthContext } from '../../context/AuthContextProvider';
import { fetchOntologies, mapOntologies, Ontology } from '../../utils/dataMapper';
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

  useEffect(() => {
    const loadOntologies = async () => {
      setIsLoading(true);
      try {
        const ontologiesDetailed = await fetchOntologies(authContext).then(mapOntologies);
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
