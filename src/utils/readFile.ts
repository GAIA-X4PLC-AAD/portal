import * as fs from 'fs';
export async function readFile(filePath: string): Promise<string> {
  try {
    return await fs.promises.readFile(filePath, 'utf8');
  } catch (err) {
    console.log('Read File Error: ', err);
    throw err;
  }
}

