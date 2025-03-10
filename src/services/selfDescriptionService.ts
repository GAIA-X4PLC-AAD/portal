/* test coverage not required */
import axios from 'axios';

import { SelfDescription } from '../types/selfDescription.model';

function getEndpoint(route: string) {
  if (!process.env.REACT_APP_FEDERATED_CATALOGUE_API_URL) {
    throw new Error('REACT_APP_FEDERATED_CATALOGUE_API_URL is not defined');
  }
  const serverUrl = process.env.REACT_APP_FEDERATED_CATALOGUE_API_URL;
  return serverUrl + route;
}

export const SelfDescriptionApiService = {
  /**
     * Returns all self-descriptions with statuses REVOKED, ACTIVE, DEPRECATED
     */
  async getAllSelfDescriptions(): Promise<{items: SelfDescription[]}> {
    const endpoint = getEndpoint('/self-descriptions?statuses=REVOKED,ACTIVE,DEPRECATED');

    try {
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
      return { items: [] };
    }
  },

  /**
     * Returns a self-description by hash
     * @param hash the hash of the self-description
     */
  async getSelfDescriptionWithDetails(hash: string) {
    const endpoint = getEndpoint('/self-descriptions/' + hash);

    try {
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
