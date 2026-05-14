import { useQuery } from "@tanstack/react-query";
import { busApi } from "@/api/bus";

export function useMyBus() {
  return useQuery({
    queryKey: ["my-bus"],
    queryFn: busApi.getMyBus,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}