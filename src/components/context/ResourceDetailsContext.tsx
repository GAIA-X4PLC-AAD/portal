/* test coverage not required */
import { createContext } from 'react';

import { ResourceDetails } from '../../types/resources.model';

export const ResourceDetailsContext = createContext<ResourceDetails | undefined>(undefined);
