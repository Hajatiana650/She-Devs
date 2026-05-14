import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, CalendarCheck, MapPin, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { SIGNALS, QUARTIERS } from "@/lib/mock-data";

export const Route = createFileRoute("/admin-trash/dashboard")({
  component: Dashboard,
});

function Stat({ label, value, icon: Icon, color, bg }: { label: string; value: number; icon: any; color: string; bg: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase text-muted-foreground">{label}</span>
        <div className={`flex size-8 items-center justify-center rounded-lg ${bg} ${color}`}><Icon size={16} /></div>
      </div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
    </div>
  );
}

const collectByQuartier = QUARTIERS.slice(0, 6).map((q, i) => ({ q, collectes: 8 + i * 2 + (i % 3) }));

function Dashboard() {
  const pending = SIGNALS.filter((s) => s.status === "EN ATTENTE").length;
  const planned = SIGNALS.filter((s) => s.status === "PRIS EN COMPTE").length;
  const done = SIGNALS.filter((s) => s.status === "TRAITÉ").length;
  const priorityQ = new Set(SIGNALS.filter((s) => s.priority === "HAUTE").map((s) => s.quartier)).size;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold">Tableau de bord déchets</h1>
        <p className="text-sm text-muted-foreground">Coordination des collectes et signalements citoyens</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="En attente" value={pending} icon={AlertCircle} color="text-status-warning" bg="bg-status-warning/10" />
        <Stat label="Planifiées" value={planned} icon={CalendarCheck} color="text-trash" bg="bg-trash-bg" />
        <Stat label="Quartiers prioritaires" value={priorityQ} icon={MapPin} color="text-status-danger" bg="bg-status-danger/10" />
        <Stat label="Effectuées" value={done} icon={CheckCircle} color="text-status-success" bg="bg-status-success/10" />
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h2 className="font-semibold">Collectes par quartier (ce mois)</h2>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={collectByQuartier}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="q" fontSize={11} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="collectes" fill="#3B6D11" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border bg-trash-bg p-4 text-sm">
        <strong className="text-trash">Logique de priorité :</strong>
        <ul className="mt-2 space-y-1 text-muted-foreground">
          <li>• <strong>HAUTE</strong> : quartiers proches d'une école ou d'un hôpital</li>
          <li>• <strong>NORMALE</strong> : signalements de plus de 3 jours</li>
          <li>• <strong>BASSE</strong> : signalements récents</li>
        </ul>
      </div>
    </div>
  );
}
