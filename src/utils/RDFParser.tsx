import * as $rdf from 'rdflib';

export const trimShapes = (shape: string) => {
  let trimmedShape = '';
  if(shape.includes('#')){
    trimmedShape = shape.substring(shape.indexOf("#") + 1);
  } else if(shape.includes('/')){
    // Find the index of the last occurrence of "/"
    const index = shape.lastIndexOf("/");
    // If "/" is found, create a new string starting from the last occurrence of "/"
    trimmedShape = index !== -1 ? shape.substring(index + 1) : shape;
  }
  return trimmedShape;
};
export const RDFParser = {

  parseShapesFromRdfResponse(rdfData: any) {
    // Step 1: Create a rdf graph
    const store = $rdf.graph();
    const baseUriNode = 'https://w3id.org/gaia-x/core#';  // Create a base URI node
    const turtleData = String(rdfData);
    const contentType = 'text/turtle';
    // Step 2: Parse Turtle data
    try {
      $rdf.parse(turtleData, store, baseUriNode, contentType);
    } catch (error) {
      console.info('Error parsing Turtle data:', error);
    }

    // Step 3: Create NamedNodes
    const predicateURI = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'; // Replace with your predicate URI
    const predicateNode = $rdf.sym(predicateURI);

    const objectURI = 'http://www.w3.org/ns/shacl#NodeShape'; // Replace with your object URI
    const objectNode = $rdf.sym(objectURI);

    // Step 4:  Retrieve specific triples by shape.
    let shapes: Array<string> = [];
    const triples = store.match(null, predicateNode, objectNode);

    triples.forEach((triple) => {
      // console.log(`Triple: ${triple.subject.value} ${triple.predicate.value} ${triple.object.value}`);
      const shape = triple.subject.value;
      shapes.push(trimShapes(shape));

    });
    return shapes;
  },
}



