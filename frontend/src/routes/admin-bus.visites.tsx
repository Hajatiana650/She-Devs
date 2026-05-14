import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { History, Calendar, Search, FileCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVisits } from "@/hooks/useVisit";

export const Route = createFileRoute("/admin-bus/visites")({
  component: VisitesHistorique,
});

function VisitesHistorique() {
  const navigate = useNavigate();
  const { data: visits = [] } = useVisits();

  const history = visits
    .map((v) => ({
      id: v.id,
      matricule: v.bus.matricule,
      date: v.dateVisit,
      expiration: v.dateLimit,
      status: v.result,
      inspecteur: "Inspecteur Technique #01",
      notes: v.observation,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ecfffb] via-[#eef6ff] to-[#f5f3ff] p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* HEADER (inchangé) */}
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

          <Button
            onClick={() => navigate({ to: "/admin-bus/bus" as any })}
            className="h-12 px-6 bg-[#1B254B] hover:bg-[#185FA5] text-white rounded-2xl font-black"
          >
            PLANIFIER <Calendar size={18} />
          </Button>
        </div>

        {/* INFO CARD (inchangé) */}
        <div className="bg-white/40 backdrop-blur-md border border-white p-6 rounded-[2rem] flex items-center gap-4 shadow-sm">
          <FileCheck size={24} className="text-[#3BC1A8]" />
          <p className="text-sm font-bold text-slate-600">
            Les visites sont maintenant synchronisées avec le backend.
          </p>
        </div>

        {/* LISTE */}
        <div className="grid grid-cols-1 gap-4">
          {history.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white/70 backdrop-blur-md border border-white p-6 rounded-[2.5rem] shadow-xl flex justify-between"
            >
              <div>
                <h4 className="text-xl font-black text-[#1B254B]">
                  {item.matricule}
                </h4>
                <p className="text-xs text-slate-400">{item.notes}</p>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold">{item.status}</p>
                <p className="text-xs text-slate-400">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {history.length === 0 && (
          <div className="py-20 text-center text-slate-400">
            Aucune visite enregistrée
          </div>
        )}
      </div>
    </div>
  );
}