import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import car from '../../../../../../../assets/car.gif';
import { fetchAllSchemas } from '../../../../../../../services/SchemaApiService';
import { fetchOntologyById } from '../../../../../../../services/ontologyService.utils';
import { fetchAllShapesFromSchemas } from '../../../../../../../services/shapeService.utils';
import { Ontology } from '../../../../../../../types/ontologies.model';
import RDFVisualization from '../../../../../../../utils/RDFVisualization';
import Header from '../../../../../../header/Header';

const OwlGraph = () => {
  const { t } = useTranslation();
  const { '*': id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [ontology, setOntology] = useState<Ontology>();

  useEffect(() => {
    // TODO: Isn't it already available? Is it necessary to fetch the ontology? The view is probably opened from a
    //  search view where ontologies already have been fetched
    const loadOntology = async () => {
      try {
        const schemas = await fetchAllSchemas();
        const shapes = await fetchAllShapesFromSchemas(schemas);
        const ontology = await fetchOntologyById(shapes, id);
        setOntology(ontology);
      } catch (error) {
        console.error(error);
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
