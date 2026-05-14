import { apiClient } from "@/lib/api-client";
import type { BusManagementResponse } from "../type/bus-management";

export const busManagementApi = {
  getAll: async (filter: string): Promise<BusManagementResponse> => {
    return apiClient.get<BusManagementResponse>(
      `/admin/dashboard/bus/management?filter=${filter}`
    );
  },
};