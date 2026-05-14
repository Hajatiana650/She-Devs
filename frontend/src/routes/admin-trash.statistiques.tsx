import { createFileRoute } from "@tanstack/react-router";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend } from "recharts";
import { TrendingUp, Target, Award } from "lucide-react";

export const Route = createFileRoute("/admin-trash/statistiques")({
  component: Stats,
});

const monthly = [
  { mois: "Jan", signalements: 42, traites: 38 },
  { mois: "Fév", signalements: 51, traites: 47 },
  { mois: "Mar", signalements: 38, traites: 36 },
  { mois: "Avr", signalements: 60, traites: 54 },
  { mois: "Mai", signalements: 47, traites: 41 },
];

function StatCard({ label, value, trend, icon: Icon, color }: { 
  label: string; 
  value: string; 
  trend: string; 
  icon: any; 
  color: string;
}) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-slate-500">{label}</p>
          <p className="text-4xl font-bold tracking-tighter text-slate-800 mt-2">{value}</p>
        </div>
        <div className={`rounded-2xl p-4 ${color}`}>
          <Icon size={32} className="text-white" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-emerald-600 text-sm font-medium">
        <TrendingUp size={18} />
        {trend}
      </div>
    </div>
  );
}

function Stats() {
  const totalSignalements = monthly.reduce((acc, m) => acc + m.signalements, 0);
  const totalTraites = monthly.reduce((acc, m) => acc + m.traites, 0);
  const tauxTraitement = Math.round((totalTraites / totalSignalements) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4fffc] via-[#f0f9f6] to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-[#3BC1A8] to-[#3A9AFF] bg-clip-text text-4xl md:text-5xl font-extrabold text-transparent">
            Statistiques Déchets
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Analyse des performances du service de collecte
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard 
            label="Total Signalements" 
            value={totalSignalements.toString()} 
            trend="+18% ce mois" 
            icon={Target} 
            color="bg-[#3BC1A8]" 
          />
          <StatCard 
            label="Signalements traités" 
            value={totalTraites.toString()} 
            trend="+24% ce mois" 
            icon={Award} 
            color="bg-emerald-600" 
          />
          <StatCard 
            label="Taux de traitement" 
            value={`${tauxTraitement}%`} 
            trend="Excellent" 
            icon={TrendingUp} 
            color="bg-teal-600" 
          />
          <StatCard 
            label="Moyenne mensuelle" 
            value="47.6" 
            trend="Stable" 
            icon={Target} 
            color="bg-[#3A9AFF]" 
          />
        </div>

        {/* Charts */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Line Chart */}
          <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-sm backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              Évolution des signalements
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="mois" fontSize={13} tickLine={false} />
                  <YAxis fontSize={13} tickLine={false} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="signalements" 
                    stroke="#3BC1A8" 
                    strokeWidth={4} 
                    dot={{ fill: "#3BC1A8", r: 6 }}
                    activeDot={{ r: 8 }}
                    name="Signalements"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="traites" 
                    stroke="#3A9AFF" 
                    strokeWidth={4} 
                    strokeDasharray="6 3"
                    dot={{ fill: "#3A9AFF", r: 6 }}
                    name="Traités"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-sm backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              Volume mensuel de signalements
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="mois" fontSize={13} tickLine={false} />
                  <YAxis fontSize={13} tickLine={false} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
                    }}
                  />
                  <Bar 
                    dataKey="signalements" 
                    fill="#3BC1A8" 
                    radius={[12, 12, 0, 0]} 
                    name="Signalements"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}