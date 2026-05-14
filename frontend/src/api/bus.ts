import { apiClient } from "@/lib/api-client";
import type { BusResponse, Bus } from "../type/bus";  

export const busApi = {
  getAll: async (): Promise<BusResponse> => {
    return apiClient.get<BusResponse>("/bus");
  },

  getMyBus: async (): Promise<Bus> => {
    const response = await apiClient.get<BusResponse>("/bus");
    return response.data[0];
  },
};