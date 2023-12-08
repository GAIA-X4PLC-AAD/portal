import {ShaclShape} from "../types/shaclShape.model";
import {ShapeProperty} from "../types/shapeProperty.model";
import {trimShapes} from "./shapeHelpers";

export const RDFParser = {

  parseShapesFromRdfResponse(rdfData: any): ShaclShape[] {
    // Step 1: Create a rdf graph
    const rdf = require('rdf');
    let store = new rdf.Graph();
    const baseUriNode = 'https://w3id.org/gaia-x/core#';  // Create a base URI node //TODO:Throws error by parsing
    const turtleData = String(rdfData);
    // Step 2: Parse Turtle data
    try {
      store = rdf.TurtleParser.parse(turtleData, baseUriNode, null);
      console.log("All the things: ", store);
    } catch (error) {
      //TODO:Throws error by parsing
      console.info('Error parsing Turtle data:', error);
    }

    let items: ShaclShape[] = [];
    items = this.parseNodeShapes(store);
    return items;
  },

  parseNodeShapes(store: any): ShaclShape[] {
    let shapes: Array<ShaclShape> = [];

    // Create NamedNodes
    const rdf = require('rdf');
    const { NamedNode, BlankNode, Literal } = rdf;
    const predicateURI = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'; // Replace with your predicate URI
    const predicateNode = new NamedNode(predicateURI);
    const objectURI = 'http://www.w3.org/ns/shacl#NodeShape'; // Replace with your object URI
    const objectNode = new NamedNode(objectURI);

    const triples = store.graph.match(null, predicateNode, objectNode);
    console.log("Node Shape Triples: ", triples);

    // Retrieve specific triples by shape.
    // @ts-ignore
    triples.forEach((triple) => {
      console.log("Node Shape Triple: ", triple)
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

const parseProperties = (store: any, selectedShape: string): ShapeProperty[] | undefined => {
  let properties: ShapeProperty[] = [];
  // Create NamedNodes
  const rdf = require('rdf');
  const subjectNode = new rdf.NamedNode(selectedShape);
  const predicateURI = 'http://www.w3.org/ns/shacl#property';
  const predicateNode = new rdf.NamedNode(predicateURI);

  const propertyObjects = store.graph.match(subjectNode, predicateNode, null);
  console.log("Check property object: ", propertyObjects);

  const pathURI = 'http://www.w3.org/ns/shacl#path';
  const pathNode = new rdf.NamedNode(pathURI);

  const nameURI = 'http://www.w3.org/ns/shacl#name';
  const nameNode = new rdf.NamedNode(nameURI);

  const descriptionURI = 'http://www.w3.org/ns/shacl#description';
  const descriptionNode = new rdf.NamedNode(descriptionURI);

  propertyObjects.forEach((property: any) => {
    const propertyPath = store.graph.reference(property.object).rel(pathNode).one().toString();
    let propertyName = store.graph.reference(property.object).rel(nameNode).one();
    if (propertyName != null) {
      propertyName = propertyName.toString();
    }
    let propertyDescription = store.graph.reference(property.object).rel(descriptionNode).one();
    if (propertyDescription != null) {
      propertyDescription = propertyDescription.toString();
    }

    console.log("Property path: ", propertyPath);
    console.log("Property name: ", propertyName);
    console.log("Property description: ", propertyDescription);

    let shapeProperty: ShapeProperty = {
      path: '',
    };

    // @ts-ignore
    shapeProperty.path = propertyPath;
    // @ts-ignore
    shapeProperty.name = propertyName;
    // @ts-ignore
    shapeProperty.description = propertyDescription;

    properties.push(shapeProperty);
  })

  return properties;
}
