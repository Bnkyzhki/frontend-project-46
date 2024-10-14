import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const getFileExtension = (filepath) => path.extname(filepath).slice(1);

export const parse = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8');
  const extension = getFileExtension(filepath);

  switch (extension) {
    case 'json':
      return JSON.parse(content);
    case 'yaml':
    case 'yml':
      return yaml.load(content);
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
};
