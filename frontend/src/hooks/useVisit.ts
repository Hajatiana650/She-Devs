import { useQuery } from "@tanstack/react-query";
import { visitApi } from "@/api/visit.api";

export function useVisits() {
  return useQuery({
    queryKey: ["visits"],
    queryFn: visitApi.getAll,
  });
}
