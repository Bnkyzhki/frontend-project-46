import { parse } from './parsers.js';
import path from 'path';

export const compareFiles = (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  const allKeys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)])).sort();

  const result = allKeys.map((key) => {
    if (!(key in data2)) {
      return `- ${key}: ${data1[key]}`;
    }
    if (!(key in data1)) {
      return `+ ${key}: ${data2[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return `- ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    return `  ${key}: ${data1[key]}`;
  });

  return `{\n${result.join('\n')}\n}`;
};
