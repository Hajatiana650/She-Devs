import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { 
  History, 
  Calendar, 
  Search, 
  Filter, 
  FileCheck, 
  AlertCircle, 
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import { BUSES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin-bus/visites")({
  component: VisitesHistorique,
});

function VisitesHistorique() {
  const navigate = useNavigate();

  // On simule un historique à partir des données mockées
  const history = BUSES.map(bus => ({
    id: bus.id,
    matricule: bus.matricule,
    date: bus.lastVisit,
    expiration: bus.expirationDate,
    status: bus.fitness,
    inspecteur: "Inspecteur Technique #01",
    notes: bus.fitness === "APTE" ? "Véhicule en excellent état général." : "Problème majeur détecté sur le système de freinage."
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ecfffb] via-[#eef6ff] to-[#f5f3ff] p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* HEADER */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#185FA5]/10 rounded-lg">
                <History className="text-[#185FA5]" size={24} />
              </div>
              <h1 className="text-4xl font-[1000] tracking-tight text-[#1B254B]">
                Journal des <span className="text-[#185FA5]">Visites</span>
              </h1>
            </div>
            <div className="h-1.5 w-16 bg-[#3BC1A8] rounded-full" />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative group w-full sm:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#185FA5] transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Rechercher une archive..."
                className="bg-white/60 backdrop-blur-sm border border-white rounded-2xl py-3 pl-12 pr-6 shadow-sm focus:ring-2 focus:ring-[#185FA5]/10 outline-none text-[#1B254B] font-bold w-full sm:w-64 transition-all"
              />
            </div>
            
            <Button 
              onClick={() => navigate({ to: "/admin-bus/bus" as any })}
              className="h-12 px-6 bg-[#1B254B] hover:bg-[#185FA5] text-white rounded-2xl font-black shadow-lg transition-all active:scale-95 flex gap-2"
            >
              PLANIFIER <Calendar size={18} />
            </Button>
          </div>
        </div>

        {/* INFO CARD */}
        <div className="bg-white/40 backdrop-blur-md border border-white p-6 rounded-[2rem] flex items-center gap-4 shadow-sm">
          <div className="size-12 bg-[#3BC1A8]/20 text-[#3BC1A8] rounded-xl flex items-center justify-center">
            <FileCheck size={24} />
          </div>
          <p className="text-sm font-bold text-slate-600">
            Pour enregistrer une nouvelle inspection technique, veuillez vous rendre dans l'onglet 
            <span className="text-[#185FA5] cursor-pointer hover:underline mx-1" onClick={() => navigate({ to: "/admin-bus/bus" as any })}>
              "Gestion des Bus"
            </span>.
          </p>
        </div>

        {/* TIMELINE DES VISITES */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Historique Récent</h3>
          
          <div className="grid grid-cols-1 gap-4">
            {history.map((item, index) => (
              <div 
                key={`${item.id}-${index}`}
                className="group bg-white/70 backdrop-blur-md border border-white p-6 rounded-[2.5rem] shadow-xl shadow-[#1B254B]/5 hover:scale-[1.01] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-6">
                  {/* Date Badge */}
                  <div className="flex flex-col items-center justify-center size-20 bg-zinc-100 rounded-[1.5rem] group-hover:bg-[#185FA5]/10 transition-colors">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                      {new Date(item.date).toLocaleString('default', { month: 'short' })}
                    </span>
                    <span className="text-2xl font-black text-[#1B254B]">
                      {new Date(item.date).getDate()}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-xl font-black text-[#1B254B] uppercase tracking-tighter">{item.matricule}</h4>
                      <div className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase ${
                        item.status === 'APTE' ? 'bg-[#3BC1A8]/10 text-[#3BC1A8]' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {item.status}
                      </div>
                    </div>
                    <p className="text-xs font-bold text-slate-400 line-clamp-1">{item.notes}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-10 border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Expiration</p>
                    <p className="text-sm font-bold text-[#1B254B] flex items-center gap-2">
                      <Calendar size={14} className="text-[#185FA5]" /> {item.expiration}
                    </p>
                  </div>

                  <button className="size-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-[#1B254B] group-hover:text-white transition-all shadow-inner">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EMPTY STATE (Si besoin) */}
        {history.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center gap-4">
            <div className="size-20 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-300 mb-4">
              <History size={40} />
            </div>
            <h2 className="text-xl font-black text-[#1B254B]">Aucune visite enregistrée</h2>
            <p className="text-slate-400 font-medium">Les rapports d'inspection apparaîtront ici.</p>
          </div>
        )}
      </div>
    </div>
  );
}