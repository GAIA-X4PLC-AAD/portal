import { createContext } from 'react';

import { ResourceDetails2 } from '../types/resources.model';

export const ResourceDetailsContext = createContext<ResourceDetails2 | undefined>(undefined);
