import { createContext } from 'react';

import { Resource } from '../types/resources.model';

export const ResourceContext = createContext<Resource | undefined>(undefined);
