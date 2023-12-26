export function convertToPrettier(file: string): string {
  try {
    const parsedResponse = JSON.parse(file);
    if (typeof parsedResponse === 'object') {
      return JSON.stringify(parsedResponse, null, 2);
    }
  } catch (jsonError) {
    return processGraphQLQuery(file);
  }

  return file;
}

const normalize = (str: string) => {
  const special = [',', '.', ':'];
  const removedSpace = str.split(' ').join('');

  let result = '';

  for (let i = 0; i <= removedSpace.length - 1; i += 1) {
    const current = removedSpace[i];
    const next = removedSpace[i + 1];

    result += current;

    if (special.includes(current)) {
      result += ' ';
    }

    if (next === '{') {
      result += ' ';
    }
  }

  return result;
};

const processGraphQLQuery = (str: string) => {
  const cleanedSpaces = normalize(str);
  let result = '';
  const indentSize = 2;
  let indentLevel = 0;

  for (let i = 0; i <= cleanedSpaces.length - 1; i += 1) {
    const current = cleanedSpaces[i];
    const next = cleanedSpaces[i + 1];
    const prev = cleanedSpaces[i - 1];

    result += current;

    if (current === '{' && next !== '\n') {
      indentLevel += 1;
      result += '\n';
      result += ' '.repeat(indentLevel * indentSize);
    }

    if (current === '\n' && prev === '{') {
      indentLevel += 1;
      result += ' '.repeat(indentLevel * indentSize);
    }

    if (current === '\n' && prev !== '{' && next !== '}') {
      result += ' '.repeat(indentLevel * indentSize);
    }

    if (next === '}') {
      indentLevel -= 1;

      if (current !== '\n') {
        result += '\n';
      }

      result += ' '.repeat(indentLevel * indentSize);
    }
  }

  return result.replace(/query(?!\s)/, 'query ');
};
