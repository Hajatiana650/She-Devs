import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Bus as BusIcon, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  Activity, 
  TrendingUp, 
  ArrowUpRight, 
  Search,
  LucideIcon 
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, CartesianGrid } from "recharts";
import { BUSES } from "@/lib/mock-data";

export const Route = createFileRoute("/admin-bus/dashboard")({
  component: Dashboard,
});

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  onClick?: () => void;
}

function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("globale");

  const stats = {
    total: BUSES.length,
    aptes: BUSES.filter((b) => b.fitness === "APTE").length,
    inaptes: BUSES.filter((b) => b.fitness !== "APTE").length,
    renew: BUSES.filter((b) => {
      const d = new Date(b.expirationDate);
      const diff = (d.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
      return diff < 60 && diff > 0;
    }).length,
  };

  const chartData = [
    { mois: "Jan", visites: 4 }, { mois: "Fév", visites: 6 }, { mois: "Mar", visites: 8 },
    { mois: "Avr", visites: 5 }, { mois: "Mai", visites: 9 }, { mois: "Juin", visites: 7 },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#ecfffb] via-[#eef6ff] to-[#f5f3ff] p-4 md:p-10 font-sans">
      <div className="w-full max-w-7xl mx-auto space-y-10">
        
        {/* HEADER AVEC MENU À DROITE */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="text-4xl font-[1000] tracking-tight text-[#1B254B]">
              Dashboard <span className="text-[#185FA5]">Admin</span>
            </h1>
            <div className="h-1.5 w-16 bg-[#3BC1A8] mt-2 rounded-full" />
          </div>

          {/* SECTION MENU ET RECHERCHE ALIGNÉE À DROITE */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Barre de recherche */}
            <div className="relative group w-full sm:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#185FA5] transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/60 backdrop-blur-sm border border-white rounded-2xl py-3 pl-12 pr-6 shadow-sm focus:ring-2 focus:ring-[#185FA5]/10 outline-none text-[#1B254B] font-bold w-full sm:w-60 transition-all"
              />
            </div>

            {/* LE MENU STYLE CHAUFFEUR (Pill grise, actif blanc) */}
            <div className="flex bg-zinc-200/50 backdrop-blur-md p-1 rounded-[1.25rem] border border-white/50 shadow-inner">
              <button 
                onClick={() => setActiveTab("globale")}
                className={`px-6 py-2 rounded-xl text-[11px] font-[900] tracking-widest transition-all duration-300 ${
                  activeTab === 'globale' 
                  ? 'bg-white text-[#185FA5] shadow-md' 
                  : 'text-zinc-500 hover:text-[#1B254B]'
                }`}
              >
                GLOBALE
              </button>
              <button 
                onClick={() => setActiveTab("historique")}
                className={`px-6 py-2 rounded-xl text-[11px] font-[900] tracking-widest transition-all duration-300 ${
                  activeTab === 'historique' 
                  ? 'bg-white text-[#185FA5] shadow-md' 
                  : 'text-zinc-500 hover:text-[#1B254B]'
                }`}
              >
                HISTORIQUE
              </button>
            </div>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Flotte Totale" value={stats.total} icon={BusIcon} color="#185FA5" onClick={() => navigate({ to: "/admin-bus/list" as any })} />
          <StatCard label="Unités Aptes" value={stats.aptes} icon={CheckCircle} color="#3BC1A8" />
          <StatCard label="Critique" value={stats.inaptes} icon={XCircle} color="#ef4444" />
          <StatCard label="À Renouveler" value={stats.renew} icon={Calendar} color="#f59e0b" />
        </div>

        {/* GRAPHIQUE & ACTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-lg rounded-[2.5rem] p-8 shadow-xl shadow-[#1B254B]/5 border border-white">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-[#1B254B]">Analyse de Maintenance</h3>
              <div className="px-4 py-2 bg-[#3BC1A8]/10 text-[#3BC1A8] rounded-xl text-xs font-black ring-1 ring-[#3BC1A8]/20">
                TEMPS RÉEL
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="0" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="mois" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                  <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.05)'}} />
                  <Bar dataKey="visites" radius={[10, 10, 10, 10]} barSize={35}>
                    {chartData.map((_, index) => (
                      <Cell key={index} fill={index === 4 ? '#3BC1A8' : '#185FA5'} className="hover:opacity-80 cursor-pointer" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CTA CARD (Style dégradé Assurance/Chauffeur) */}
          <div className="bg-gradient-to-br from-[#1B254B] to-[#185FA5] rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 size-48 bg-[#3BC1A8]/20 rounded-full blur-3xl group-hover:bg-[#3BC1A8]/40 transition-all duration-700" />
            <div className="relative z-10">
              <div className="size-16 bg-[#3BC1A8] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-[#3BC1A8]/20">
                <Activity size={32} />
              </div>
              <h3 className="text-3xl font-black leading-tight mb-4">Suivi Technique</h3>
              <p className="text-white/60 text-sm font-medium leading-relaxed italic">
                Supervisez la conformité de chaque véhicule en temps réel.
              </p>
            </div>
            <button 
              onClick={() => navigate({ to: "/admin-bus/list" as any })}
              className="relative z-10 mt-10 w-full py-4 bg-white text-[#1B254B] rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-[#3BC1A8] hover:text-white transition-all transform active:scale-95 shadow-xl"
            >
              Liste des Bus <ArrowUpRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color, onClick }: StatCardProps) {
  return (
    <button 
      onClick={onClick}
      disabled={!onClick}
      className="bg-white/80 backdrop-blur-md rounded-[2rem] p-6 flex items-center gap-6 shadow-xl shadow-[#1B254B]/5 border border-white hover:scale-[1.02] active:scale-95 transition-all group w-full text-left"
    >
      <div 
        className="size-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner"
        style={{ backgroundColor: `${color}10`, color: color }}
      >
        <Icon size={28} strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <h4 className="text-2xl font-black text-[#1B254B] tracking-tight">{value}</h4>
      </div>
    </button>
  );
}