import MapIcon from '@mui/icons-material/Map';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import car from '../../assets/car.gif';
import { fetchAllSchemas } from '../../services/SchemaApiService';
import { fetchAllOntologiesFromSchemas } from '../../services/ontologyService.utils';
import { Link, Node, Ontology } from '../../types/ontologies.model';
import RDFVisualization from '../../utils/RDFVisualization';
import Text from '../Text/Text';
import Header from '../header/Header';
import ItemCard from '../itemCard/ItemCard';
import SearchBar from '../searchBar/SearchBar';

import styles from './Ontologies.module.css';

const Ontologies = () => {
  const { t } = useTranslation();
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
        const schemas = await fetchAllSchemas();
        const fetchedOntologies = await fetchAllOntologiesFromSchemas(schemas);

        const uniqueNodes = new Map(fetchedOntologies
          .map(ontology => ontology.nodes)
          .reduce((result, currentOntologyNodes) => [
            ...result,
            ...(
              currentOntologyNodes.filter(
                node => node.type == 'http://www.w3.org/2000/01/rdf-schema#Class'
                          || node.type == 'http://www.w3.org/2002/07/owl#Class'
                          || node.type == 'http://www.w3.org/2002/07/owl#ObjectProperty'))
          ])
          .map(node => [node.id, node] as [string, Node]));
        setNodes(Array.from(uniqueNodes.values()))

        const uniqueLinks = new Map(fetchedOntologies
          .map(ontology => ontology.links)
          .reduce((merged, currentOntologyLinks) => [...merged, ...currentOntologyLinks])
          .map(link => [link.source + link.target, link] as [string, Link]))
        setLinks(Array.from(uniqueLinks.values()))

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

  if (isLoading) {
    return (
      <div className="new-car-loader">
        <img src={car} alt="loading..." className="car"/>
      </div>
    );
  }

  return (
    <div>
      <Header title={`${t('ontologies.titles')}(${filteredOntologies.length} ${t('dashboard.results')})`}/>
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

export default Ontologies;
