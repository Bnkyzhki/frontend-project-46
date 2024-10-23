import _ from 'lodash';
import parse from './parsers.js';
import getFormatter from './formatters/formatterSelector.js';
import { getFileData } from './helpers.js';

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  return keys.map((key) => {
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', children: buildDiff(value1, value2) };
    }
    if (!_.isEqual(value1, value2)) {
      return { key, type: 'changed', oldValue: value1, newValue: value2 };
    }
    return { key, type: 'unchanged', value: value1 };
  });
};

export const compareFiles = (filepath1, filepath2, format = 'stylish') => {
  const { content: content1, extension: format1 } = getFileData(filepath1);
  const { content: content2, extension: format2 } = getFileData(filepath2);

  const data1 = parse(content1, format1);
  const data2 = parse(content2, format2);

  const diff = buildDiff(data1, data2);
  const formatter = getFormatter(format);
  return formatter(diff);
};
