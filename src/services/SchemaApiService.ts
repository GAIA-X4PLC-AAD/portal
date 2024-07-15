import axios from 'axios';

import { fetchOntologies } from './ontologyService.utils';
import { fetchShapes } from './shapeService.utils';

const serverUrl: string = 'https://fc-server.gxfs.gx4fm.org';

const encodeString = (uri: string): string => {
  return uri.startsWith('http') ? encodeURIComponent(uri) : uri;
}

const getAllSchemas = async () => {
  const endpoint = serverUrl + '/schemas';

  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getSchemaById = async (id: string) => {
  const encodedUrl = encodeString(id);
  const endpoint = serverUrl + '/schemas/' + encodedUrl;

  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getAllOntologies = async () => {
  const response = await getAllSchemas();
  return fetchOntologies(response);
};

export const getAllShapes = async () => {
  const response = await getAllSchemas();
  return fetchShapes(response);
};
