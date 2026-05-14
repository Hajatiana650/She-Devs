import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { MapPin, Search, Sparkles, Bus as BusIcon, Bike, Clock, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { FianaMap, Marker, CircleMarker, Polyline, busIcon, stopIcon } from "@/components/FianaMap";
import { BUS_LINES, BUSES, FIANA_CENTER } from "@/lib/mock-data";

export const Route = createFileRoute("/app/bus")({
  component: BusSearch,
});

interface RouteOption {
  ligneId: string;
  busId: string;
  stopName: string;
  walkMin: number;
  arriveMin: number;
  occupancy: number;
  status: "EN SERVICE" | "EN RETARD" | "COMPLET";
}

function statusColor(s: string) {
  if (s === "EN SERVICE") return "bg-status-success text-white";
  if (s === "EN RETARD") return "bg-status-warning text-white";
  if (s === "COMPLET") return "bg-status-danger text-white";
  return "bg-muted";
}

function BusSearch() {
  const [from, setFrom] = useState("Centre Ville");
  const [to, setTo] = useState("Tanambao");
  const [arriveBy, setArriveBy] = useState("14:00");
  const [results, setResults] = useState<RouteOption[] | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [alertEnabled, setAlertEnabled] = useState(false);

  const handleSearch = () => {
    // Mock smart logic
    const opts: RouteOption[] = BUSES
      .filter((b) => b.status !== "INAPTE")
      .slice(0, 3)
      .map((b, i) => ({
        ligneId: b.ligneId,
        busId: b.id,
        stopName: BUS_LINES.find((l) => l.id === b.ligneId)!.stops[1].name,
        walkMin: 3 + i * 2,
        arriveMin: 6 + i * 8,
        occupancy: b.occupancy,
        status: b.status as RouteOption["status"],
      }));
    setResults(opts);
    setSelected(opts[0].busId);
  };

  // AI Recommendation logic: target arrival vs ETA
  const aiRec = useMemo(() => {
    if (!results) return null;
    const [h, m] = arriveBy.split(":").map(Number);
    const targetMin = h * 60 + m;
    const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
    const bestArrive = nowMin + results[0].arriveMin + 18; // travel time
    const wouldBeLate = bestArrive > targetMin;
    return {
      late: wouldBeLate,
      bus: results[0],
      taxiMin: 12,
      taxiCost: 2000,
      busCost: 600,
    };
  }, [results, arriveBy]);

  return (
    <div className="flex flex-col">
      {/* Search */}
      <div className="space-y-3 bg-bus-bg p-4">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase text-bus">Mon arrêt de départ</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-bus" />
            <Input value={from} onChange={(e) => setFrom(e.target.value)} className="bg-card pl-9" placeholder="Ex: Centre Ville" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-bus p-1.5 text-white" title="Ma position">
              <MapPin size={14} />
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase text-bus">Ma destination</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-bus" />
            <Input value={to} onChange={(e) => setTo(e.target.value)} className="bg-card pl-9" placeholder="Ex: Tanambao" />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase text-bus">À quelle heure dois-je arriver ?</Label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-bus" />
            <Input type="time" value={arriveBy} onChange={(e) => setArriveBy(e.target.value)} className="bg-card pl-9" />
          </div>
        </div>
        <Button size="lg" className="w-full bg-bus hover:bg-bus/90" onClick={handleSearch}>
          <Search size={18} /> Rechercher
        </Button>
      </div>

      {/* Map */}
      <div className="h-[320px] w-full">
        <FianaMap>
          {/* User position */}
          <CircleMarker center={FIANA_CENTER} radius={8} pathOptions={{ color: "#378ADD", fillColor: "#378ADD", fillOpacity: 0.9 }} />
          {/* Bus stops */}
          {BUS_LINES.flatMap((l) =>
            l.stops.map((s, i) => (
              <Marker key={`${l.id}-${i}`} position={s.coords} icon={stopIcon(l.color)} />
            ))
          )}
          {/* Buses */}
          {BUSES.filter((b) => b.status !== "INAPTE").map((b) => {
            const line = BUS_LINES.find((l) => l.id === b.ligneId)!;
            return <Marker key={b.id} position={b.position} icon={busIcon(line.color, line.number)} />;
          })}
          {/* Highlighted route */}
          {selected && (() => {
            const bus = BUSES.find((b) => b.id === selected);
            const line = bus ? BUS_LINES.find((l) => l.id === bus.ligneId) : null;
            return line ? <Polyline positions={line.stops.map((s) => s.coords)} pathOptions={{ color: line.color, weight: 5, opacity: 0.7 }} /> : null;
          })()}
        </FianaMap>
      </div>

      {/* Results */}
      <div className="space-y-3 p-4">
        {!results && (
          <div className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
            Entrez votre trajet et cliquez sur Rechercher pour voir les options de bus disponibles.
          </div>
        )}

        {/* AI Recommendation */}
        {aiRec && aiRec.late && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border-2 border-bus-accent bg-card p-4 shadow-sm"
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-bus text-bus-foreground">
                <Sparkles size={16} />
              </div>
              <h3 className="font-semibold text-bus">Recommandation IA</h3>
            </div>
            <p className="text-sm text-foreground">
              Pour arriver à <strong>{to}</strong> avant {arriveBy}, le bus ligne {BUS_LINES.find((l) => l.id === aiRec.bus.ligneId)?.number} arrivera trop tard.
              Nous recommandons un taxi-brousse depuis l'arrêt Kianjasoa.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button className="rounded-lg border border-border bg-background p-3 text-left transition hover:border-bus">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <BusIcon size={14} /> BUS
                </div>
                <div className="mt-1 font-bold">14h22</div>
                <div className="text-xs text-muted-foreground">~{aiRec.busCost} Ar</div>
                <Button variant="outline" size="sm" className="mt-2 w-full">Choisir</Button>
              </button>
              <button className="rounded-lg border-2 border-bus bg-bus-bg p-3 text-left">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-bus">
                  <Bike size={14} /> TAXI-BROUSSE
                </div>
                <div className="mt-1 font-bold">{aiRec.taxiMin} min</div>
                <div className="text-xs text-muted-foreground">~{aiRec.taxiCost} Ar</div>
                <Button size="sm" className="mt-2 w-full bg-bus">Choisir</Button>
              </button>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {results?.map((r, i) => {
            const line = BUS_LINES.find((l) => l.id === r.ligneId)!;
            const isSel = selected === r.busId;
            return (
              <motion.button
                key={r.busId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(r.busId)}
                className={`w-full rounded-xl border bg-card p-4 text-left transition ${isSel ? "ring-2 ring-bus" : "hover:border-bus-accent"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-lg font-bold text-white" style={{ background: line.color }}>
                      {line.number}
                    </div>
                    <div>
                      <div className="font-semibold">{line.name}</div>
                      <div className="text-xs text-muted-foreground">Arrêt {r.stopName} — {r.walkMin} min à pied</div>
                    </div>
                  </div>
                  <Badge className={statusColor(r.status)}>{r.status}</Badge>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Arrive dans</div>
                    <div className="text-xl font-bold text-bus">{r.arriveMin} min</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Occupation</div>
                    <div className="mt-1 flex gap-0.5">
                      {[...Array(5)].map((_, k) => (
                        <div key={k} className={`size-2 rounded-full ${k < Math.ceil(r.occupancy / 20) ? "bg-bus" : "bg-border"}`} />
                      ))}
                    </div>
                  </div>
                </div>

                {isSel && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 overflow-hidden border-t pt-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-bus">
                        <Bell size={16} /> Votre bus arrive dans {r.arriveMin} min
                      </div>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className="h-full bg-bus"
                        initial={{ width: "0%" }}
                        animate={{ width: `${100 - r.arriveMin * 8}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between rounded-lg bg-bus-bg p-3">
                      <Label htmlFor="alert" className="text-sm">M'alerter à 2 arrêts</Label>
                      <Switch id="alert" checked={alertEnabled} onCheckedChange={setAlertEnabled} />
                    </div>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
