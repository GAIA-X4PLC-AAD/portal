import { createContext } from 'react';

import { SelfDescription } from '../types/resources.model';

export const SelfDescriptionContext = createContext<SelfDescription | undefined>(undefined);
