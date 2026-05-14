import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bus as BusIcon,
  MapPin,
  Power,
  Activity,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FianaMap, Marker, busIcon } from "@/components/FianaMap";
import { BUSES, BUS_LINES } from "@/lib/mock-data";

export const Route = createFileRoute("/chauffeur/mon-bus")({
  component: MonBus,
});

function MonBus() {
  const bus = BUSES[0];
  const line = BUS_LINES.find((l) => l.id === bus.ligneId)!;
  const [active, setActive] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4fffc] via-[#eef7ff] to-white p-4 md:p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-[#3BC1A8] to-[#3A9AFF] bg-clip-text text-3xl font-extrabold text-transparent">
            Mon espace chauffeur
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Bonjour{" "}
            <span className="font-semibold text-slate-700">
              {bus.chauffeur}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-[#3BC1A8]/20 bg-white px-4 py-2 shadow-sm">
          <Activity className="text-[#3BC1A8]" size={18} />
          <span className="text-sm font-medium text-slate-700">
            Système GPS actif
          </span>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-6 shadow-[0_15px_40px_rgba(58,154,255,0.12)] backdrop-blur-xl">
        {/* BACKGROUND EFFECT */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#3A9AFF]/10 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#3BC1A8]/10 blur-3xl"></div>

        {/* TOP CONTENT */}
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          {/* LEFT */}
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#3A9AFF]">
              Matricule du bus
            </div>

            <div className="text-4xl font-black tracking-tight text-slate-800">
              {bus.matricule}
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#3BC1A8]/10 to-[#3A9AFF]/10 px-4 py-3">
              <div className="rounded-xl bg-white p-2 shadow-sm">
                <BusIcon className="text-[#3A9AFF]" size={22} />
              </div>

              <div>
                <div className="text-xs text-slate-500">
                  Ligne assignée
                </div>

                <div className="font-semibold text-slate-700">
                  Ligne {line.number} — {line.name}
                </div>
              </div>
            </div>
          </div>

          {/* STATUS */}
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <Badge
              className={`rounded-full px-5 py-2 text-sm font-semibold shadow-md ${
                bus.fitness === "APTE"
                  ? "bg-gradient-to-r from-[#3BC1A8] to-[#49d6bb] text-white"
                  : "bg-gradient-to-r from-red-500 to-red-400 text-white"
              }`}
            >
              <ShieldCheck size={14} className="mr-1" />
              {bus.fitness}
            </Badge>

            <div className="rounded-2xl border border-[#3BC1A8]/10 bg-white px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <MapPin size={15} className="text-[#3A9AFF]" />
                Position en temps réel
              </div>

              <div className="mt-1 text-xs text-slate-500">
                Connecté au système de géolocalisation
              </div>
            </div>
          </div>
        </div>

        {/* MAP */}
        <div className="relative z-10 mt-6 overflow-hidden rounded-3xl border border-white bg-white shadow-inner">
          <div className="h-72">
            <FianaMap center={bus.position} zoom={15}>
              <Marker
                position={bus.position}
                icon={busIcon(line.color, line.number)}
              />
            </FianaMap>
          </div>
        </div>

        {/* FOOTER ACTION */}
        <div className="relative z-10 mt-6 flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-[#3BC1A8] to-[#3A9AFF] p-5 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg font-bold">
              {active ? "Tournée en cours" : "Bus hors service"}
            </div>

            <div className="mt-1 text-sm text-white/80">
              {active
                ? "Le véhicule est actuellement opérationnel."
                : "Le véhicule est momentanément indisponible."}
            </div>
          </div>

          <Button
            onClick={() => setActive(!active)}
            className={`rounded-2xl px-6 py-6 text-sm font-semibold shadow-xl transition-all duration-300 hover:scale-105 ${
              active
                ? "bg-white text-red-500 hover:bg-red-50"
                : "bg-white text-[#3BC1A8] hover:bg-[#ecfffb]"
            }`}
          >
            <Power size={18} className="mr-2" />

            {active ? "Fin de tournée" : "Démarrer ma tournée"}
          </Button>
        </div>
      </div>
    </div>
  );
}