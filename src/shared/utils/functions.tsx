import { parse, DocumentNode, print } from 'graphql';

export function convertToPrettier(file: string): string {
  try {
    const parsedResponse = JSON.parse(file);
    if (typeof parsedResponse === 'object') {
      return JSON.stringify(parsedResponse, null, 2);
    }
  } catch (jsonError) {
    return formatGraphQL(file);
  }

  return file;
}
function formatGraphQL(query: string): string {
  try {
    const parsedQuery: DocumentNode = parse(query, { noLocation: true });
    const formattedQuery = print(parsedQuery);
    return `query ${formattedQuery}`;
  } catch (error) {
    return query;
  }
}
