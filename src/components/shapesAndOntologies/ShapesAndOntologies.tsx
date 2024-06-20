import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import car from '../../assets/car.gif';
import { AuthContext } from '../../context/AuthContextProvider';
import { getAllOntologies } from '../../services/SchemaApiService';
import { Ontology } from '../../types/shapesAndOntologies.model';
import Text from '../Text/Text';
import ItemCard from '../cards/ItemCard';
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
        const fetchedOntologies = await getAllOntologies(authContext);

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

  return (
    <div>
      <Header title={`${t('left-menu.shapesAndOntologies')}(${filteredOntologies.length} ${t('dashboard.results')})`}/>
      <div className={styles['shapesAndOntologies-content-container']}>
        <div className={styles.content}>
          <div>
            <SearchBar placeholder={t('ontologies.search-bar-text')} onSearch={handleSearch} />
            {(
              filteredOntologies.length > 0 ? (
                filteredOntologies.map((ontology, index) => (
                  <ItemCard
                    key={index}
                    label={t('ontologies.title')}
                    ontology={ontology}
                  />
                ))
              ) : (
                <Text>{t('ontologies.no-ontologies-available')}</Text>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShapesAndOntologies;
