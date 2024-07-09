import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import car from '../../../../../assets/car.gif';
import { AuthContext } from '../../../../../context/AuthContextProvider';
import { getOntologyById } from '../../../../../services/ontologyService.utils';
import { Ontology } from '../../../../../types/shapesAndOntologies.model';
import RDFVisualization from '../../../../../utils/RDFVisualization';
import Header from '../../../../header/Header';

import styles from './OwlGraph.module.css';

const OwlGraph = () => {
  const { t } = useTranslation();
  const { '*': id } = useParams();
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [ontology, setOntology] = useState<Ontology>();

  useEffect(() => {
    const loadOntology = async () => {
      try {
        const ontology = await getOntologyById(authContext, id);
        setOntology(ontology);
      } catch (error) {
        console.error('Error fetching self descriptions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOntology();
  }, []);

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
      <Header title={t('details.view-graph')}/>
      <RDFVisualization nodes={ontology.nodes} links={ontology.links}/>
    </div>
  )
}

export default OwlGraph;
