import { schema } from './queries';

export const getSchema = async (url: string) => {
  const result = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      operationName: 'IntrospectionQuery',
      query: schema,
    }),
  });

  console.log(await result.json());
};
