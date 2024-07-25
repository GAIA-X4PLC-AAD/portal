import { getConvertedFile, getSchemaById } from './SchemaApiService';

export const downloadTurtleFile = async (id: string) => {
  const response = await getSchemaById(id);
  const filename = id + '.ttl';
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(response));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export const downloadJsonFile = async (id: string) => {
  const response = await getConvertedFile(id);
  const filename = id + '.json';

  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(response));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
