import { apiClient } from "@/lib/api-client";
import type { BusResponse, Bus } from "../src/type/bus";

export const busApi = {
  async getAll(): Promise<Bus[]> {
    const res = await apiClient.get<BusResponse>("/bus");
    return res.data;
  },

  async getById(id: number): Promise<Bus> {
    const res = await apiClient.get<{ data: Bus }>(`/bus/${id}`);
    return res.data;
  },
};