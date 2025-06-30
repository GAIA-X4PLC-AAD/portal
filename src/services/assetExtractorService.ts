import axios, { AxiosInstance } from 'axios';

const BASE_URL = process.env.REACT_APP_ASSET_EXTRACTOR_API_URL;
if (!BASE_URL) {throw new Error('REACT_APP_ASSET_EXTRACTOR_API_URL ist nicht gesetzt.');}

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: 'application/json' }
});

export const AssetExtractorService = {
  async submitAsset(formData: FormData): Promise<{ message: string; data?: any }> {
    const response = await api.post('/submit', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  async getJsonLD(): Promise<any> {
    const response = await api.get('/processJsonLDFile');
    return response.data;
  },

  async getShaclFile(): Promise<string> {
    const response = await api.get('/processShaclFile', {
      headers: { Accept: 'text/turtle' },
      responseType: 'text'
    });
    return response.data;
  },

  async isCombinedJsonReady(): Promise<boolean> {
    try {
      const response = await api.get('/processCombinedJsonFile');
      return response.status === 200;
    } catch (error: any) {
      if (error.response?.status === 204) {return false;}
      throw error;
    }
  },

  async downloadAssetZip(): Promise<Blob> {
    const response = await api.get('/download', { responseType: 'blob' });
    return response.data;
  }
};
