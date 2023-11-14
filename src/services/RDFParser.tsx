import * as $rdf from 'rdflib';

export const RDFParser = {

  parseShapesFromRdfResponse(data: any) {
    // Step 1: Get response as string
    // PYTHON:  shacl_shape_string = response.text

    // Step 2: Create a rdf graph
    // PYTHON:  shacl_shape_rdf_graph = Graph().parse(data=shacl_shape_string, format="turtle")
    const store = $rdf.graph();
    const baseUriNode = 'http://example.org/example/';  // Create a base URI node
    const turtleData = String(data);
    console.log('Turtle', turtleData);
    const contentType = 'text/turtle';

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
    let shapes: Array<string> = [];
    const triples = store.match(null, predicateNode, objectNode);
    triples.forEach((triple) => {
      console.log(`Triple: ${triple.subject.value} ${triple.predicate.value} ${triple.object.value}`);
      shapes.push(triple.subject.value);
    });
    console.log('My shapes', shapes);
    // PYTHON:   return shapes, shacl_shape_rdf_graph
    return shapes;
  },
}
