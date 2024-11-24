import { createContext } from 'react';

import { Ontology } from '../../../types/ontologies.model';

export const OntologyContext = createContext<Ontology | undefined>(undefined);
