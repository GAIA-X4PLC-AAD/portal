/* test coverage not required */
import { createContext } from 'react';

import { RDetails } from '../../types/resources.model';

export const ResourceDetailsContext = createContext<RDetails | undefined>(undefined);
