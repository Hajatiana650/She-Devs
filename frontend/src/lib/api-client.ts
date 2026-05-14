const BASE_URL = "http://localhost:3000";

interface LoginResponse<T> {
  access_token: string;
  refresh_token: string;
  user: T;
}

export const tokenManager = {
  getToken: () => localStorage.getItem("access_token"),

  getRefreshToken: () =>
    localStorage.getItem("refresh_token"),

  setTokens: (access: string, refresh: string) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
  },

  clear: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = tokenManager.getToken();

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? { Authorization: `Bearer ${token}` }
        : {}),
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    throw new Error(error.message ?? `Erreur ${response.status}`);
  }

  
  const json = await response.json();

  return json;
}

export const apiClient = {
  get<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint);
  },

  post<T>(endpoint: string, body: unknown): Promise<T> {
    return request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  patch<T>(endpoint: string, body: unknown): Promise<T> {
    return request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  delete<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, { method: "DELETE" });
  },

  async login<T>(email: string, password: string): Promise<T> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));

      throw new Error(error.message ?? "Erreur de connexion");
    }

    const json: LoginResponse<T> = await response.json();
    console.log("Token reçu :", json.access_token);        
  console.log(" Full response :", json);

    tokenManager.setTokens(
      json.access_token,
      json.refresh_token
    );

    return json.user; 
  },

  logout() {
    tokenManager.clear();
  },
};