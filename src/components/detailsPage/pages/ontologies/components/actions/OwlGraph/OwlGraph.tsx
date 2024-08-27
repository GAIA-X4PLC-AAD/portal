import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import car from '../../../../../../../assets/car.gif';
import { getOntologyById } from '../../../../../../../services/ontologyService.utils';
import { Ontology } from '../../../../../../../types/ontologies.model';
import RDFVisualization from '../../../../../../../utils/RDFVisualization';
import Header from '../../../../../../header/Header';

const OwlGraph = () => {
  const { t } = useTranslation();
  const { '*': id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [ontology, setOntology] = useState<Ontology>();

  useEffect(() => {
    const loadOntology = async () => {
      try {
        const ontology = await getOntologyById(id);
        setOntology(ontology);
      } catch (error) {
        console.error('Error fetching self descriptions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOntology();
  }, []);

  if (!ontology) {
    return <div>{t('ontologies.not-found')}</div>;
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
