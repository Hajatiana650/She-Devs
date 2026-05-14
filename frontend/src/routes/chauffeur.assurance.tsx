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
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header centré */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            Assurance & Visite Technique
          </h1>
          <p className="text-zinc-600 mt-2 text-lg">
            Suivi en temps réel de votre véhicule
          </p>
        </div>

        {/* Main Card - Design moderne */}
        <div className="rounded-3xl border border-zinc-200 bg-white shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="flex items-center gap-4 p-8 border-b border-zinc-100">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3BC1A8] to-[#3A9AFF] flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={36} className="text-white" />
            </div>
            <div>
              <div className="text-sm uppercase tracking-widest text-zinc-500">Statut Technique</div>
              <div className="mt-2">
                <Badge 
                  className={`px-5 py-2 text-base font-semibold rounded-2xl ${
                    bus.fitness === "APTE" 
                      ? "bg-[#3BC1A8]/10 text-[#3BC1A8] border border-[#3BC1A8]/30" 
                      : "bg-red-500/10 text-red-600 border border-red-500/30"
                  }`}
                >
                  {bus.fitness}
                </Badge>
              </div>
            </div>
          </div>

          {/* Informations */}
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-100">
                <div className="text-xs uppercase tracking-widest text-zinc-500">Dernière visite</div>
                <div className="mt-3 text-2xl font-bold text-zinc-900">{bus.lastVisit}</div>
              </div>

              <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-100">
                <div className="text-xs uppercase tracking-widest text-zinc-500">Date d'expiration</div>
                <div className="mt-3 text-2xl font-bold text-zinc-900">{bus.expirationDate}</div>
              </div>
            </div>

            {/* Progress Bar Section */}
            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-600">Expire dans</span>
                <span className="text-3xl font-bold text-zinc-900 tracking-tighter">
                  {daysLeft} <span className="text-lg text-zinc-600">jours</span>
                </span>
              </div>

              <div className="h-3 bg-zinc-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-700 ${barColor}`} 
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-zinc-500 mt-2">
                <span>Validité restante</span>
                <span>{pct.toFixed(0)}%</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="p-8 pt-0">
            <Button 
              className="w-full h-14 rounded-2xl text-base font-semibold bg-gradient-to-r from-[#3BC1A8] to-[#3A9AFF] hover:brightness-110 transition-all duration-300 shadow-lg flex items-center gap-3 text-white"
            >
              <Calendar size={22} />
              Planifier ma prochaine visite
            </Button>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-zinc-500 mt-8">
          Fiana • Mobilité intelligente et sécurisée
        </p>
      </div>
    </div>
  );
}