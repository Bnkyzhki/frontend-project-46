import fs from 'fs';
import path from 'path';

const getFileExtension = (filepath) => path.extname(filepath).slice(1);

export const getFileData = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8');
  const extension = getFileExtension(filepath);
  return { content, extension };
};
