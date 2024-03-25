const defaultHeader = {
  'Content-Type': 'application/json',
};

export const getAPI = async (
  url: string,
  query: string,
  variables?: string,
  headers?: { [x: string]: string },
) => {
  const result = await fetch(url, {
    method: 'POST',
    headers: headers ? { ...defaultHeader, ...headers } : defaultHeader,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return await result.json();
};
