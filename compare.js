import fs from 'fs';
import path from 'path';

const parseFile = (filepath) => {
  const ext = path.extname(filepath);
  const content = fs.readFileSync(filepath, 'utf-8');
  
  if (ext === '.json') {
    return JSON.parse(content);
  }

  throw new Error(`Unsupported file format: ${ext}`);
};

export const compareFiles = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  if (JSON.stringify(data1) === JSON.stringify(data2)) {
    return 'Files are identical';
  } else {
    return 'Files are different';
  }
};
