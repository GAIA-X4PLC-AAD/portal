import axios from 'axios';

import { Ontology, ShapesAndOntologiesInput } from '../types/ontologies.model';

import { fetchOntologies } from './ontologyService.utils';
import { fetchShapes } from './shapeService.utils';

const serverUrl: string = 'https://fc-server.gxfs.gx4fm.org';

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
  const encodedUrl = encodeURIComponent(id);
  const endpoint = serverUrl + '/schemas/' + encodedUrl;

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

    const endpoint = 'https://sd-creation-wizard-api.gxfs.gx4fm.org/convertFile';

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

export const getAllOntologies = async () => {
  const response = await getAllSchemas();
  return (response ? await fetchOntologies(response.ontologies) : []) as Ontology[];
};

export const getAllShapes = async () => {
  const response = await getAllSchemas();
  return response ? fetchShapes(response.shapes) : [];
};
