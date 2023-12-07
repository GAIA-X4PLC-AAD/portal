import {ShaclShape} from "../types/shaclShape.model";
import {ShapeProperty} from "../types/shapeProperty.model";
import {trimShapes} from "./shapeHelpers";
import rdf from "rdf";

export const RDFParser = {

  parseShapesFromRdfResponse(rdfData: any): ShaclShape[] {
    // Step 1: Create a rdf graph
    const rdf = require('rdf');
    let store = new rdf.Graph();
    const baseUriNode = 'https://w3id.org/gaia-x/core#';  // Create a base URI node //TODO:Throws error by parsing
    const turtleData = String(rdfData);
    const contentType = 'text/turtle';
    // Step 2: Parse Turtle data
    try {
      store = rdf.TurtleParser.parse(turtleData, baseUriNode, null);
      console.log(store.graph.toArray().join("\n"));
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
    console.log(triples.toArray().length)

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

const parseProperties = (store: any, selectedShape: string): ShapeProperty[] | undefined => {
  let properties: ShapeProperty[] = [];
  // Create NamedNodes
  const rdf = require('rdf');
  const subjectNode = new rdf.NamedNode(selectedShape);
  const predicateURI = 'http://www.w3.org/ns/shacl#property';
  const predicateNode = new rdf.NamedNode(predicateURI);
  const propertyTriples = store.graph.match(subjectNode, predicateNode, null);
  console.log(propertyTriples);

  // Retrieve specific property triples
  propertyTriples.forEach((triple: any) => {
    const propertyPathPredicateNode = new rdf.NamedNode('http://www.w3.org/ns/shacl#path');
    const foaf = rdf.ns('http://www.w3.org/ns/shacl');
    const namespace = rdf.ns('http://www.w3.org/ns');
    const propertyPath = store.graph.match(triple.subject, propertyPathPredicateNode, triple.object);

    console.log(propertyPath.object);
    const propertyNamePredicateNode = new rdf.NamedNode('http://www.w3.org/ns/shacl#name');
    const propertyName = store.graph.match(triple.subject, propertyNamePredicateNode, triple.object);

    console.log(propertyName);
    const propertyDescriptionPredicateNode = new rdf.NamedNode('http://www.w3.org/ns/shacl#description');
    const propertyDescription = store.graph.match(triple.subject, propertyDescriptionPredicateNode, triple.object);

    console.log(propertyDescription)
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
