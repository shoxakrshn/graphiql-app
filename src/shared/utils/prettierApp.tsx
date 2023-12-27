export function convertToPrettier(file: string): string {
  try {
    const parsedResponse = JSON.parse(file);
    if (typeof parsedResponse === 'object') {
      return JSON.stringify(parsedResponse, null, 2);
    }
  } catch (jsonError) {
    return workWithQuery(file);
  }

  return file;
}

const workWithQuery = (graphqlQuery: string) => {
  // Add an array that contains values ​​equal to the line up to { or between two { {
  const queryArray = graphqlQuery.split('{').map((substring, index, array) => {
    const modifiedSubstring = index < array.length - 1 ? substring + '{' : substring;
    // Delete '{' and '}', leaving spaces and line breaks
    let result = modifiedSubstring.replace(/[{}]/g, '').replace(/\s+/g, ' ').trim();

    // If there are no '(' or ')' characters in the line, add a line break after each value except the last one
    if (!result.includes('(') && !result.includes(')')) {
      const values = result.split(/\s+/);
      result = values.map((value, i) => (i < values.length - 1 ? value + '\n' : value)).join(' ');
    }
    result = result.trim();
    return result;
  });

  const numberClosures = queryArray.length - 1;
  const assembledQuery = queryArray
    .map((substring, index, array) => {
      // Add a space and '{' after each line except the last one
      return index < array.length - 1 ? substring + ' {' : substring;
    })
    .join('\n');

  // Add '}' and linebreak numberClosures number of times
  const finalQuery = assembledQuery + ('\n' + '}').repeat(numberClosures);

  const res = processGraphQLQuery(finalQuery);
  return res;
};

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
