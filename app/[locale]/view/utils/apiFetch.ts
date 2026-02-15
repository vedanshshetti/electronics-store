// utils/apiFetch.ts
const apiFetch = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error("Fetch failed");
  const result = await res.json();
  return result;
};

export default apiFetch;