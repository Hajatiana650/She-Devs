import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bus as BusIcon, MapPin, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FianaMap, Marker, busIcon } from "@/components/ui/FianaMap";
import { BUSES, BUS_LINES } from "@/lib/mock-data";



export function MonBus() {
  const bus = BUSES[0];
  const line = BUS_LINES.find((l) => l.id === bus.ligneId)!;
  const [active, setActive] = useState(true);

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold">Mon espace chauffeur</h1>
        <p className="text-sm text-muted-foreground">Bonjour {bus.chauffeur}</p>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs uppercase text-muted-foreground">Matricule</div>
            <div className="mt-1 text-2xl font-bold">{bus.matricule}</div>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <BusIcon size={16} /> Ligne {line.number} — {line.name}
            </div>
          </div>
          <Badge className={`${bus.fitness === "APTE" ? "bg-status-success" : "bg-status-danger"} text-white px-4 py-1.5 text-sm`}>
            {bus.fitness}
          </Badge>
        </div>

        <div className="mt-4 h-64 overflow-hidden rounded-lg border">
          <FianaMap center={bus.position} zoom={15}>
            <Marker position={bus.position} icon={busIcon(line.color, line.number)} />
          </FianaMap>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-bus-bg p-3">
          <div>
            <div className="text-sm font-semibold">{active ? "Tournée en cours" : "Hors service"}</div>
            <div className="text-xs text-muted-foreground">
              <MapPin className="inline" size={12} /> Position GPS active
            </div>
          </div>
          <Button
            onClick={() => setActive(!active)}
            className={active ? "bg-status-danger hover:bg-status-danger/90" : "bg-status-success hover:bg-status-success/90"}
          >
            <Power size={16} /> {active ? "Fin de tournée" : "Démarrer ma tournée"}
          </Button>
        </div>
      </div>
    </div>
  );
}
