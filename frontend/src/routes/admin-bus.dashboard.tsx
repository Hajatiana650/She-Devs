import { createFileRoute } from "@tanstack/react-router";
import { Bus as BusIcon, CheckCircle, XCircle, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { BUSES } from "@/lib/mock-data";

export const Route = createFileRoute("/admin-bus/dashboard")({
  component: Dashboard,
});

const stats = (() => {
  const total = BUSES.length;
  const aptes = BUSES.filter((b) => b.fitness === "APTE").length;
  const inaptes = total - aptes;
  const renew = BUSES.filter((b) => {
    const d = new Date(b.expirationDate);
    const now = new Date();
    const diff = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff < 60 && diff > 0;
  }).length;
  return { total, aptes, inaptes, renew };
})();

const chartData = [
  { mois: "Jan", visites: 4 }, { mois: "Fév", visites: 6 }, { mois: "Mar", visites: 8 },
  { mois: "Avr", visites: 5 }, { mois: "Mai", visites: 9 }, { mois: "Juin", visites: 7 },
];

function Stat({ label, value, icon: Icon, color, bg }: { label: string; value: number; icon: any; color: string; bg: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase text-muted-foreground">{label}</span>
        <div className={`flex size-8 items-center justify-center rounded-lg ${bg} ${color}`}>
          <Icon size={16} />
        </div>
      </div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Transport</h1>
        <p className="text-sm text-muted-foreground">Vue d'ensemble de la flotte</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Total bus" value={stats.total} icon={BusIcon} color="text-bus" bg="bg-bus-bg" />
        <Stat label="Bus aptes" value={stats.aptes} icon={CheckCircle} color="text-status-success" bg="bg-status-success/10" />
        <Stat label="Bus inaptes" value={stats.inaptes} icon={XCircle} color="text-status-danger" bg="bg-status-danger/10" />
        <Stat label="Visites à renouveler" value={stats.renew} icon={Calendar} color="text-status-warning" bg="bg-status-warning/10" />
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h2 className="font-semibold">Visites techniques (6 derniers mois)</h2>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="mois" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="visites" fill="#185FA5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
