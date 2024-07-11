import axios, { AxiosResponse } from 'axios';

import { AuthContextType } from '../context/AuthContextProvider';

import { fetchOntologies } from './ontologyService.utils';
import { fetchShapes } from './shapeService.utils';

const getHeaders = (authContext: AuthContextType) => {
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
  authContext: AuthContextType
) => {
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

export const getSchemaById = (
  authContext: AuthContextType,
  id: string
) => {
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

export const getAllOntologies = async (authContext: AuthContextType) => {
  const response = await getAllSchemas(authContext);
  return fetchOntologies(authContext, response);
};

export const getSchemasByIds = (authContext: AuthContextType, ids: string[]):  Promise<AxiosResponse<any, any>>[] => {
  return ids.map((id) => getSchemaById(authContext, id));
};

export const getAllShapes = async (authContext: AuthContextType) => {
  const response = await getAllSchemas(authContext);
  return fetchShapes(authContext, response);
};
