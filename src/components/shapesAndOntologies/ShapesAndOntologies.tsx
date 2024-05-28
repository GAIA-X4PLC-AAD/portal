import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import car from '../../assets/car.gif';
import { AuthContext } from '../../context/AuthContextProvider';
import { createAllOntologyObjects, fetchOntologies, Ontology, parseOntologies } from '../../utils/ontologyMapper';
import Text from '../Text/Text';
import SelfDescriptionCard from '../cards/SelfDescriptionCard';
import Header from '../header/Header';
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
        const fetchedOntologies = await fetchOntologies(authContext)
          .then(parseOntologies)
          .then(createAllOntologyObjects);

        console.log('fetchedOntologies:', fetchedOntologies);
        setOriginalOntologies(fetchedOntologies);
        setFilteredOntologies(fetchedOntologies);
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
      <Header title={`${t('left-menu.shapesAndOntologies')}(${filteredOntologies.length} ${t('dashboard.results')})`}/>
      <div className={styles['shapesAndOntologies-content-container']}>
        {authContext.isAuthenticated && (
          <div className={styles.content}>
            <div>
              <SearchBar placeholder={t('ontologies.search-bar-text')} onSearch={handleSearch} />
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
                      name={ontology.subject}
                      description={ontology.description}
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
