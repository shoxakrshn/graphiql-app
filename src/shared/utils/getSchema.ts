import { schema } from './queries';

export interface SchemaType {
  name: string;
  fields?: FieldType[];
}

export interface FieldType {
  name: string;
  type: {
    name: string;
  };
  description?: string;
  fields?: FieldType[];
}

export const getSchema = async (url: string) => {
  const result = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      operationName: 'IntrospectionQuery',
      query: schema,
    }),
  });

  return await result.json();
};
