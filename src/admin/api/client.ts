const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = "admin_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  auth?: boolean;
}

export async function apiRequest<T>(path: string, opts: ApiOptions = {}): Promise<T> {
  const { method = "GET", body, auth = true } = opts;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // 401 → token noto'g'ri/expired → logout
  if (response.status === 401) {
    clearToken();
    window.location.href = "/admin/login";
    throw new Error("Unauthorized");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.error ?? data.message ?? `HTTP ${response.status}`;
    throw new Error(message);
  }

  return data as T;
}