export interface Shape {
    label: string;
    comment: string;
    subClasses: string[];
}

export interface Ontology {
    subject: string;
    contributors: string[];
    description: string;
    version: string;
    shapes: Shape[];
    claimsGraphUri?: string;
    graphLink?: string;
    downloadLink?: string;
    linksForOfferings?: string[];
    relatedOntologies?: Ontology[];
}

export interface ShapesAndOntologiesInput {
    ontologies: string[];
    shapes: string[];
    vocabularies: string[];
}
