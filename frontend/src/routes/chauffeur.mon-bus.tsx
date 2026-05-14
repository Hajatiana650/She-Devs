import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bus as BusIcon, Power, Activity, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FianaMap, Marker, busIcon } from "@/components/FianaMap";
import { useMyBus } from "../hooks/useBus";

export const Route = createFileRoute("/chauffeur/mon-bus")({
  component: MonBus,
});

function MonBus() {
  const { data: bus, isLoading, error } = useMyBus();
  const [active, setActive] = useState(true);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Chargement des données du bus...
      </div>
    );
  }

  if (error || !bus) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Erreur lors du chargement du bus
      </div>
    );
  }

  const lineNumber = bus.line.nb_line;
  const driverName = bus.driver?.user.user_name || "Chauffeur";

  const position: [number, number] = [
    bus.localisation.latitude,
    bus.localisation.longitude,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4fffc] via-[#eef7ff] to-white p-4 md:p-6">

      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-[#3BC1A8] to-[#3A9AFF] bg-clip-text text-3xl font-extrabold text-transparent">
            Mon espace chauffeur
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Bonjour <span className="font-semibold text-slate-700">{driverName}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-[#3BC1A8]/20 bg-white px-4 py-2 shadow-sm">
          <Activity className="text-[#3BC1A8]" size={18} />
          GPS actif
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border bg-white/80 p-6 shadow-xl backdrop-blur-xl">

        <div className="mt-6 h-80 w-full overflow-hidden rounded-3xl">
          <FianaMap center={position} zoom={15}>
            <Marker position={position} icon={busIcon("#3BC1A8", String(lineNumber))} />
          </FianaMap>
        </div>

        <div className="mt-6 flex justify-between">
          <Button onClick={() => setActive(!active)}>
            <Power size={18} className="mr-2" />
            {active ? "Fin de tournée" : "Démarrer"}
          </Button>
        </div>

      </div>
    </div>
  );
}