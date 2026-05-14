import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, CalendarCheck, MapPin, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { SIGNALS, QUARTIERS } from "@/lib/mock-data";

export const Route = createFileRoute("/admin-trash/dashboard")({
  component: Dashboard,
});

function Stat({ label, value, icon: Icon, color, bg }: { 
  label: string; 
  value: number; 
  icon: any; 
  color: string; 
  bg: string; 
}) {
  return (
    <div className="group rounded-3xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-slate-500">{label}</span>
        <div className={`flex size-11 items-center justify-center rounded-2xl ${bg} ${color} transition-transform group-hover:scale-110`}>
          <Icon size={24} />
        </div>
      </div>
      <div className="mt-4 text-5xl font-bold tracking-tighter text-slate-800">
        {value}
      </div>
    </div>
  );
}

const collectByQuartier = QUARTIERS.slice(0, 6).map((q, i) => ({ 
  q, 
  collectes: 8 + i * 2 + (i % 3) 
}));

function Dashboard() {
  const pending = SIGNALS.filter((s) => s.status === "EN ATTENTE").length;
  const planned = SIGNALS.filter((s) => s.status === "PRIS EN COMPTE").length;
  const done = SIGNALS.filter((s) => s.status === "TRAITÉ").length;
  const priorityQ = new Set(SIGNALS.filter((s) => s.priority === "HAUTE").map((s) => s.quartier)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4fffc] via-[#f0f9f6] to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="bg-gradient-to-r from-[#3BC1A8] to-[#3A9AFF] bg-clip-text text-4xl font-extrabold text-transparent">
            Tableau de bord Déchets
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Coordination des collectes et signalements citoyens
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Stat 
            label="En attente" 
            value={pending} 
            icon={AlertCircle} 
            color="text-amber-600" 
            bg="bg-amber-100" 
          />
          <Stat 
            label="Planifiées" 
            value={planned} 
            icon={CalendarCheck} 
            color="text-[#3BC1A8]" 
            bg="bg-[#3BC1A8]/10" 
          />
          <Stat 
            label="Quartiers prioritaires" 
            value={priorityQ} 
            icon={MapPin} 
            color="text-rose-600" 
            bg="bg-rose-100" 
          />
          <Stat 
            label="Effectuées" 
            value={done} 
            icon={CheckCircle} 
            color="text-emerald-600" 
            bg="bg-emerald-100" 
          />
        </div>

        {/* Chart Section */}
        <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-sm backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-800">
              Collectes par quartier • Ce mois
            </h2>
            <div className="text-sm text-slate-500">Total collectes : {collectByQuartier.reduce((a, b) => a + b.collectes, 0)}</div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={collectByQuartier}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="q" 
                  fontSize={13} 
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  fontSize={13} 
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
                  }}
                />
                <Bar 
                  dataKey="collectes" 
                  fill="#3BC1A8" 
                  radius={[8, 8, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Logic Card */}
        <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-sm backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-slate-800 mb-5 flex items-center gap-3">
            <span className="text-[#3BC1A8]">●</span> 
            Logique de priorité
          </h3>
          <ul className="grid gap-4 md:grid-cols-3 text-sm">
            <li className="flex gap-3 rounded-2xl bg-white p-5 border border-slate-100">
              <div className="mt-1 text-rose-500">•</div>
              <div>
                <strong className="text-rose-600">HAUTE</strong>
                <p className="text-slate-600 mt-1">Quartiers proches d'une école ou d'un hôpital</p>
              </div>
            </li>
            <li className="flex gap-3 rounded-2xl bg-white p-5 border border-slate-100">
              <div className="mt-1 text-amber-500">•</div>
              <div>
                <strong className="text-amber-600">NORMALE</strong>
                <p className="text-slate-600 mt-1">Signalements de plus de 3 jours</p>
              </div>
            </li>
            <li className="flex gap-3 rounded-2xl bg-white p-5 border border-slate-100">
              <div className="mt-1 text-emerald-500">•</div>
              <div>
                <strong className="text-emerald-600">BASSE</strong>
                <p className="text-slate-600 mt-1">Signalements récents</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}