export function convertToPrettier(file: string): string {
  try {
    const parsedResponse = JSON.parse(file);
    if (typeof parsedResponse === 'object') {
      return JSON.stringify(parsedResponse, null, 2);
    }
  } catch (jsonError) {
    const stringWithSpaces = file.replace(/{/g, ' { ').replace(/}/g, ' } ');
    const cleanedString = stringWithSpaces.replace(/\s+/g, ' ').trim();
    const countOpeningBraces = (cleanedString.match(/{/g) || []).length + 2;
    let level = 0;
    let formattedString = cleanedString
      .replace(/(\{|\[|\() /g, (match, p1) => {
        level += 2;
        return `${p1}\n${' '.repeat(level)}`;
      })
      .replace(/ (\}|\]|\))/g, (match, p1) => {
        level -= 2;
        return `\n${' '.repeat(level)}${p1}`;
      });

    const matches = formattedString.match(/\{([^{}]+)\}/g);

    if (matches) {
      for (const match of matches) {
        const wordsOnly = match.match(/\b\w+\b/g);
        if (wordsOnly && wordsOnly.length > 1) {
          const indentedWords = wordsOnly
            .map((word) => ' '.repeat(countOpeningBraces) + word)
            .join('\n');
          formattedString = formattedString.replace(
            match,
            `{ \n${indentedWords}\n${' '.repeat(countOpeningBraces - 2)}}`,
          );
        }
      }
    }

    return formattedString;
  }

  return file;
}
