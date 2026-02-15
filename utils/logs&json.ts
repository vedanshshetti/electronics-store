import fs from 'fs';

export const readJSON = <T = any>(filePath: string): T =>
  JSON.parse(fs.readFileSync(filePath, 'utf8'));

export const readTXT = (filePath: string): string =>
  fs.readFileSync(filePath, 'utf8');

export const writeJSON = (
  filePath: string,
  data: any,
  updateArray: boolean
): void => {
  if (!updateArray) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } else {
    const existingData = readJSON<any[]>(filePath);
    existingData.push(data);
    writeJSON(filePath, existingData, false);
  }
};

export const log = (filePath: string, data: any): void => {
  const previous = readTXT(filePath);
  const entry = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, `${previous}${entry}\n`);
};