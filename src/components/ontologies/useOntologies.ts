import { useEffect, useMemo, useState } from 'react';

import { fetchAllOntologiesFromSchemas, getUniqueLinks, getUniqueNodes } from '../../services/ontologyService.utils';
import { fetchAllSchemas } from '../../services/schemaApiService';
import { fetchAllShapesFromSchemas } from '../../services/shapeService.utils';
import { Node, Ontology, ShapesAndOntologiesInput } from '../../types/ontologies.model';
import { Shape } from '../../types/shapes.model';

export type OntologiesViewState = 'LOADING' | 'SHOW_ONTOLOGIES' | 'SHOW_NO_RESULTS' | 'SHOW_MAP'

interface IUseOntologies {
    nodeTypeFilters: string[];
}

const useOntologies = ({ nodeTypeFilters }: IUseOntologies) => {
  const [schemas, setSchemas] = useState<ShapesAndOntologiesInput>();
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [ontologies, setOntologies] = useState<Ontology[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const schemas = await fetchAllSchemas();
        const shapes = await fetchAllShapesFromSchemas(schemas);
        const fetchedOntologies = await fetchAllOntologiesFromSchemas(schemas, shapes)

        setSchemas(schemas);
        setShapes(shapes);
        setOntologies(fetchedOntologies);
      } catch (error) {
        console.error('Error fetching ontologies:', error);
      } finally {
        setIsLoading(false)
      }
    })();
  }, []);

  const filteredOntologies = useMemo(() => ontologies
    .filter(ontology => Object
      .values(ontology)
      .some(propertyValue => !propertyValue ||
            String(propertyValue).toLowerCase()
              .includes(searchText.toLowerCase()))
    ), [ontologies, searchText])

  const nodes = useMemo(
    () => getUniqueNodes(ontologies, (node: Node) => nodeTypeFilters.includes(node.type)),
    [ontologies])

  const links = useMemo(
    () => getUniqueLinks(ontologies),
    [ontologies]);

  const state = useMemo<OntologiesViewState>(() => {
    if (isLoading) {
      return 'LOADING'
    } else if (showMap) {
      return 'SHOW_MAP'
    } else if (filteredOntologies.length) {
      return 'SHOW_ONTOLOGIES'
    } else {
      return 'SHOW_NO_RESULTS'
    }
  }, [filteredOntologies, showMap, isLoading])

  const search = (filter: string) => {
    setSearchText(filter)
  };

  const toggleShowMap = () => {
    setShowMap(showMap => !showMap);
  };

  // console.debug(getResourceTypes(links, shapes))
  return {
    ontologies: filteredOntologies,
    shapes,
    schemas,
    nodes,
    links,
    state,
    toggleShowMap,
    search
  }
}

export default useOntologies;
