import { createContext } from 'react';

import { Shape } from '../types/shapesAndOntologies.model';

export const ShapeContext = createContext<Shape | undefined>(undefined);
