import * as N3 from 'n3';
import { Quad } from 'n3';

import { Link, Node, Ontology, ShapesAndOntologiesInput } from '../types/ontologies.model';
import { Shape } from '../types/shapes.model';
import { trimShapes } from '../utils/shapeHelpers';

import { getSchemaById } from './schemaApiService';

export const DATA_RESOURCE_CLASS = 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#DataResource'

/**
 * Fetches all ontologies defined in a schema.
 *
 * @param schemas where a list of ontologies are defined.
 * @param shapes a list of shapes from which the ontology related shapes will be picked.
 */
export const fetchAllOntologiesFromSchemas = async (
  schemas: ShapesAndOntologiesInput, shapes: Shape[]
): Promise<Ontology[]> => {
  return Promise.all(
    schemas.ontologies.map(
      async id => fetchOntologyById(shapes, id)));
}

/**
 * Fetches a single ontology turtle file from the backend parses it and creates an Ontology object from it.
 *
 * @param shapes will be filtered for those who relate to the ontology and will be put in the relatedShapes property.
 * @param id is the id of the ontology on the server.
 */
export const fetchOntologyById = async (shapes: Shape[], id: string) => {
  const relatedShapes = findRelatedShapes(shapes, id);

  return getSchemaById(id)
    .then((schema) => parseSingleOntology(schema))
    .then((parsedQuads) => createOntologyObject(parsedQuads, relatedShapes))
    .catch((error) => {
      throw error
    });
}

/**
 * Returns all shapes from a given shape list which relate to an ontology identified by its id.
 *
 * @param shapes is the original list of shapes.
 * @param ontologyId identifying the ontology to which a shape must relate to.
 */
const findRelatedShapes = (shapes: Shape[], ontologyId: string): Shape[] => {
  return shapes.filter(
    shape => shape.targetClasses.some(
      targetClasses => targetClasses.includes(ontologyId)));
}

/**
 * Convert an ontology described in a turtle format and converts it to quads.
 * Quads are triplets (subject, predicate, object) which describe an ontology.
 *
 * @param schema ontology defined in a turtle format.
 */
const parseSingleOntology = (schema: string) => {
  const parser = new N3.Parser();
  const quads: Quad[] = [];
  parser.parse(schema, (error, quad) => {
    if (error) {
      console.error(error)
    } else if (quad) {
      quads.push(quad);
    }
  });
  return quads;
}

/**
 * Creates from a list of quads which describe an ontology an actual Ontology object.
 *
 * @param quads a list of triplets (subject, predicate, object) which describe an ontology.
 * @param relatedShapes a list of shapes described the quads.
 */
