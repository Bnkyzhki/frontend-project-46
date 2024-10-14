import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { compareFiles } from '../compare.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('compares two flat JSON files correctly', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const expectedOutput = readFile('expected_result.txt').replace(/\s+/g, ' ').trim();

  const result = compareFiles(filePath1, filePath2).replace(/\s+/g, ' ').trim();
  expect(result).toEqual(expectedOutput);
});
