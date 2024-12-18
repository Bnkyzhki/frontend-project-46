const getIndent = (depth) => ' '.repeat(depth * 4 - 2);
const getBracketIndent = (depth) => {
  const indentSize = (depth - 1) * 4 - 2;
  return indentSize > 0 ? ' '.repeat(indentSize) : '';
};

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const indent = getIndent(depth + 1);
  const bracketIndent = getBracketIndent(depth + 1);

  const lines = Object.entries(value).map(([key, val]) => `${indent}  ${key}: ${stringify(val, depth + 1)}`);

  return `{\n${lines.join('\n')}\n${bracketIndent}  }`;
};

const stylish = (data) => {
  const iter = (nodes, depth = 1) => {
    const indent = getIndent(depth);
    const lines = nodes.map((node) => {
      switch (node.type) {
        case 'added':
          return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;
        case 'removed':
          return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;
        case 'changed':
          return `${indent}- ${node.key}: ${stringify(node.oldValue, depth)}\n${indent}+ ${node.key}: ${stringify(node.newValue, depth)}`;
        case 'unchanged':
          return `${indent}  ${node.key}: ${stringify(node.value, depth)}`;
        case 'nested':
          return `${indent}  ${node.key}: ${iter(node.children, depth + 1)}`;
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    });

    const bracketIndent = depth === 1 ? '}' : `${getBracketIndent(depth)}  }`;
    return `{\n${lines.join('\n')}\n${bracketIndent}`;
  };

  return iter(data);
};

export default stylish;
