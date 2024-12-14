import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import compareFiles from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff', () => {
  test.each([
    {
      description: 'compares two JSON files with nested structures',
      format: 'stylish',
      expectedFile: 'expected_output_stylish.txt',
      parser: (data) => data,
    },
    {
      description: 'compares two JSON files and outputs in JSON format',
      format: 'json',
      expectedFile: 'expected_output_json.json',
      parser: JSON.parse,
    },
    {
      description: 'compares two JSON files with nested structures using plain format',
      format: 'plain',
      expectedFile: 'expected_result_plain.txt',
      parser: (data) => data.trim().replace(/\s+/g, ' '),
    },
  ])('$description', ({ format, expectedFile, parser }) => {
    const filePath1 = getFixturePath('file1.json');
    const filePath2 = getFixturePath('file2.json');
    const expectedOutput = parser(readFile(expectedFile));
    const result = parser(compareFiles(filePath1, filePath2, format));
    expect(result).toEqual(expectedOutput);
  });
});
