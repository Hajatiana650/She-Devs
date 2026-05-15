import { apiClient } from "../lib/api-client";

export interface Signal {
  id: number;
  quartier: string;
  reportedBy: string;
  date: string;
  priority: "HAUTE" | "NORMALE" | "BASSE";
  status: "EN ATTENTE" | "PRIS EN COMPTE" | "TRAITÉ";
  photo: string;
}

export interface DashboardStats {
  pending: number;
  planned: number;
  done: number;
  priorityQ: number;
}

export interface Campaign {
  id: number;
  title: string;
  date: string;
  quartiers: string[];
  participants: number;
  status: "EN COURS" | "PLANIFIÉE" | "TERMINÉE";
}

export const trashApi = {
  // Dashboard
  getDashboard: async () => {
    const response = await apiClient.get("/trash/dashboard");
    return response.data;
  },

  // Signals / Signalements
  getSignals: async () => {
    const response = await apiClient.get("/trash/signals");
    return response.data;
  },

  createSignal: async (data: Partial<Signal>) => {
    const response = await apiClient.post("/trash/signal", data);
    return response.data;
  },

  validateSignal: async (id: number) => {
    const response = await apiClient.patch(`/trash/validate/${id}`, {});
    return response.data;
  },

  deleteSignal: async (id: number) => {
    const response = await apiClient.delete(`/trash/${id}`);
    return response.data;
  },
};

export const campaignApi = {
  // Get all campaigns
  getAll: async () => {
    const response = await apiClient.get("/campaign");
    return response.data;
  },

  // Get single campaign
  getOne: async (id: number) => {
    const response = await apiClient.get(`/campaign/${id}`);
    return response.data;
  },

  // Create campaign
  create: async (data: Partial<Campaign>) => {
    const response = await apiClient.post("/campaign", data);
    return response.data;
  },

  // Update campaign
  update: async (id: number, data: Partial<Campaign>) => {
    const response = await apiClient.patch(`/campaign/${id}`, data);
    return response.data;
  },

  // Delete campaign
  delete: async (id: number) => {
    const response = await apiClient.delete(`/campaign/${id}`);
    return response.data;
  },
};
