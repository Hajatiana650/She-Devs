const BASE_URL = "http://localhost:3000";

interface LoginResponse<T> {
  access_token: string;
  refresh_token: string;
  user: T;
}

export interface BusDashboardStats {
  statusCode: number;
  message: string;
  data: {
    busEnregistres: number;
    busAptes: number;
    busInaptes: number;
    visitesARenouveler: number;
  };
}

export interface BusManagementItem {
  matricule: string;
  ligne: string;
  chauffeur: string;
  statut: "APTE" | "INAPTE";
  derniereVisite: string;
  expiration: string;
  idBus: number;
  joursRestants: number;
  pourcentage: number;
}

export interface BusManagementDashboard {
  statusCode: number;
  message: string;
  data: {
    busRetires: number;
    buses: BusManagementItem[];
  };
}

export interface TrashDashboardStats {
  statusCode: number;
  message: string;
  data: {
    pendingSignals: number;
    treatedSignals: number;
    collects: number;
    treatmentRate: number;
  };
}

export interface TrashSignal {
  id: number;
  photo: string;
  description: string;
  statut: "EN_ATTENTE" | "TRAITÉ";
  quartier: string;
  utilisateur: string;
  date: string;
}

export interface TrashCollect {
  id: number;
  quartier: string;
  date: string;
  heure: string;
}

export interface TrashSignalsResponse {
  statusCode: number;
  message: string;
  data: {
    signals: TrashSignal[];
    total: number;
  };
}

export interface TrashCollectsResponse {
  statusCode: number;
  message: string;
  data: {
    collects: TrashCollect[];
    total: number;
  };
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
    credentials: 'include', // Important pour les cookies et l'authentification
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
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Erreur inconnue" }));
        console.error("Erreur login:", error);
        throw new Error(error.message ?? `Erreur ${response.status}`);
      }

      const json: LoginResponse<T> = await response.json();
      console.log("Token reçu :", json.access_token);        
      console.log("Full response :", json);

      tokenManager.setTokens(
        json.access_token,
        json.refresh_token
      );

      return json.user; 
    } catch (err) {
      console.error("Erreur lors du fetch:", err);
      if (err instanceof TypeError) {
        throw new Error("Impossible de se connecter au serveur. Vérifiez que le backend est en cours d'exécution sur http://localhost:3000");
      }
      throw err;
    }
  },

  logout() {
    tokenManager.clear();
  },

  /**
   * Admin Dashboard - Statistiques des buses
   */
  admin: {
    // Bus Dashboard
    getBusDashboardStats(): Promise<BusDashboardStats> {
      return request<BusDashboardStats>("/admin/dashboard/bus");
    },

    getBusManagement(filter?: "all" | "apte" | "inapte" | "expiring"): Promise<BusManagementDashboard> {
      const params = filter ? `?filter=${filter}` : "";
      return request<BusManagementDashboard>(`/admin/dashboard/bus/management${params}`);
    },

    // Trash Dashboard
    getTrashDashboardStats(): Promise<TrashDashboardStats> {
      return request<TrashDashboardStats>("/admin/dashboard/trash/stats");
    },

    getTrashSignals(filter?: "all" | "pending" | "treated"): Promise<TrashSignalsResponse> {
      const params = filter ? `?filter=${filter}` : "";
      return request<TrashSignalsResponse>(`/admin/dashboard/trash/signals${params}`);
    },

    getTrashCollects(filter?: "all" | "scheduled" | "planned"): Promise<TrashCollectsResponse> {
      const params = filter ? `?filter=${filter}` : "";
      return request<TrashCollectsResponse>(`/admin/dashboard/trash/collects${params}`);
    },

    updateTrashSignalStatus(id: number, treated: boolean): Promise<any> {
      return request<any>(`/admin/dashboard/trash/signals/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ treated }),
      });
    },

    createTrashCollect(quarterId: number, dateCollect: string): Promise<any> {
      return request<any>("/admin/dashboard/trash/collects", {
        method: "POST",
        body: JSON.stringify({ quarterId, dateCollect }),
      });
    },

    getTrashSignalsByQuarter(quarterId: number): Promise<any> {
      return request<any>(`/admin/dashboard/trash/signals/quarter/${quarterId}`);
    },
  },
};