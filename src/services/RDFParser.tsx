import {ApiService} from "./ApiService";
import * as $rdf from 'rdflib';
import {Namespace} from "rdflib";
export const RDFParser = {

  parseShapesFromRdfResponse() {
    // Step 1: Get response as string
    // PYTHON:  shacl_shape_string = response.text
    const shaclShapesAsString = ApiService.getShaclShapes();

    // Step 2: Create a rdf graph
    // PYTHON:  shacl_shape_rdf_graph = Graph().parse(data=shacl_shape_string, format="turtle")
    const store = $rdf.graph();
    const baseUriNode = 'node_shape';
    // const baseUrl = 'node_shape';
    const turtleData = shaclShapesAsString;
    const mimeType = 'text/turtle';

    // Create a base URI node
    // const baseUriNode = $rdf.sym(baseUrl);

    // Parse Turtle data
    try {
      $rdf.parse(turtleData, store, baseUriNode, mimeType);
    } catch (error) {
      console.error('Error parsing Turtle data:', error);
    }

    // Step 3: Create Namespaces / NamedNode
    // PYTHON:  sh = Namespace("http://www.w3.org/ns/shacl#")
    // PYTHON:  rdf = Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#")
    const predicateURI = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'; // Replace with your predicate URI
    const predicateNode = $rdf.sym(predicateURI);

    const objectURI = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#NodeShape'; // Replace with your object URI
    const objectNode = $rdf.sym(objectURI);

    // Step 4:  Retrieve specific triples by shape.
    // PYTHON: for subject, _, _ in shacl_shape_rdf_graph.triples((None, rdf.type, sh.NodeShape)):
    const shapes: any = [];
    const triples = store.match(null, predicateNode, objectNode);
    triples.forEach((triple) => {
      console.log(`Triple: ${triple.subject.value} ${triple.predicate.value} ${triple.object.value}`);
      shapes.append(triple);
    });

    // PYTHON:   return shapes, shacl_shape_rdf_graph

  }
}
