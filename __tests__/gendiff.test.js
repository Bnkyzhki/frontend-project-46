import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import compareFiles from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff', () => {
  test('compares two JSON files with nested structures', () => {
    const filePath1 = getFixturePath('file1.json');
    const filePath2 = getFixturePath('file2.json');
    const expectedOutput = readFile('expected_output_stylish.txt');
    const result = compareFiles(filePath1, filePath2);
    expect((result)).toEqual((expectedOutput));
  });
});
