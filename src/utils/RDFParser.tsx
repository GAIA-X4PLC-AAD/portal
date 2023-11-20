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

  parseShapesFromRdfResponse(rdfData: any, option?: string) : string[] {
    // Step 1: Create a rdf graph
    const store = $rdf.graph();
    const baseUriNode = 'https://w3id.org/gaia-x/core#';  // Create a base URI node //TODO:Throws error by parsing
    const turtleData = String(rdfData);

    const contentType = 'text/turtle';
    // Step 2: Parse Turtle data
    try {
      $rdf.parse(turtleData, store, baseUriNode, contentType);
    } catch (error) {
      console.info('Error parsing Turtle data:', error);
    }

    let items: Array<string> = [];
    if(option === 'shapes') {
      items = this.parseNodeShapes(store);
    } else if(option === 'property'){
      items = parseProperties(store, '');
    }
    return items;
  },

  parseNodeShapes(store:any){
    let shapes: Array<string> = [];

    // Step 3: Create NamedNodes
    const predicateURI = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'; // Replace with your predicate URI
    const predicateNode = $rdf.sym(predicateURI);

    const objectURI = 'http://www.w3.org/ns/shacl#NodeShape'; // Replace with your object URI
    const objectNode = $rdf.sym(objectURI);

    const triples = store.match(null, predicateNode, objectNode);

    // Step 4:  Retrieve specific triples by shape.
    // @ts-ignore
    triples.forEach((triple) => {
      // console.log(`Triple: ${triple.subject.value} ${triple.predicate.value} ${triple.object.value}`);
      const shape = triple.subject.value;
      console.log('shape: ', shape);
      shapes.push(trimShapes(shape));
    });
    return shapes;
  },
}

const parseProperties = (store: any, selectedShape: string | undefined) : string[] => {
  let properties: string[] = [];
  // Step 3: Create NamedNodes
  console.log('selectedShape', selectedShape)
    console.log('here')
    const subjectURI = 'http://semanticweb.org/metadatasurveyontology/SurveyResultDataOfferingShape';
    const subjectNode = $rdf.sym(subjectURI);
    const predicateURI = 'http://www.w3.org/ns/shacl#property'; // Replace with your predicate URI
    const predicateNode = $rdf.sym(predicateURI);
    console.log('subjectNode', subjectNode)
    console.log('predicateNode', predicateNode)
    const blankNode = store.match(subjectNode, predicateNode, null);

    console.log('triples',blankNode)

    // Check if a blank node was found
    if (blankNode && blankNode.termType === 'BlankNode') {
      const newpredicateURI = 'http://www.w3.org/ns/shacl#path'; // Replace with your predicate URI
      const newpredicateNode = $rdf.sym(newpredicateURI);
      // Iterate over triples with the blank node as the subject
      const triples = store.match(blankNode, null, null);
      // @ts-ignore
      triples.forEach((triple) => {
        console.log(`Subject: ${triple.subject.value}`);
        console.log(`Predicate: ${triple.predicate.value}`);
        console.log(`Object: ${triple.object.value}`);
        properties.push(triple.object.value);
      });
    } else {
      console.log('Blank node not found or not of type BlankNode.');
    }
    // // Step 4:  Retrieve specific triples by domain.
    // // @ts-ignore
    // triples.forEach((triple) => {
    //   const property = triple.object.value;
    //   // @ts-ignore
    //     properties.push(property);
    // });
  return properties;
}
