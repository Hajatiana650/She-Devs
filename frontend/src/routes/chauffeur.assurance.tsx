import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BUSES } from "@/lib/mock-data";

export const Route = createFileRoute("/chauffeur/assurance")({
  component: Assurance,
});

function Assurance() {
  const bus = BUSES[0];
  const expiresAt = new Date(bus.expirationDate);
  const today = new Date();
  const daysLeft = Math.max(0, Math.ceil((expiresAt.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  const totalDays = 365;
  const pct = Math.min(100, (daysLeft / totalDays) * 100);
  const barColor = pct > 50 ? "bg-[#3BC1A8]" : pct > 20 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f4fffc] via-[#eef7ff] to-white p-4 md:p-8 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#3BC1A8]/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-20 h-56 w-56 rounded-full bg-[#3A9AFF]/10 blur-3xl" />
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-[#3BC1A8] to-[#3A9AFF] bg-clip-text text-4xl font-extrabold text-transparent">
            Assurance & Visite Technique
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Suivi en temps réel de votre véhicule
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-8 shadow-[0_15px_40px_rgba(58,154,255,0.12)] backdrop-blur-xl">
          
          {/* Background Decorative Elements */}
          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-[#3BC1A8]/10 blur-3xl"></div>
          <div className="absolute -bottom-16 -left-12 h-56 w-56 rounded-full bg-[#3A9AFF]/10 blur-3xl"></div>

          {/* Header Section */}
          <div className="relative z-10 flex items-center gap-5 pb-8 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3BC1A8] to-[#3A9AFF] flex items-center justify-center flex-shrink-0 shadow-md">
              <ShieldCheck size={36} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-widest text-[#3A9AFF]">
                Statut Technique
              </div>
              <Badge
                className={`mt-2 px-6 py-2 text-base font-semibold rounded-2xl shadow-sm ${
                  bus.fitness === "APTE"
                    ? "bg-gradient-to-r from-[#3BC1A8] to-[#49d6bb] text-white"
                    : "bg-gradient-to-r from-red-500 to-red-400 text-white"
                }`}
              >
                {bus.fitness}
              </Badge>
            </div>
          </div>

          {/* Informations */}
          <div className="relative z-10 mt-8 space-y-6">
            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
                <div className="text-xs uppercase tracking-widest text-slate-500">Dernière visite</div>
                <div className="mt-3 text-3xl font-bold text-slate-800">{bus.lastVisit}</div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
                <div className="text-xs uppercase tracking-widest text-slate-500">Date d'expiration</div>
                <div className="mt-3 text-3xl font-bold text-slate-800">{bus.expirationDate}</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm text-slate-600">Expire dans</span>
                <span className="text-4xl font-bold tracking-tighter text-slate-800">
                  {daysLeft} <span className="text-xl font-normal text-slate-500">jours</span>
                </span>
              </div>

              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-700 ${barColor}`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="mt-3 flex justify-between text-xs">
                <span className="text-slate-500">Validité restante</span>
                <span className="font-medium text-slate-600">{pct.toFixed(0)}%</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="relative z-10 mt-8">
            <Button
              className="w-full h-14 rounded-2xl text-base font-semibold bg-gradient-to-r from-[#3BC1A8] to-[#3A9AFF] hover:brightness-110 transition-all duration-300 shadow-lg flex items-center gap-3 text-white"
            >
              <Calendar size={22} />
              Planifier ma prochaine visite
            </Button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-8">
          Fiana • Mobilité intelligente et sécurisée
        </p>
      </div>
    </div>
  );
}