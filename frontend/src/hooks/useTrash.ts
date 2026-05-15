import { useEffect, useState } from "react";
import { trashApi, type Signal, type DashboardStats } from "@/api/trash.api";

export function useTrashDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await trashApi.getDashboard();
        setStats(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur de chargement");
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { stats, loading, error };
}

export function useTrashSignals() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await trashApi.getSignals();
        setSignals(Array.isArray(data) ? data : data.signals || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur de chargement");
        setSignals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const validateSignal = async (id: number) => {
    try {
      await trashApi.validateSignal(id);
      setSignals((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, status: "PRIS EN COMPTE" as const } : s
        )
      );
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de validation");
      return false;
    }
  };

  const deleteSignal = async (id: number) => {
    try {
      await trashApi.deleteSignal(id);
      setSignals((prev) => prev.filter((s) => s.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de suppression");
      return false;
    }
  };

  return { signals, loading, error, validateSignal, deleteSignal };
}
