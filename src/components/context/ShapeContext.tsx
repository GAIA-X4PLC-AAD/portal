import { createContext } from 'react';

import { Shape } from '../../types/shapes.model';

export const ShapeContext = createContext<Shape | undefined>(undefined);
