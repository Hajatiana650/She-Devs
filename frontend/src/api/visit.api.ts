import { apiClient } from "@/lib/api-client";
import type { VisitResponse, Visit } from "../type/visit.type";
import type { VisitPayload } from "../type/visit.type";

export const visitApi = {
  getAll: async (): Promise<Visit[]> => {
    const res = await apiClient.get<VisitResponse>("/visit");
    return res.data;
  },
   create: async (payload: VisitPayload): Promise<void> => {
  return apiClient.post("/visit", payload);
},
};