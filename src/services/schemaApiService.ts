import axios from 'axios';

import { ShapesAndOntologiesInput } from '../types/ontologies.model';

if (!process.env.REACT_APP_FEDERATED_CATALOGUE_API_URL) {
  throw new Error('REACT_APP_FEDERATED_CATALOGUE_API_URL is not defined');
}
const SERVER_BASE_URL: string = process.env.REACT_APP_FEDERATED_CATALOGUE_API_URL;

export const fetchAllSchemas = async (): Promise<ShapesAndOntologiesInput> => {
  const endpoint = SERVER_BASE_URL + '/schemas';

  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    return { ontologies: [], shapes: [], vocabularies: [] }
  }
};

export const getSchemaById = async (id: string) => {
  const encodedUrl = encodeURIComponent(id);
  const endpoint = SERVER_BASE_URL + '/schemas/' + encodedUrl;

  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getConvertedFile = async (id: string) => {
  try {
    const textContent = await getSchemaById(id);
    const blob = new Blob([textContent], { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', blob, 'shaclFile.shacl');

    if (!process.env.REACT_APP_SD_WIZARD_API) {
      throw new Error('REACT_APP_SD_WIZARD_API is not defined');
    }

    const endpoint = process.env.REACT_APP_SD_WIZARD_API + '/convertFile';
    const response = await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

