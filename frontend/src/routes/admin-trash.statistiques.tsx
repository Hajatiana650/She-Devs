import { createFileRoute } from "@tanstack/react-router";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip, 
  CartesianGrid, 
  Cell 
} from "recharts";
import { TrendingUp, Target, Award, BarChart3, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/admin-trash/statistiques")({
  component: Stats,
});

// Données plus basses (simulation de début de service)
const monthly = [
  { mois: "Jan", signalements: 12, traites: 10 },
  { mois: "Fév", signalements: 18, traites: 15 },
  { mois: "Mar", signalements: 14, traites: 14 },
  { mois: "Avr", signalements: 22, traites: 19 },
  { mois: "Mai", signalements: 19, traites: 18 },
];

function Stats() {
  const totalSignalements = monthly.reduce((acc, m) => acc + m.signalements, 0);
  const totalTraites = monthly.reduce((acc, m) => acc + m.traites, 0);
  const tauxTraitement = Math.round((totalTraites / totalSignalements) * 100);

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* HEADER STATS */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-4xl font-[1000] tracking-tight text-[#1B254B]">
            Analyse des <span className="text-[#185FA5]">Performances</span>
          </h1>
          <div className="h-1.5 w-16 bg-[#3BC1A8] mt-2 rounded-full" />
        </div>

        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md p-2 rounded-2xl border border-white shadow-sm">
            <div className="px-4 py-1.5 bg-[#3BC1A8]/10 text-[#3BC1A8] rounded-xl text-[10px] font-black tracking-widest uppercase">
                Période : 2026
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <BarChart3 size={18} className="text-[#1B254B] mr-2" />
        </div>
      </div>

      {/* KPI CARDS (Style Dashboard Admin) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Signalements" 
          value={totalSignalements} 
          trend="+5% vs m-1" 
          icon={Target} 
          color="#185FA5" 
        />
        <StatCard 
          label="Traités" 
          value={totalTraites} 
          trend="+12% efficacité" 
          icon={Award} 
          color="#3BC1A8" 
        />
        <StatCard 
          label="Taux Succès" 
          value={`${tauxTraitement}%`} 
          trend="Stable" 
          icon={TrendingUp} 
          color="#f59e0b" 
        />
        <StatCard 
          label="Moyenne" 
          value={(totalSignalements / monthly.length).toFixed(1)} 
          trend="Basse" 
          icon={BarChart3} 
          color="#1B254B" 
        />
      </div>

      {/* GRAPHIQUES SECTION */}
      <div className="grid gap-8 lg:grid-cols-2">
        
        {/* Line Chart : Évolution */}
        <div className="bg-white/70 backdrop-blur-lg rounded-[2.5rem] p-8 shadow-xl shadow-[#1B254B]/5 border border-white">
          <h3 className="text-xl font-black text-[#1B254B] mb-8">Flux de Signalements</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="mois" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.05)'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="signalements" 
                  stroke="#185FA5" 
                  strokeWidth={4} 
                  dot={{ fill: "#185FA5", r: 6, strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="traites" 
                  stroke="#3BC1A8" 
                  strokeWidth={4} 
                  strokeDasharray="8 4"
                  dot={{ fill: "#3BC1A8", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart : Volume */}
        <div className="bg-white/70 backdrop-blur-lg rounded-[2.5rem] p-8 shadow-xl shadow-[#1B254B]/5 border border-white">
          <h3 className="text-xl font-black text-[#1B254B] mb-8">Volume Mensuel</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly}>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="mois" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '20px', border: 'none'}} />
                <Bar dataKey="signalements" radius={[10, 10, 10, 10]} barSize={35}>
                  {monthly.map((_, index) => (
                    <Cell key={index} fill={index === 3 ? '#3BC1A8' : '#185FA5'} className="hover:opacity-80 transition-opacity cursor-pointer" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, icon: Icon, color }: { 
  label: string; 
  value: string | number; 
  trend: string; 
  icon: any; 
  color: string;
}) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-6 shadow-xl shadow-[#1B254B]/5 border border-white hover:scale-[1.02] transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div 
          className="size-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          <Icon size={24} strokeWidth={2.5} />
        </div>
        <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black italic">
          {trend}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <h4 className="text-3xl font-[1000] text-[#1B254B] tracking-tight">{value}</h4>
      </div>
    </div>
  );
}