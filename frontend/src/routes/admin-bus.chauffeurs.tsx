import { createFileRoute } from "@tanstack/react-router";
import { useDrivers } from "@/hooks/useDrivers";

export const Route = createFileRoute("/admin-bus/chauffeurs")({
  component: ChauffeursList,
});

function ChauffeursList() {
  const { data: drivers = [], isLoading, error } = useDrivers();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Erreur chargement chauffeurs
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ecfffb] via-[#eef6ff] to-[#f5f3ff] p-6 md:p-10 font-sans overflow-x-hidden">
      
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .reveal-card {
          animation: slideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 reveal-card">
          <div>
            <h1 className="text-5xl font-[1000] tracking-tighter text-[#1B254B]">
              Équipe <span className="text-[#185FA5]">Chauffeurs</span>
            </h1>
            <div className="h-2 w-20 bg-[#3BC1A8] mt-2 rounded-full" />
          </div>

          <p className="text-[#185FA5] font-bold text-sm bg-white/50 px-6 py-2 rounded-full border border-white">
            {drivers.length} Pilotes assignés
          </p>
        </div>

        {/* GRILLE */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {drivers.map((d, index) => (
            <div
              key={d.id_driver}
              className="reveal-card group bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-[#1B254B]/5 transition-all duration-500 hover:shadow-2xl hover:shadow-[#185FA5]/15 hover:-translate-y-3"
              style={{
                animationDelay: `${(index + 1) * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              {/* AVATAR */}
              <div className="p-8 flex flex-col items-center">
                <div className="size-24 mb-6 relative">
                  <div className="size-full bg-[#185FA5] rounded-3xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <span className="text-white font-[1000] text-3xl tracking-tighter">
                      {d.user.user_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 size-6 bg-[#3BC1A8] border-4 border-white rounded-full" />
                </div>

                <h3 className="text-xl font-[1000] text-[#1B254B] uppercase tracking-tighter text-center">
                  {d.user.user_name}
                </h3>
              </div>

              {/* BUS */}
              <div className="bg-[#185FA5]/5 border-y border-[#185FA5]/10 px-8 py-4 flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Véhicule
                </span>
                <span className="bg-[#185FA5] text-white font-black text-xs px-3 py-1 rounded-lg shadow-sm group-hover:bg-[#3BC1A8] transition-colors">
                  {d.bus?.matricule}
                </span>
              </div>

              {/* ACTION */}
              <div className="p-6">
                <button className="w-full bg-[#1B254B] hover:bg-[#185FA5] text-white py-4 rounded-2xl font-[1000] text-[10px] tracking-[0.25em] uppercase active:scale-95 shadow-md">
                  Fiche Pilote
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}