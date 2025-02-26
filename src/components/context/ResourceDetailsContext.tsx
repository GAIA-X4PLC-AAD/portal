/* test coverage not required */
import { createContext } from 'react';

import { CombinedDetails } from '../../types/resources.model';

export const ResourceDetailsContext = createContext<CombinedDetails | undefined>(undefined);
