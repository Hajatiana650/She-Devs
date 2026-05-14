import { createFileRoute } from "@tanstack/react-router";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, AreaChart, Area } from "recharts";
import { TrendingUp, Users, Map, Activity } from "lucide-react";

export const Route = createFileRoute("/admin-bus/statistiques")({
  component: Stats,
});

const ridership = [
  { jour: "Lun", passagers: 2100 }, { jour: "Mar", passagers: 2400 }, { jour: "Mer", passagers: 2200 },
  { jour: "Jeu", passagers: 2600 }, { jour: "Ven", passagers: 2900 }, { jour: "Sam", passagers: 1800 }, { jour: "Dim", passagers: 1100 },
];
const lines = [
  { ligne: "Ligne 01", trips: 45, fill: "#185FA5" }, 
  { ligne: "Ligne 02", trips: 38, fill: "#3BC1A8" }, 
  { ligne: "Ligne 03", trips: 29, fill: "#1B254B" },
];

function Stats() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ecfffb] via-[#eef6ff] to-[#f5f3ff] p-6 md:p-10 font-sans">
      
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-[1000] tracking-tighter text-[#1B254B]">
              Analytics <span className="text-[#185FA5]">Réseau</span>
            </h1>
            <div className="h-1.5 w-12 bg-[#3BC1A8] mt-2 rounded-full" />
          </div>
          <div className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white text-[#1B254B] font-bold text-sm shadow-sm flex items-center gap-2">
            <Activity size={16} className="text-[#3BC1A8]" />
            Mise à jour en temps réel
          </div>
        </div>

        {/* KIPS CARDS (PETITS RÉSUMÉS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Passagers", val: "15.1k", icon: Users, color: "#185FA5" },
            { label: "Trips Hebdo", val: "112", icon: Map, color: "#3BC1A8" },
            { label: "Croissance", val: "+12.5%", icon: TrendingUp, color: "#1B254B" }
          ].map((kpi, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-xl border border-white p-6 rounded-[2rem] shadow-xl shadow-[#1B254B]/5 flex items-center gap-5">
              <div className="size-12 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: kpi.color }}>
                <kpi.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kpi.label}</p>
                <p className="text-2xl font-black text-[#1B254B]">{kpi.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* GRAPHIQUES PRINCIPAUX */}
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* CHART 1 : PASSAGERS (AREA CHART POUR PLUS DE STYLE) */}
          <div className="bg-white/70 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl shadow-[#1B254B]/5 group">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-[#1B254B] uppercase tracking-tighter">Flux Passagers</h2>
              <span className="text-[10px] font-bold bg-[#185FA5]/10 text-[#185FA5] px-3 py-1 rounded-full">HEBDOMADAIRE</span>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ridership}>
                  <defs>
                    <linearGradient id="colorPass" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#185FA5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#185FA5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="jour" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold'}}
                  />
                  <Area type="monotone" dataKey="passagers" stroke="#185FA5" strokeWidth={4} fillOpacity={1} fill="url(#colorPass)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CHART 2 : TRAJETS (BAR CHART AVEC COULEURS MIXTES) */}
          <div className="bg-white/70 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 shadow-2xl shadow-[#1B254B]/5">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-[#1B254B] uppercase tracking-tighter">Performance Lignes</h2>
              <span className="text-[10px] font-bold bg-[#3BC1A8]/10 text-[#3BC1A8] px-3 py-1 rounded-full">TOTAL TRIPS</span>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lines}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="ligne" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} />
                  <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '20px', border: 'none'}} />
                  <Bar dataKey="trips" radius={[12, 12, 12, 12]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}