export interface Link {
    source: string;
    target: string;
}

export interface Node {
    id: string;
    label: string;
    type: string;
}

export interface Shape {
    id: string;
    subject: string;
    content: string [];
}

export interface Ontology {
    subject: string;
    contributors: string[];
    description: string;
    version: string;
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
