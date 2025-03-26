export const downloadFile = (fileName: string, data: any) => {
  try {
    const filename = fileName + '.json';

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });

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
