import axios, { AxiosResponse } from 'axios';

import { AuthContextValues } from '../context/AuthContextValues';
import { Ontology } from '../types/shapesAndOntologies.model';

import { fetchOntologies } from './ontologyService.utils';

const getHeaders = (authContext: AuthContextValues) => {
  return {
    Authorization: `Bearer ${authContext.token}`,
    'Access-Control-Allow-Origin': '*',
  };
}

const serverUrl: string = 'https://fc-server.gxfs.gx4fm.org';

const encodeString = (uri: string): string => {
  return uri.startsWith('http') ? encodeURIComponent(uri) : uri;
}

const getAllSchemas = (
  authContext: AuthContextValues
): Promise<AxiosResponse<any, any>> => {
  const endpoint = serverUrl + '/schemas';
  const headers = getHeaders(authContext);

  return axios
    .options(endpoint, { headers })
    .then(() => {
      return axios.get(endpoint, { headers });
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

const getSchemaWithId = (
  authContext: AuthContextValues,
  id: string
): Promise<AxiosResponse<any, any>> => {
  const encodedUrl = encodeString(id);
  const endpoint = serverUrl + '/schemas/' + encodedUrl;
  const headers = getHeaders(authContext);

  return axios
    .options(endpoint, { headers })
    .then(() => {
      return axios.get(endpoint, { headers });
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export const getAllOntologies = async (authContext: AuthContextValues): Promise<Ontology[]> => {
  const response = await getAllSchemas(authContext);
  console.log('response:', response)
  return fetchOntologies(authContext, response);
};

export const getSchemasByIds = (authContext: AuthContextValues, ids: string[]):  Promise<AxiosResponse<any, any>>[] => {
  return ids.map((id) => getSchemaWithId(authContext, id));
};
