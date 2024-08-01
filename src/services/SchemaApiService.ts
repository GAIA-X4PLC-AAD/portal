import axios from 'axios';

import { ShapesAndOntologiesInput } from '../types/ontologies.model';

import { fetchOntologies } from './ontologyService.utils';
import { fetchShapes } from './shapeService.utils';

const serverUrl: string = 'https://fc-server.gxfs.gx4fm.org';

const encodeString = (uri: string): string => {
  return encodeURIComponent(uri);
}

const getAllSchemas = async (): Promise<ShapesAndOntologiesInput | undefined> => {
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

export const getConvertedFile = async (id: string)=> {
  const requestBody = await getSchemaById(id);
  const endpoint = 'https://sd-creation-wizard-api.gxfs.gx4fm.org/convertFile';

  try {
    const response = await axios.post(endpoint, requestBody);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export const getAllOntologies = async () => {
  const response = await getAllSchemas();
  return response ? fetchOntologies(response.ontologies) : [];
};

export const getAllShapes = async () => {
  const response = await getAllSchemas();
  return response ? fetchShapes(response.shapes) : [];
};
