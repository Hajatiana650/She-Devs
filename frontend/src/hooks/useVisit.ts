import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { visitApi } from "@/api/visit.api";
import type { VisitPayload } from "@/type/visit.type";

export function useVisits() {
  return useQuery({
    queryKey: ["visits"],
    queryFn: visitApi.getAll,
  });
}

export function useCreateVisit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VisitPayload) => visitApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visits"] });
    },
  });
}