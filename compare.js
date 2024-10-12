import fs from 'fs';
import path from 'path';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(content);
};

export const compareFiles = (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const allKeys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)])).sort();

  const result = allKeys.map((key) => {
    if (!(key in data2)) {
      return `  - ${key}: ${data1[key]}`; // Удалённый ключ с отступом
    }
    if (!(key in data1)) {
      return `  + ${key}: ${data2[key]}`; // Новый ключ с отступом
    }
    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`; // Изменение значения с отступами
    }
    return `    ${key}: ${data1[key]}`; // Нет изменений с отступом
  });
  

  return `{\n${result.join('\n')}\n}`; // Возвращаем отформатированный вывод
};

