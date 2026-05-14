import { useQuery } from "@tanstack/react-query";
import { busApi } from "@/api/bus";
import type { Bus } from "../type/bus";

export function useMyBus() {
  return useQuery({
    queryKey: ["my-bus"],
    queryFn: busApi.getMyBus,
    staleTime: 1000 * 60 * 5, 
  });
}

export function useBuses() {
  return useQuery<Bus[]>({
    queryKey: ["buses"],
    queryFn: async () => {
      const res = await busApi.getAll();
      return res.data; 
    },
  });
}