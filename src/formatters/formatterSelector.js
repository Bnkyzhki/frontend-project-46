import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (format) => {
  switch (format) {
    case 'plain':
      return plain;
    case 'json':
      return (diff) => JSON.stringify(diff, null, 2);
    case 'stylish':
    default:
      return stylish;
  }
};

export default getFormatter;
