import MapIcon from '@mui/icons-material/Map';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import car from '../../assets/car.gif';
import { AuthContext } from '../../context/AuthContextProvider';
import { getAllOntologies } from '../../services/SchemaApiService';
import { Link, Node, Ontology } from '../../types/shapesAndOntologies.model';
import RDFVisualization from '../../utils/RDFVisualization';
import Text from '../Text/Text';
import ItemCard from '../cards/ItemCard';
import Header from '../header/Header';
import SearchBar from '../searchBar/SearchBar';

import styles from './ShapesAndOntologies.module.css';

const ShapesAndOntologies = () => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [originalOntologies, setOriginalOntologies] = useState<Ontology[]>([]);
  const [filteredOntologies, setFilteredOntologies] = useState<Ontology[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);

  const toggleShowMap = () => {
    setShowMap(showMap => !showMap);
  };

  useEffect(() => {
    const loadOntologies = async () => {
      setIsLoading(true);
      try {
        const fetchedOntologies = await getAllOntologies(authContext);
        console.log(fetchedOntologies);
        fetchedOntologies.forEach(ontology => {
          ontology.nodes.forEach(node => {
            if (node.type == 'http://www.w3.org/2000/01/rdf-schema#Class' || node.type == 'http://www.w3.org/2002/07/owl#Class' || node.type == 'http://www.w3.org/2002/07/owl#ObjectProperty'){
              if (!nodes.find(n => n.id === node.id)) {
                nodes.push(node);
              }
            }
          });

          ontology.links.forEach(link => {
            if (!links.find(l => l.source === link.source && l.target === link.target)) {
              links.push(link);
            }
          });
        });

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
        <div className={styles['content']}>
          <div className={styles['searchAndButtonContainer']}>
            <SearchBar placeholder={t('ontologies.search-bar-text')} onSearch={handleSearch} />
            <button className={styles['button']} onClick={toggleShowMap}><MapIcon />{t('details.view-graph')}</button>
          </div>
          {showMap ? (
            <RDFVisualization nodes={nodes} links={links}/>
          ) : (
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
  );
};

export default ShapesAndOntologies;
