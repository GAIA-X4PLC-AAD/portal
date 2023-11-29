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

  parseShapesFromRdfResponse(rdfData: any, option?: string, selectedShape?: ShaclShape): ShaclShape[] {
    // Step 1: Create a rdf graph
    const store = $rdf.graph();
    const baseUriNode = 'https://w3id.org/gaia-x/core#';  // Create a base URI node //TODO:Throws error by parsing
    const turtleData = String(rdfData);
    const contentType = 'text/turtle';
    // Step 2: Parse Turtle data
    try {
      $rdf.parse(turtleData, store, baseUriNode, contentType);
    } catch (error) {
      // console.info('Error parsing Turtle data:', error);
    }

    let items: ShaclShape[] = [];
    if (option === 'shapes') {
      items = this.parseNodeShapes(store);
    } else if (option === 'properties') {
      if (selectedShape) {
        let shaclShape = parseProperties(store, selectedShape);
        if (shaclShape) {
          items.push(shaclShape);
        }
      }
    }
    return items;
  },

  parseNodeShapes(store: any): ShaclShape[] {
    let shapes: Array<ShaclShape> = [];

    // Step 3: Create NamedNodes
    const predicateURI = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'; // Replace with your predicate URI
    const predicateNode = $rdf.sym(predicateURI);

    const objectURI = 'http://www.w3.org/ns/shacl#NodeShape'; // Replace with your object URI
    const objectNode = $rdf.sym(objectURI);

    const triples = store.match(null, predicateNode, objectNode);

    // Step 4:  Retrieve specific triples by shape.
    // @ts-ignore
    triples.forEach((triple) => {
      const shape = triple.subject.value;
      const shaclShape: ShaclShape = {
        shape: shape,
        short_shape: trimShapes(shape),
      };

      shapes.push(shaclShape);
    });
    return shapes;
  },
}

const parseProperties = (store: $rdf.Store, selectedShape: ShaclShape): ShaclShape | undefined => {
  let properties: ShapeProperty[] = [];

  // Step 3: Create NamedNodes
  if (selectedShape) {
    const subjectURI = selectedShape.shape;
    const subjectNode = $rdf.sym(subjectURI);
    const predicateURI = 'http://www.w3.org/ns/shacl#property';
    const predicateNode = $rdf.sym(predicateURI);
    const propertyTriple = store.match(subjectNode, predicateNode);

    // Step 4:  Retrieve specific property triples
    // Iterate over triples with the blank node as the subject
    propertyTriple.forEach((triple: any) => {
      const propertyPathPredicateNode = $rdf.sym('http://www.w3.org/ns/shacl#path');
      const propertyPath = store.anyValue(triple.object, propertyPathPredicateNode);
      console.log('propertyPath', propertyPath)

      const propertyNamePredicateNode = $rdf.sym('http://www.w3.org/ns/shacl#name');
      const propertyName = store.anyValue(triple.object, propertyNamePredicateNode);
      console.log('propertyName', propertyName)

      const propertyDescriptionPredicateNode = $rdf.sym('http://www.w3.org/ns/shacl#description');
      const propertyDescription = store.anyValue(triple.object, propertyDescriptionPredicateNode);
      console.log('propertyDescription', propertyDescription)

      let property: ShapeProperty = {
        path: '',
      };

      if (typeof propertyPath === "string") {
        property.path = propertyPath;
      }
      // @ts-ignore
      property.name = propertyName;
      // @ts-ignore
      property.description = propertyDescription;

      properties.push(property);
    });

    selectedShape.properties = properties;

    return selectedShape;
  }
}
