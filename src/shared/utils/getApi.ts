export const getAPI = async (
  url: string,
  query: string,
  variables?: string,
  headers?: { [x: string]: string },
) => {
  try {
    const result = await fetch(url, {
      method: 'POST',
      headers: headers || { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!result.ok) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }

    return await result.json();
  } catch (error) {
    throw error;
  }
};
