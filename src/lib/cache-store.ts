const cache = new Map<string, any>();

export const cacheFetch = async <T>(url: string): Promise<T> => {
  if (cache.has(url)) {
    return cache.get(url) as T;
  }

  const response = await fetch(url);
  const data = await response.json();
  cache.set(url, data);
  return data;
};
