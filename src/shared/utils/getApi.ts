export const getAPI = async (url: string) => {
  const result = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
         query AllCharacters {
          characters {
            results {
              id
              name
              status
            }
          }
        }
        `,
    }),
  });

  console.log(result);
};
