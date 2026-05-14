import { useQuery } from "@tanstack/react-query";
import { driverApi } from "@/api/driver.api";
import type { Driver } from "@/type/driver";

export function useDrivers() {
  return useQuery<Driver[]>({
    queryKey: ["drivers"],
    queryFn: driverApi.getAll,
  });
}