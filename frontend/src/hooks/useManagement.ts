import { useEffect, useState } from "react";
import type { BusManagementItem } from "../type/bus-management";
import { busManagementApi } from "../api/buiManagement.api";

export function useBusManagement(filter: string) {
  const [data, setData] = useState<BusManagementItem[]>([]);
  const [busRetires, setBusRetires] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await busManagementApi.getAll(filter);
        setData(res.data.buses);
        setBusRetires(res.data.busRetires);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  return { data, busRetires, loading };
}