const createOntologyObject = (quads: Quad[], relatedShapes: Shape[]): Ontology => {
  const nodes: { id: string; label: string; type: string }[] = [];
  const links: { source: string; target: string }[] = [];

  let subject = 'No subject available!';
  let contributors: string[] = [];
  let description = 'No description available!';
  let version = 'No version available!';

  // Create a map to keep track of the types of each subject
  let typesMap: { [key: string]: string } = {};
  quads.forEach(quad => {
    const subjectId = quad.subject.id;
    const predicateId = quad.predicate.id;
    const objectId = quad.object.id;

    // Track types of subjects
    if (predicateId === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {
      //owl#Ontology is the overall subject of the ontology
      if (objectId === 'http://www.w3.org/2002/07/owl#Ontology') {
        subject = subjectId;
      }
      typesMap[subjectId] = objectId;
    }

    if (predicateId === 'http://www.w3.org/2000/01/rdf-schema#label' || predicateId === 'http://www.w3.org/2002/07/owl#ObjectProperty') {
      nodes.push({ id: subjectId, label: objectId, type: typesMap[subjectId] || 'Unknown' });
    } else if (predicateId === 'http://www.w3.org/2000/01/rdf-schema#subClassOf' || predicateId === 'http://www.w3.org/2000/01/rdf-schema#domain' || predicateId === 'http://www.w3.org/2000/01/rdf-schema#range') {
      links.push({ source: subjectId, target: objectId });
    }

    // get the ontology information
    if (subjectId === subject) {
      switch (predicateId) {
      case 'http://purl.org/dc/terms/contributor':
        contributors.push(objectId.replace(/(^"|"$)/g, ''));
        break;
      case 'http://www.w3.org/2000/01/rdf-schema#label':
        description = objectId.replace(/(^"|"$)/g, '').split('"@')[0];
        break;
      case 'http://www.w3.org/2002/07/owl#versionInfo':
        version = objectId.replace(/(^"|"$)/g, '').split('"^^')[0];
        break;
      }
    }
  });

  // Update nodes with type information
  nodes.forEach(node => {
    node.type = typesMap[node.id] || 'Unknown';
  });

  return {
    subject,
    contributors,
    description,
    version,
    nodes,
    links,
    relatedShapes,
  };
};

/**
 * Returns the all the nodes defined in the ontologies passed in as a parameter.
 *
 * Nodes represent classes defined inside ontologies. Nodes and links together can be viewed also as a graph where nodes
 * are the dots and links are the edges of the graph. This graph represents how classes represented as nodes inside the
 * ontologies relate to each other.
 *
 * @param ontologies where the nodes are defined, and will be extracted into a unique list.
 * @param nodeFilter is a filter predicate which reduces the nodes to be returned.
 * @return a list of unique nodes.
 */
export const getUniqueNodes = (ontologies: Ontology[], nodeFilter: (node: Node) => boolean): Node[] => {
  const uniqueNodes = new Map(ontologies
    .map(ontology => ontology.nodes)
    .flat()
    .filter(nodeFilter)
    .map((node: Node) => [node.id, node] as [string, Node]));

  return Array.from(uniqueNodes.values());
}

/**
 * Returns the all the links defined in the ontologies passed in as a parameter.
 *
 * Links have a source and a target property and define a directional connection between two nodes also defined in the
 * ontologies. Nodes and links together can be viewed also as a graph where nodes are the dots and links are the edges
 * of the graph. This graph represents how classes represented as nodes inside the ontologies relate to each other.
 *
 * @param ontologies where the links are defined, and will be extracted into a unique list.
 * @return a list of unique links.
 */
export const getUniqueLinks = (ontologies: Ontology[]) => {
  return Array.from(new Map(ontologies
    .map(ontology => ontology.links)
    .flat()
    .map(link => [link.source + link.target, link] as [string, Link])
  ).values());
}

/**
 * Returns all resource types. Resource types are the individual names of all subclasses of the DataResource class.
 *
 * @param ontologies serving as the source of information
 * @return a set of resource types
 */
export const getResourceTypes = (ontologies: Ontology[]): Set<string> => {
  return new Set(
    ontologies
      .map(ontology => ontology.relatedShapes
        .filter(relatedShape => isSubclassOfDataResource(ontology, relatedShape))
        .map(shape => shape.targetClasses
          .map(targetClass => trimShapes(targetClass))
        )
        .flat()
      )
      .flat()
  )
}

/**
 * Returns all resource formats. Resource formats are listed in a node of a resource called Format. The possible
 * values are contained inside the http://www.w3.org/ns/shacl#in property.
 *
 * @param ontologies serving as the source of information
 * @return a list of resource formats
 */
export const getResourceFormats = (ontologies: Ontology[]): string[] => {
  const dataResourceOntologies = ontologies
    .filter(ontology => ontology.relatedShapes
      .some(relatedShape => isSubclassOfDataResource(ontology, relatedShape))
    )
  const formatShapes = dataResourceOntologies
    .map(ontology => ontology.relatedShapes
      .filter(relatedShape => relatedShape.targetClasses
        .some(targetClass => targetClass.endsWith('/Format')))
    )
    .flat()
  const formatShapeProperties = formatShapes
    .map(shape => shape.properties
      .filter(property => property.propertyId.endsWith('/formatType'))
    )
    .flat()
  const inPropertyParameters = formatShapeProperties
    .map(property => property.propertyValues
      .filter(propertyParameter => propertyParameter.type === 'http://www.w3.org/ns/shacl#in')
    )
    .flat()
  return Array.from(new Set<string>(
    inPropertyParameters.map(parameter => parameter.value).flat()
  ));
}

/**
 * Based on the ontology determines if a class described by the given shape is subclass of DataResource class.
 *
 * @param ontology represented by the shacl shape used to determine the relations.
 * @param shape containing the class name.
 * @return if the shape is subclass of DataResource.
 */
const isSubclassOfDataResource = (ontology: Ontology, shape: Shape): boolean => {
  return ontology.links
    .filter(link => link.target === DATA_RESOURCE_CLASS)
    .some(link => shape.targetClasses.includes(link.source));
}
