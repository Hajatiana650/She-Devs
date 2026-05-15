import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { 
  AlertCircle, 
  CalendarCheck, 
  MapPin, 
  CheckCircle, 
  Search, 
  TrendingUp, 
  Truck 
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, CartesianGrid } from "recharts";
import { SIGNALS, QUARTIERS } from "@/lib/mock-data";
import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, CalendarCheck, MapPin, CheckCircle, Loader } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { QUARTIERS } from "@/lib/mock-data";
import { useTrashDashboard, useTrashSignals } from "@/hooks/useTrash";

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
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* HEADER DE LA PAGE */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-4xl font-[1000] tracking-tight text-[#1B254B]">
            Gestion des <span className="text-[#3BC1A8]">Déchets</span>
          </h1>
          <div className="h-1.5 w-16 bg-[#3BC1A8] mt-2 rounded-full" />
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

          <div className="flex bg-zinc-200/50 backdrop-blur-md p-1 rounded-[1.25rem] border border-white/50 shadow-inner">
            <button 
              onClick={() => setActiveTab("globale")}
              className={`px-6 py-2 rounded-xl text-[11px] font-[900] tracking-widest transition-all duration-300 ${
                activeTab === 'globale' ? 'bg-white text-[#185FA5] shadow-md' : 'text-zinc-500 hover:text-[#1B254B]'
              }`}
            >
              GLOBALE
            </button>
            <button 
              onClick={() => setActiveTab("priorités")}
              className={`px-6 py-2 rounded-xl text-[11px] font-[900] tracking-widest transition-all duration-300 ${
                activeTab === 'priorités' ? 'bg-white text-[#185FA5] shadow-md' : 'text-zinc-500 hover:text-[#1B254B]'
              }`}
            >
              URGENCES
            </button>
          </div>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="En attente" value={pending} icon={AlertCircle} color="#f59e0b" />
        <StatCard label="Planifiées" value={planned} icon={CalendarCheck} color="#3BC1A8" />
        <StatCard label="Zones High" value={priorityQ} icon={MapPin} color="#ef4444" />
        <StatCard label="Effectuées" value={done} icon={CheckCircle} color="#185FA5" />
      </div>

      {/* ANALYSE GRAPHIQUE & ACTION CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-lg rounded-[2.5rem] p-8 shadow-xl shadow-[#1B254B]/5 border border-white">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-[#1B254B]">Collectes par Quartier</h3>
            <div className="px-4 py-2 bg-[#185FA5]/10 text-[#185FA5] rounded-xl text-xs font-black ring-1 ring-[#185FA5]/20 flex items-center gap-2">
              <TrendingUp size={14} /> STATS RÉELLES
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={collectByQuartier}>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="q" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.05)'}} />
                <Bar dataKey="collectes" radius={[10, 10, 10, 10]} barSize={40}>
                  {collectByQuartier.map((_, index) => (
                    <Cell key={index} fill={index % 2 === 0 ? '#185FA5' : '#3BC1A8'} className="hover:opacity-80 transition-opacity" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Card Premium - Logistique Focus */}
        <div className="bg-gradient-to-br from-[#1B254B] to-[#185FA5] rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 size-48 bg-[#3BC1A8]/20 rounded-full blur-3xl group-hover:bg-[#3BC1A8]/40 transition-all duration-700" />
          <div className="relative z-10">
            <div className="size-16 bg-[#3BC1A8] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-[#3BC1A8]/20">
              <Truck size={32} />
            </div>
            <h3 className="text-3xl font-black leading-tight mb-4">Flux de <br/>Collecte</h3>
            <p className="text-white/60 text-sm font-medium leading-relaxed italic">
              Optimisez les itinéraires des camions pour couvrir les zones à forte densité de signalement.
            </p>
          </div>
          <button className="relative z-10 mt-10 w-full py-4 bg-white text-[#1B254B] rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-[#3BC1A8] hover:text-white transition-all transform active:scale-95 shadow-xl">
            Gérer la Flotte
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string, value: number, icon: any, color: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-6 flex items-center gap-6 shadow-xl shadow-[#1B254B]/5 border border-white hover:scale-[1.02] transition-all group">
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
    </div>
  );
}