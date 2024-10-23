const getIndent = (depth) => ' '.repeat(depth * 4);
const getBracketIndent = (depth) => ' '.repeat(Math.max((depth - 1) * 4, 0));

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const indent = getIndent(depth);
  const bracketIndent = getBracketIndent(depth);

  const lines = Object.entries(value).map(([key, val]) => {
    return `${indent}${key}: ${stringify(val, depth + 1)}`;
  });

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

const stylish = (data) => {
  const iter = (nodes, depth = 0) => {
    const indent = getIndent(depth);
    const lines = nodes.map((node) => {
      switch (node.type) {
        case 'added':
          return `${indent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'deleted':
          return `${indent}- ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'changed':
          return `${indent}- ${node.key}: ${stringify(node.oldValue, depth + 1)}\n${indent}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`;
        case 'unchanged':
          return `${indent}  ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'nested':
          return `${indent}  ${node.key}: ${iter(node.children, depth + 1)}`;
        case 'removed':
          return `${indent}- ${node.key}: ${stringify(node.value, depth + 1)}`;
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    });

    return `{\n${lines.join('\n')}\n${getBracketIndent(depth)}}`;
  };

  return iter(data);
};

export default stylish;
