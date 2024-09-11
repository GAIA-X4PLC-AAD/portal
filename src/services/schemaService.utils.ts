import { getConvertedFile, getSchemaById } from './schemaApiService';

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
  try {
    const response = await getConvertedFile(id);
    const filename = id + '.json';

    const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' });

    const element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    element.download = filename;

    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  } catch (error) {
    console.error('Error:', error);
  }
};
