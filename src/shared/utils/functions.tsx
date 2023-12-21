export function convertToPrettier(file: string): string {
  try {
    const parsedResponse = JSON.parse(file);
    if (typeof parsedResponse === 'object') {
      return JSON.stringify(parsedResponse, null, 2);
    }
  } catch (jsonError) {
    const cleanedString = file.replace(/\s+/g, ' ').trim();

    let level = 0;
    const formattedString = cleanedString
      .replace(/(\{|\[|\() /g, (match, p1) => {
        level += 2;
        return `${p1}\n${' '.repeat(level)}`;
      })
      .replace(/ (\}|\]|\))/g, (match, p1) => {
        level -= 2;
        return `\n${' '.repeat(level)}${p1}`;
      });

    return formattedString;
  }

  return file;
}
