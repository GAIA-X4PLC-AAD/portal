import { createContext } from 'react';

import { Ontology } from '../types/shapesAndOntologies.model';

export const OntologyContext = createContext<Ontology | undefined>(undefined);
