import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut, User, Bell, Globe, HelpCircle, ChevronRight, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { CURRENT_USER } from "@/lib/mock-data";
import { apiClient } from "@/lib/api-client";

export const Route = createFileRoute("/app/profil")({
  component: Profil,
});

function Profil() {
  const { logout, email } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 pb-24">
      <div className="max-w-xl mx-auto">
        
        {/* Titre Impactant */}
        <div className="mb-10">
           <h1 className="text-6xl font-[900] tracking-tighter text-slate-900">
            Profil<span className="text-[#3BC1A8]">.</span>
          </h1>
          <div className="h-1.5 w-12 bg-[#3BC1A8] mt-2 rounded-full" />
        </div>

        {/* Header Card : L'élément central */}
        <div className="relative group mb-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#3BC1A8] to-emerald-600 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white rounded-[2.8rem] p-8 border border-slate-50 shadow-2xl flex flex-col items-center">
            
            {/* Avatar stylisé */}
            <div className="relative mb-6">
              <div className="size-28 rounded-[2.2rem] bg-slate-900 flex items-center justify-center text-white text-4xl font-black shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                {CURRENT_USER.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="absolute -right-2 -bottom-2 size-10 bg-[#3BC1A8] rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-lg">
                <ShieldCheck size={20} />
              </div>
            </div>

            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{CURRENT_USER.name}</h2>
            <p className="text-slate-400 font-bold mb-6 italic">{email ?? CURRENT_USER.email}</p>

            {/* Stats Rapides */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-slate-50 rounded-3xl p-4 text-center border border-slate-100">
                <p className="text-2xl font-black text-slate-900">12</p>
                <p className="text-[10px] uppercase font-black text-[#3BC1A8] tracking-widest">Signalements</p>
              </div>
              <div className="bg-slate-50 rounded-3xl p-4 text-center border border-slate-100">
                <p className="text-2xl font-black text-slate-900">450</p>
                <p className="text-[10px] uppercase font-black text-emerald-500 tracking-widest">Points Eco</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Section : Style "Action Cards" */}
        <div className="space-y-4 mb-10">
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-4 mb-4">Paramètres</p>
          
          {[
            { icon: Bell, label: "Notifications", color: "bg-blue-50 text-blue-500" },
            { icon: Globe, label: "Langue & Région", color: "bg-purple-50 text-purple-500" },
            { icon: User, label: "Sécurité du compte", color: "bg-orange-50 text-orange-500" },
            { icon: HelpCircle, label: "Centre d'assistance", color: "bg-teal-50 text-teal-500" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <button 
                key={i} 
                className="w-full group bg-white hover:bg-slate-900 rounded-[2rem] p-5 flex items-center gap-5 transition-all duration-300 border border-slate-100 shadow-sm"
              >
                <div className={`size-12 rounded-2xl flex items-center justify-center transition-colors ${item.color} group-hover:bg-white/10 group-hover:text-white`}>
                  <Icon size={22} />
                </div>
                <span className="flex-1 text-left font-extrabold text-slate-700 group-hover:text-white transition-colors">
                  {item.label}
                </span>
                <div className="size-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white/20 group-hover:rotate-90 transition-all">
                  <ChevronRight size={16} className="group-hover:text-white" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Logout avec style destructif */}
        <button 
          onClick={() => { apiClient.logout();logout(); navigate({ to: "/login" }); }}
          className="w-full group relative h-16 rounded-[1.8rem] bg-rose-50 hover:bg-rose-500 transition-all duration-500 overflow-hidden"
        >
          <div className="relative z-10 flex items-center justify-center gap-3 text-rose-500 group-hover:text-white font-black text-lg transition-colors">
            <LogOut size={22} />
            Déconnecter la session
          </div>
        </button>

        <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-tighter">
                <Zap size={12} className="text-[#3BC1A8] fill-[#3BC1A8]" />
            </div>
        </div>
      </div>
    </div>
  );
}