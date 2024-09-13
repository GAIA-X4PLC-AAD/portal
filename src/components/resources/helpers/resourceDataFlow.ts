import { AuthContextType } from '../../../context/AuthContextProvider';
import { CypherQueryApiService as cypherQuery } from '../../../services/cypherQueryApiService';
import { Resource } from '../../../types/resources.model';
import { mapResources } from '../../../utils/dataMapper';

import { Asset } from './resourceFilterAssetHelper';

export const loadResources = async (authContext: AuthContextType, typeAssets: Asset[]): Promise<Resource[]> => {
  return cypherQuery
    .getAllResources(authContext, typeAssets)
    .then((resourceInput) => mapResources(resourceInput))
    .catch(error => {
      console.error('Error fetching resources:', error);
      throw error;
    });
}
