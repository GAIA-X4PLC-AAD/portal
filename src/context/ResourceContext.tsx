import { createContext } from 'react';

import { SelfDescription } from '../types/resources.model';

export const ResourceContext = createContext<SelfDescription | undefined>(undefined);
