import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { compareFiles } from '../compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff', () => {
  test('compares two JSON files with nested structures', () => {
    const filePath1 = getFixturePath('file1.json');
    const filePath2 = getFixturePath('file2.json');
    const expectedOutput = `{
      common: {
        + follow: false
          setting1: Value 1
        - setting2: 200
        - setting3: true
        + setting3: null
        + setting4: blah blah
        + setting5: {
              key5: value5
          }
          setting6: {
              doge: {
                - wow: 
                + wow: so much
              }
              key: value
            + ops: vops
          }
      }
      group1: {
        - baz: bas
        + baz: bars
          foo: bar
        - nest: {
              key: value
          }
        + nest: str
      }
    - group2: {
          abc: 12345
          deep: {
              id: 45
          }
      }
    + group3: {
          deep: {
              id: {
                  number: 45
              }
          }
          fee: 100500
      }
  }`;

  const normalizeWhitespace = (str) => str.replace(/\s+/g, ' ').trim();

  const result = compareFiles(filePath1, filePath2);
  expect(normalizeWhitespace(result)).toEqual(normalizeWhitespace(expectedOutput));
  });
});
