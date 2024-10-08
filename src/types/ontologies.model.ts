import { Shape } from './shapes.model';

export interface Link {
    source: string;
    target: string;
}

export interface Node {
    id: string;
    label: string;
    type: string;
}

export interface Ontology {
    subject: string;
    contributors: string[];
    description: string;
    version: string;
    nodes: Node[];
    links: Link[];
    relatedShapes: Shape[];
}

export interface ShapesAndOntologiesInput {
    ontologies: string[];
    shapes: string[];
    vocabularies: string[];
}
