import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import car from '../../assets/car.gif';
import { AuthContext } from '../../context/AuthContextProvider';
import { getAllShapes } from '../../services/SchemaApiService';
import { Shape } from '../../types/shapesAndOntologies.model';
import Text from '../Text/Text';
import Header from '../header/Header';
import ItemCard from '../itemCard/ItemCard';
import SearchBar from '../searchBar/SearchBar';

import styles from './Shapes.module.css';

const Shapes = () => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [originalShapes, setOriginalShapes] = useState<Shape[]>([]);
  const [filteredShapes, setFilteredShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const loadShapes = async () => {
      setIsLoading(true);
      try {
        const fetchedShapes = await getAllShapes(authContext);

        setOriginalShapes(fetchedShapes);
        setFilteredShapes(fetchedShapes);
      } catch (error) {
        console.error('Error fetching self descriptions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadShapes();
  }, []);

  const handleSearch = (query: string) => {
    if (query === '') {
      setFilteredShapes(originalShapes);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = originalShapes.filter(shape => {
        const shapeString = JSON.stringify(shape).toLowerCase();
        return shapeString.includes(lowerCaseQuery);
      });
      setFilteredShapes(filtered);
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
      <Header title={`${t('shapes.titles')}(${filteredShapes.length} ${t('dashboard.results')})`}/>
      <div className={styles['shapesAndOntologies-content-container']}>
        <div className={styles['content']}>
          <div className={styles['searchAndButtonContainer']}>
            <SearchBar placeholder={t('shapes.search-bar-text')} onSearch={handleSearch} />
          </div>
          {(
            filteredShapes.length > 0 ? (
              filteredShapes.map((shape, index) => (
                <ItemCard
                  key={index}
                  label={t('shapes.title')}
                  shape={shape}
                />
              ))
            ) : (
              <Text>{t('shapes.no-shapes-available')}</Text>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Shapes;
