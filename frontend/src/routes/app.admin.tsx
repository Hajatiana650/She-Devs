import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, TrendingUp, Calendar, Bus, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apiClient, BusDashboardStats, BusManagementDashboard } from "@/lib/api-client";

export const Route = createFileRoute("/app/admin")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState<BusDashboardStats["data"] | null>(null);
  const [buses, setBuses] = useState<BusManagementDashboard["data"] | null>(null);
  const [filter, setFilter] = useState<"all" | "apte" | "inapte" | "expiring">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboard();
  }, [filter]);

  const loadDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      // Charger les statistiques
      const statsResponse = await apiClient.admin.getBusDashboardStats();
      setStats(statsResponse.data);

      // Charger la gestion des buses
      const busesResponse = await apiClient.admin.getBusManagement(filter);
      setBuses(busesResponse.data);
    } catch (err) {
      console.error("Erreur chargement dashboard:", err);
      setError(err instanceof Error ? err.message : "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3BC1A8]/5 to-transparent p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1a1a1a]">Tableau de Bord Admin</h1>
          <p className="mt-2 text-muted-foreground">Gestion de la flotte de buses</p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle className="mr-2 inline-block" size={18} />
            {error}
          </div>
        )}

        {/* Statistics Grid */}
        {stats && (
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Buses Enregistrées"
              value={stats.busEnregistres}
              icon={Bus}
              color="bg-blue-50"
              borderColor="border-blue-200"
            />
            <StatCard
              title="Buses Aptes"
              value={stats.busAptes}
              icon={CheckCircle}
              color="bg-emerald-50"
              borderColor="border-emerald-200"
              valueColor="text-emerald-600"
            />
            <StatCard
              title="Buses Inaptes"
              value={stats.busInaptes}
              icon={AlertCircle}
              color="bg-red-50"
              borderColor="border-red-200"
              valueColor="text-red-600"
            />
            <StatCard
              title="Visites à Renouveler"
              value={stats.visitesARenouveler}
              icon={Calendar}
              color="bg-amber-50"
              borderColor="border-amber-200"
              valueColor="text-amber-600"
            />
          </div>
        )}

        {/* Filter Buttons */}
        <div className="mb-6 flex flex-wrap gap-2">
          {(["all", "apte", "inapte", "expiring"] as const).map((f) => (
            <Button
              key={f}
              onClick={() => setFilter(f)}
              variant={filter === f ? "default" : "outline"}
              className={
                filter === f ? "bg-[#3BC1A8] hover:bg-[#3BC1A8]/90" : ""
              }
            >
              {f === "all" && "Toutes les buses"}
              {f === "apte" && "Buses Aptes"}
              {f === "inapte" && "Buses Inaptes"}
              {f === "expiring" && "Expirant bientôt"}
            </Button>
          ))}
        </div>

        {/* Buses Table */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <div className="mb-3 inline-block">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3BC1A8]/20 border-t-[#3BC1A8]" />
              </div>
              <p className="text-muted-foreground">Chargement...</p>
            </div>
          </div>
        ) : buses && buses.buses.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-xl border border-[#3BC1A8]/20 bg-white"
          >
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#3BC1A8]/10 bg-[#3BC1A8]/5">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#3BC1A8]">
                      Matricule
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#3BC1A8]">
                      Ligne
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#3BC1A8]">
                      Chauffeur
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#3BC1A8]">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#3BC1A8]">
                      Dernière Visite
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#3BC1A8]">
                      Expiration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#3BC1A8]">
                      Jours Restants
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {buses.buses.map((bus, idx) => (
                    <motion.tr
                      key={bus.idBus}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-[#3BC1A8]/10 hover:bg-[#3BC1A8]/5 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-[#1a1a1a]">{bus.matricule}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="border-[#3BC1A8]/30 text-[#3BC1A8]">
                          {bus.ligne}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{bus.chauffeur}</td>
                      <td className="px-6 py-4">
                        <Badge className={
                          bus.statut === "APTE"
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : "bg-red-100 text-red-700 border-red-200"
                        }>
                          {bus.statut}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm">{bus.derniereVisite}</td>
                      <td className="px-6 py-4 text-sm">{bus.expiration}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${
                            bus.joursRestants > 30 ? "text-emerald-600" :
                            bus.joursRestants > 0 ? "text-amber-600" :
                            "text-red-600"
                          }`}>
                            {bus.joursRestants} j
                          </span>
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                            <motion.div
                              className={`h-full rounded-full ${
                                bus.joursRestants > 30 ? "bg-emerald-500" :
                                bus.joursRestants > 0 ? "bg-amber-500" :
                                "bg-red-500"
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${bus.pourcentage}%` }}
                              transition={{ delay: idx * 0.05 + 0.2, duration: 0.8 }}
                            />
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3 p-4">
              {buses.buses.map((bus) => (
                <div key={bus.idBus} className="rounded-lg border border-[#3BC1A8]/10 p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-[#1a1a1a]">{bus.matricule}</div>
                      <div className="text-xs text-muted-foreground">{bus.chauffeur}</div>
                    </div>
                    <Badge className={
                      bus.statut === "APTE"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }>
                      {bus.statut}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-muted-foreground">Dernière visite</div>
                      <div className="font-semibold">{bus.derniereVisite}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Expiration</div>
                      <div className="font-semibold">{bus.expiration}</div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-muted-foreground">Jours restants</span>
                      <span className={`font-semibold ${
                        bus.joursRestants > 30 ? "text-emerald-600" :
                        bus.joursRestants > 0 ? "text-amber-600" :
                        "text-red-600"
                      }`}>{bus.joursRestants}j</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className={`h-full rounded-full ${
                          bus.joursRestants > 30 ? "bg-emerald-500" :
                          bus.joursRestants > 0 ? "bg-amber-500" :
                          "bg-red-500"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${bus.pourcentage}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-[#3BC1A8]/10 bg-[#3BC1A8]/5 px-6 py-3 text-xs text-muted-foreground">
              Buses retirées de service : <span className="font-semibold text-[#1a1a1a]">{buses.busRetires}</span>
            </div>
          </motion.div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#3BC1A8]/20 bg-[#3BC1A8]/5 py-12 text-center">
            <Bus className="mx-auto mb-3 text-[#3BC1A8]/30" size={32} />
            <p className="text-muted-foreground">Aucune bus trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  borderColor: string;
  valueColor?: string;
}

function StatCard({ title, value, icon: Icon, color, borderColor, valueColor }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${color} rounded-xl border ${borderColor} p-6 transition-all hover:shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={`mt-2 text-3xl font-bold ${valueColor || "text-[#1a1a1a]"}`}>{value}</p>
        </div>
        <div className="rounded-lg bg-white/50 p-3">
          <Icon size={24} className="text-[#3BC1A8]" />
        </div>
      </div>
    </motion.div>
  );
}
