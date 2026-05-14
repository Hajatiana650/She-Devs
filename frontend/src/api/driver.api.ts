// api/driver.api.ts

import { apiClient } from "@/lib/api-client";
import type { Driver, DriverResponse } from "../type/driver";

export const driverApi = {
  getAll: async (): Promise<DriverResponse> => {
    return apiClient.get<DriverResponse>("/driver");
  },

  getDrivers: async (): Promise<Driver[]> => {
    const res = await apiClient.get<DriverResponse>("/driver");
    return res;
  },
};