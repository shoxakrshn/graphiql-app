import { IntrospectionQuery, getIntrospectionQuery } from 'graphql';

export interface SchemaType {
  name: string;
  fields: FieldType[];
  description: string;
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
      query: getIntrospectionQuery(),
    }),
  });

  const { data }: { data: IntrospectionQuery } = await result.json();

  const schemaTypes: SchemaType[] = data.__schema.types.map((type) => ({
    name: type.name,
    description: type.description || '',
    fields:
      type.kind === 'OBJECT' && type.fields
        ? type.fields.map((field) => ({
            name: field.name,
            type: {
              name: field.type ? field.type.kind || '' : '',
            },
            description: field.description || '',
          }))
        : [],
  }));

  return schemaTypes;
};
