import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const buildPath = (ancestors, key) => [...ancestors, key].join('.');

const plain = (diff, ancestors = []) => {
  const lines = diff.flatMap((node) => {
    const property = buildPath(ancestors, node.key);

    switch (node.type) {
      case 'added':
        return `Property '${property}' was added with value: ${formatValue(node.value)}`;
      case 'removed':
        return `Property '${property}' was removed`;
      case 'changed':
        return `Property '${property}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
      case 'nested':
        return plain(node.children, [...ancestors, node.key]);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return lines.join('\n');
};

export default plain;
