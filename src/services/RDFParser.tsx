import {ApiService} from "./ApiService";
import * as $rdf from 'rdflib';
import {Namespace} from "rdflib";
import {AuthContextValues} from "../context/AuthContextValues";
export const RDFParser = {

  parseShapesFromRdfResponse(authContext: AuthContextValues) {
    // Step 1: Get response as string
    // PYTHON:  shacl_shape_string = response.text
    const shaclShapes = ApiService.getShaclShapesFromCatalogue(authContext);

    // Step 2: Create a rdf graph
    // PYTHON:  shacl_shape_rdf_graph = Graph().parse(data=shacl_shape_string, format="turtle")
    const store = $rdf.graph();
    const baseUriNode = 'http://example.org/example/';  // Create a base URI node
    console.log('ShaclShapes', shaclShapes);
    const turtleData = String(shaclShapes);
    console.log('Turtle', turtleData);
    const contentType = 'text/turtle';


    // const doc = $rdf.sym('https://example.com/alice/card.ttl');

    // Parse Turtle data
    try {
      $rdf.parse(turtleData, store, baseUriNode, contentType);
    } catch (error) {
      console.error('Error parsing Turtle data:', error);
    }

    // Step 3: Create Namespaces / NamedNode
    // PYTHON:  sh = Namespace("http://www.w3.org/ns/shacl#")
    // PYTHON:  rdf = Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#")
    const predicateURI = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'; // Replace with your predicate URI
    const predicateNode = $rdf.sym(predicateURI);

    const objectURI = 'http://www.w3.org/ns/shacl#NodeShape'; // Replace with your object URI
    const objectNode = $rdf.sym(objectURI);

    // Step 4:  Retrieve specific triples by shape.
    // PYTHON: for subject, _, _ in shacl_shape_rdf_graph.triples((None, rdf.type, sh.NodeShape)):
    const shapes: any = [];
    const triples = store.match(null, predicateNode, objectNode);
    triples.forEach((triple) => {
      console.log(`Triple: ${triple.subject.value} ${triple.predicate.value} ${triple.object.value}`);
      shapes.append(triple);
    });
    console.log('My shapes', shapes);
    // PYTHON:   return shapes, shacl_shape_rdf_graph

  }
}
