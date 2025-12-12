import { getToken } from "../utils/token";

export async function apiFetch<T>(url: string, options: RequestInit = {}, tokenOverride?: string): Promise<T> {
  const token = tokenOverride ?? getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  try {
    const res = await fetch(`http://localhost:3001/api${url}`, { ...options, headers });

    if (!res.ok) {
      let errorMessage = "API Error";

      try {
        const errorData = await res.json();
        errorMessage = errorData.message || JSON.stringify(errorData);
      } catch {}
      throw new Error(errorMessage);
    }

    return res.json();
  } catch (err: any) {
    throw new Error(err.message || "Network error");
  }
}
