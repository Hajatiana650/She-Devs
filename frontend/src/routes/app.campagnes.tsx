import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, MapPin, Users, CheckCircle2, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CAMPAIGNS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/campagnes")({
  component: Campagnes,
});

function Campagnes() {
  const [joined, setJoined] = useState<Record<string, boolean>>({});
  const [counts, setCounts] = useState<Record<string, number>>(
    Object.fromEntries(CAMPAIGNS.map((c) => [c.id, c.participants]))
  );

  const toggle = (id: string) => {
    const isJoining = !joined[id];
    setJoined((j) => ({ ...j, [id]: isJoining }));
    setCounts((c) => ({ ...c, [id]: c[id] + (isJoining ? 1 : -1) }));
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-4 md:p-8 pb-24">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Style "Bold & Clean" */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-[#3BC1A8] font-bold text-xs uppercase tracking-[0.2em] mb-3">
            <Sparkles size={14} className="animate-pulse" />
            <span>Fianarantsoa Propre</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4">
            Campagnes <span className="text-[#3BC1A8]">citoyennes</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl font-medium leading-relaxed">
            Ne restez pas spectateur. Rejoignez les actions collectives pour transformer votre quartier.
          </p>
        </header>

        {/* Grid Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CAMPAIGNS.map((c) => (
            <div 
              key={c.id} 
              className="group bg-white rounded-[2.5rem] border border-slate-100 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(59,193,168,0.12)] hover:-translate-y-1"
            >
              <div className="p-6 md:p-8">
                {/* Header Card */}
                <div className="flex justify-between items-center mb-8">
                  <Badge className="bg-[#3BC1A8]/10 text-[#3BC1A8] hover:bg-[#3BC1A8]/10 border-none rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
                    Action Prioritaire
                  </Badge>
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.id}${i}`} alt="avatar" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Content */}
                <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-[#3BC1A8] transition-colors duration-300 mb-4">
                  {c.title}
                </h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 line-clamp-3">
                  {c.message}
                </p>

                {/* Details Box */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 rounded-2xl p-4 flex flex-col gap-2">
                    <Calendar size={18} className="text-[#3BC1A8]" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Date</p>
                      <p className="text-sm font-bold text-slate-700">
                        {new Date(c.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 flex flex-col gap-2">
                    <MapPin size={18} className="text-[#3BC1A8]" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Lieu</p>
                      <p className="text-sm font-bold text-slate-700 truncate">{c.quartiers[0]}</p>
                    </div>
                  </div>
                </div>

                {/* Stats & CTA */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Engagement</span>
                    <span className="text-xs font-black text-[#3BC1A8]">{counts[c.id]} inscrits</span>
                  </div>
                  
                  <Button
                    onClick={() => toggle(c.id)}
                    className={`w-full h-16 rounded-[1.5rem] text-base font-black transition-all duration-300 ${
                      joined[c.id] 
                        ? "bg-slate-900 text-white" 
                        : "bg-[#3BC1A8] text-white hover:scale-[1.02] active:scale-95 shadow-[0_10px_25px_rgba(59,193,168,0.3)]"
                    }`}
                  >
                    {joined[c.id] ? (
                      <span className="flex items-center gap-2"><CheckCircle2 size={20} /> Vous participez</span>
                    ) : (
                      <span className="flex items-center gap-2 text-lg italic">Rejoindre <ChevronRight size={20} /></span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}