const BASE_URL = "http://localhost:3000";

interface ApiResponse <T> {
    statusCode: number;
    message: string;
    data: T;

}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  data: any;
}
export const tokenManager = {
  getToken: () => localStorage.getItem("access_token"),
  getRefreshToken: () => localStorage.getItem("refresh_token"),
  setTokens: (access: string, refresh: string) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
  },
  clear: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};


async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = tokenManager.getToken();

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}), 
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message ?? `Erreur ${response.status}`);
  }

  const json: ApiResponse<T> = await response.json();
  return json.data;
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

  // ── Auth spécifique ─────────────────────────────
  async login(email: string, password: string) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message ?? "Erreur de connexion");
    }

    const data: LoginResponse = await response.json();
    console.log("Login réussi !");
    console.log("Access token:", data.access_token);
    console.log("Refresh token:", data.refresh_token);
    console.log("User:", data.data);
    tokenManager.setTokens(data.access_token, data.refresh_token); 
    return data.data;
  },

  logout() {
    tokenManager.clear();
  },
};