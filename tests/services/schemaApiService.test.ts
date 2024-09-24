import axios from 'axios';

import { fetchAllSchemas, getConvertedFile, getSchemaById } from '../../src/services/schemaApiService';
import { readFile } from '../../src/utils/readFile';

const SERVER_BASE_URL: string = 'https://fc-server.gxfs.gx4fm.org';
const CONVERT_SERVER_BASE_URL: string = 'https://sd-creation-wizard-api.gxfs.gx4fm.org/convertFile';
const SHACL_SHAPE_ID = '700f40c0030d83b0ca6ed147144037891b27f4fa73fe596d0092c25b07c9d98b';
const hdmap_shacl_ttl = readFile('tests/__fixtures__/hdmap_shacl.ttl');

const post = jest.spyOn(axios, 'post');
const get = jest.spyOn(axios, 'get');

describe('getConvertedFile', () => {
  beforeEach(() => {
    get.mockReset();
    post.mockReset();
  });

  it('calls the endpoint for conversion with the schema fetched from "getSchemaById"', async () => {
    get.mockResolvedValueOnce({ data: await hdmap_shacl_ttl }); // called by getSchemaById
    post.mockResolvedValueOnce({ data: 'converted data' });

    const result = await getConvertedFile(SHACL_SHAPE_ID);
    expect(get).toBeCalledWith(SERVER_BASE_URL + '/schemas/' + SHACL_SHAPE_ID);

    const blob = new Blob([await hdmap_shacl_ttl], { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', blob, 'shaclFile.shacl');

    const headers = { headers: { 'Content-Type': 'multipart/form-data' } };
    expect(post).toBeCalledWith(CONVERT_SERVER_BASE_URL, formData, headers);
    expect(result).toEqual('converted data');
  });

  it('throw error if axios.post encounters an error', async () => {
    const error = new Error('axios error');

    get.mockResolvedValueOnce({ data: await hdmap_shacl_ttl }); // called by getSchemaById
    post.mockRejectedValueOnce(error);

    await expect(() => getConvertedFile(SHACL_SHAPE_ID)).rejects.toThrow(error);

  });
});

describe('getSchemaById', () => {
  beforeEach(() => {
    get.mockReset();
    post.mockReset();
  });

  it('fetches and returns data from the "SERVER_BASE_URL"', async () => {
    const responseData = await hdmap_shacl_ttl;
    get.mockResolvedValueOnce({ data: responseData });

    const result = await getSchemaById(SHACL_SHAPE_ID);
    expect(result).toEqual(responseData);
    expect(get).toHaveBeenCalledWith(SERVER_BASE_URL + '/schemas/' + SHACL_SHAPE_ID);
  });

  it('throws error if axios.get encounters an error', async () => {
    const error = new Error('axios get error');
    get.mockRejectedValueOnce(error);

    await expect(() => getSchemaById(SHACL_SHAPE_ID)).rejects.toThrow(error);
  });
});

describe('fetchAllSchemas', () => {
  beforeEach(() => {
    get.mockReset();
    post.mockReset();
  });

  it('fetches data from the "SERVER_BASE_URL"', async () => {
    const responseData = { ontologies: [], shapes: [], vocabularies: [] };
    get.mockResolvedValueOnce({ data: responseData });

    const result = await fetchAllSchemas();
    expect(result).toEqual(responseData);
    expect(get).toHaveBeenCalledWith(SERVER_BASE_URL + '/schemas');
  });

  it('returns default values if axios.get encounters an error', async () => {
    const error = new Error('axios get error');
    get.mockRejectedValueOnce(error);

    const result = await fetchAllSchemas();
    expect(result).toEqual({ ontologies: [], shapes: [], vocabularies: [] });
  });
});
