import * as $rdf from 'rdflib';
import {ShaclShape} from "../types/shaclShape.model";
import {ShapeProperty} from "../types/shapeProperty.model";

export const trimShapes = (shape: string) => {
  let trimmedShape = '';
  if (shape.includes('#')) {
    trimmedShape = shape.substring(shape.indexOf("#") + 1);
  } else if (shape.includes('/')) {
    // Find the index of the last occurrence of "/"
    const index = shape.lastIndexOf("/");
    // If "/" is found, create a new string starting from the last occurrence of "/"
    trimmedShape = index !== -1 ? shape.substring(index + 1) : shape;
  }
  return trimmedShape;
};
export const RDFParser = {

  parseShapesFromRdfResponse(rdfData: any): ShaclShape[] {
    // Step 1: Create a rdf graph
    const store = $rdf.graph();
    const baseUriNode = 'https://w3id.org/gaia-x/core#';  // Create a base URI node //TODO:Throws error by parsing
    const turtleData = String(rdfData);
    const contentType = 'text/turtle';
    // Step 2: Parse Turtle data
    try {
      $rdf.parse(turtleData, store, baseUriNode, contentType);
    } catch (error) {
      //TODO:Throws error by parsing
      // console.info('Error parsing Turtle data:', error);
    }

    let items: ShaclShape[] = [];
    items = this.parseNodeShapes(store);
    return items;
  },

  parseNodeShapes(store: any): ShaclShape[] {
    let shapes: Array<ShaclShape> = [];

    // Create NamedNodes
    const predicateURI = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'; // Replace with your predicate URI
    const predicateNode = $rdf.sym(predicateURI);
    const objectURI = 'http://www.w3.org/ns/shacl#NodeShape'; // Replace with your object URI
    const objectNode = $rdf.sym(objectURI);

    const triples = store.match(null, predicateNode, objectNode);

    // Retrieve specific triples by shape.
    // @ts-ignore
    triples.forEach((triple) => {
      let shape = triple.subject.value;
      let short_shape = trimShapes(shape);
      let properties = parseProperties(store, shape);

      const shaclShape: ShaclShape = {
        shape: shape,
        short_shape: short_shape,
        properties: properties,
      };

      shapes.push(shaclShape);
    });
    return shapes;
  },
}

const parseProperties = (store: $rdf.Store, selectedShape: string): ShapeProperty[] | undefined => {
  let properties: ShapeProperty[] = [];
  // Create NamedNodes
  const subjectNode = $rdf.sym(selectedShape);
  const predicateURI = 'http://www.w3.org/ns/shacl#property';
  const predicateNode = $rdf.sym(predicateURI);
  const propertyTriples = store.match(subjectNode, predicateNode);

  // Retrieve specific property triples
  propertyTriples.forEach((triple: any) => {
    const propertyPathPredicateNode = $rdf.sym('http://www.w3.org/ns/shacl#path');
    const propertyPath = store.anyValue(triple.object, propertyPathPredicateNode);

    const propertyNamePredicateNode = $rdf.sym('http://www.w3.org/ns/shacl#name');
    const propertyName = store.anyValue(triple.object, propertyNamePredicateNode);

    const propertyDescriptionPredicateNode = $rdf.sym('http://www.w3.org/ns/shacl#description');
    const propertyDescription = store.anyValue(triple.object, propertyDescriptionPredicateNode);

    let property: ShapeProperty = {
      path: '',
    };

    // @ts-ignore
    property.path = propertyPath;
    // @ts-ignore
    property.name = propertyName;
    // @ts-ignore
    property.description = propertyDescription;

    properties.push(property);
  });
  return properties;
}
