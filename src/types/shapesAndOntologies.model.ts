export interface Link {
    source: string;
    target: string;
}

export interface Node {
    id: string;
    label: string;
}

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
    nodes: Node[];
    links: Link[];
}

export interface ShapesAndOntologiesInput {
    ontologies: string[];
    shapes: string[];
    vocabularies: string[];
}
