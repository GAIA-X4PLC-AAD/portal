import { createContext } from 'react';

import { ISelfDescription } from '../utils/dataMapper';

export const SelfDescriptionContext = createContext<ISelfDescription | undefined>(undefined);
