import { useEffect, useState } from "react";
import { campaignApi, type Campaign } from "@/api/trash.api";

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await campaignApi.getAll();
        setCampaigns(Array.isArray(data) ? data : data.campaigns || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur de chargement");
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createCampaign = async (campaignData: Partial<Campaign>) => {
    try {
      const newCampaign = await campaignApi.create(campaignData);
      setCampaigns((prev) => [...prev, newCampaign]);
      return newCampaign;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de création");
      throw err;
    }
  };

  const updateCampaign = async (id: number, campaignData: Partial<Campaign>) => {
    try {
      const updated = await campaignApi.update(id, campaignData);
      setCampaigns((prev) =>
        prev.map((c) => (c.id === id ? updated : c))
      );
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de mise à jour");
      throw err;
    }
  };

  const deleteCampaign = async (id: number) => {
    try {
      await campaignApi.delete(id);
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de suppression");
      throw err;
    }
  };

  return {
    campaigns,
    loading,
    error,
    createCampaign,
    updateCampaign,
    deleteCampaign,
  };
}
