import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { MapPin, Search, Sparkles, Bus as BusIcon, Bike, Clock, Bell, Navigation } from "lucide-react";
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
  if (s === "EN SERVICE") return "bg-emerald-500 text-white";
  if (s === "EN RETARD") return "bg-amber-500 text-white";
  if (s === "COMPLET") return "bg-red-500 text-white";
  return "bg-muted";
}

function OccupancyDots({ value }: { value: number }) {
  const filled = Math.ceil(value / 20);
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, k) => (
        <div
          key={k}
          className={`h-1.5 w-4 rounded-full transition-all ${
            k < filled ? "bg-[#3BC1A8]" : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}

function BusSearch() {
  const [from, setFrom] = useState("Centre Ville");
  const [to, setTo] = useState("Tanambao");
  const [arriveBy, setArriveBy] = useState("14:00");
  const [results, setResults] = useState<RouteOption[] | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [alertEnabled, setAlertEnabled] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [mapStyle, setMapStyle] = useState<"voyager" | "positron" | "stamen" | "osm">("voyager");

  useEffect(() => {
    // Delay map rendering to ensure DOM is ready
    const timer = setTimeout(() => {
      setMapReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
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
    setSelected(opts[0]?.busId || null);
  };

  const aiRec = useMemo(() => {
    if (!results) return null;
    const [h, m] = arriveBy.split(":").map(Number);
    const targetMin = h * 60 + m;
    const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
    const bestArrive = nowMin + results[0].arriveMin + 18;
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
      {/* Search Panel */}
      <div className="bg-[#3BC1A8]/5 px-4 pb-8 pt-6">
        <div className="flex justify-between gap-12">

          {/* Left - Champs (fonctionnement original) */}
          <div className="flex-1 max-w-md">
            <div className="relative mb-5 flex flex-col gap-3">
              <div className="absolute left-[18px] top-[38px] h-[calc(100%-44px)] w-px bg-[#3BC1A8]/30" />

              <div className="flex items-center gap-3">
                <div className="z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#3BC1A8] shadow-sm shadow-[#3BC1A8]/40">
                  <div className="size-2 rounded-full bg-white" />
                </div>
                <div className="flex-1">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#3BC1A8]/70">Départ</p>
                  <Input
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="h-10 border-[#3BC1A8]/20 bg-white text-sm font-medium shadow-none focus-visible:border-[#3BC1A8] focus-visible:ring-1 focus-visible:ring-[#3BC1A8]/30"
                    placeholder="Ex: Centre Ville"
                  />
                </div>
                <button className="mt-6 p-2 text-[#3BC1A8] hover:bg-[#3BC1A8]/10 rounded-md" title="Ma position">
                  <Navigation size={18} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-[#3BC1A8] bg-white">
                  <MapPin size={14} className="text-[#3BC1A8]" />
                </div>
                <div className="flex-1">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#3BC1A8]/70">Destination</p>
                  <Input
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="h-10 border-[#3BC1A8]/20 bg-white text-sm font-medium shadow-none focus-visible:border-[#3BC1A8] focus-visible:ring-1 focus-visible:ring-[#3BC1A8]/30"
                    placeholder="Ex: Tanambao"
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#3BC1A8]/70">Arriver avant</p>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#3BC1A8]/70" />
                <Input
                  type="time"
                  value={arriveBy}
                  onChange={(e) => setArriveBy(e.target.value)}
                  className="h-10 border-[#3BC1A8]/20 bg-white pl-10 text-sm font-medium shadow-none focus-visible:border-[#3BC1A8] focus-visible:ring-1 focus-visible:ring-[#3BC1A8]/30"
                />
              </div>
            </div>

            <Button
              size="default"
              className="h-11 w-full gap-2 bg-[#3BC1A8] text-base font-semibold shadow-sm shadow-[#3BC1A8]/30 hover:bg-[#3BC1A8]/90"
              onClick={handleSearch}
            >
              <Search size={18} />
              Rechercher
            </Button>
          </div>

          {/* Right Side - Beau design demandé */}
          <div className="hidden xl:flex flex-1 items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.25, 1], rotate: [0, 12, -12, 0] }}
                transition={{ duration: 2.8, repeat: Infinity }}
                className="text-[120px] font-black text-[#3BC1A8] leading-none mb-4"
              >
                ?
              </motion.div>

              <p className="text-3xl font-bold text-[#3BC1A8]">Vous allez quelque part ?</p>
              <p className="mt-3 text-lg text-[#3A9AFF]">Trouvez le bus parfait en quelques secondes avec Fiana</p>

              <motion.div
                animate={{ x: [-25, 25, -25], rotate: [-8, 8, -8] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="mt-10"
              >
                <BusIcon size={72} className="mx-auto text-[#3BC1A8]" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="h-[400px] w-full relative overflow-hidden rounded-lg">
        {/* Map Style Selector */}
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          {(["voyager", "positron", "stamen", "osm"] as const).map((style) => (
            <button
              key={style}
              onClick={() => setMapStyle(style)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                mapStyle === style
                  ? "bg-[#3BC1A8] text-white shadow-md"
                  : "bg-white text-[#3BC1A8] border border-[#3BC1A8]/30 hover:border-[#3BC1A8]"
              }`}
            >
              {style === "voyager" && "Voyager"}
              {style === "positron" && "Clair"}
              {style === "stamen" && "Terrain"}
              {style === "osm" && "OSM"}
            </button>
          ))}
        </div>
        
        {mapReady ? (
          <FianaMap mapStyle={mapStyle}>
            <CircleMarker
              center={FIANA_CENTER}
              radius={8}
              pathOptions={{ color: "#3A9AFF", fillColor: "#3A9AFF", fillOpacity: 0.9 }}
            />
            {BUS_LINES.flatMap((l) =>
              l.stops.map((s, i) => (
                <Marker key={`${l.id}-${i}`} position={s.coords} icon={stopIcon(l.color)} />
              ))
            )}
            {BUSES.filter((b) => b.status !== "INAPTE").map((b) => {
              const line = BUS_LINES.find((l) => l.id === b.ligneId)!;
              return <Marker key={b.id} position={b.position} icon={busIcon(line.color, line.number)} />;
            })}
            {selected && (() => {
              const bus = BUSES.find((b) => b.id === selected);
              const line = bus ? BUS_LINES.find((l) => l.id === bus.ligneId) : null;
              return line ? (
                <Polyline
                  positions={line.stops.map((s) => s.coords)}
                  pathOptions={{ color: line.color, weight: 5, opacity: 0.7 }}
                />
              ) : null;
            })()}
          </FianaMap>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/20">
            <div className="text-center">
              <BusIcon size={32} className="mx-auto mb-2 text-muted-foreground animate-pulse" />
              <p className="text-sm text-muted-foreground">Chargement de la carte...</p>
            </div>
          </div>
        )}
      </div>

      {/* Results - Fonctionnement complet conservé */}
      <div className="space-y-3 p-4">
        {!results && (
          <div className="rounded-xl border border-dashed border-[#3BC1A8]/20 bg-[#3BC1A8]/5 p-8 text-center">
            <BusIcon size={28} className="mx-auto mb-2 text-[#3BC1A8]/30" />
            <p className="text-sm text-muted-foreground">
              Entrez votre trajet et cliquez sur Rechercher pour voir les options disponibles.
            </p>
          </div>
        )}

        {aiRec && aiRec.late && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-xl border border-primary bg-card shadow-sm"
          >
            <div className="flex items-center gap-2 bg-[#3BC1A8] px-4 py-2.5">
              <Sparkles size={14} className="text-white/80" />
              <span className="text-sm font-semibold text-white">Recommandation IA</span>
            </div>
            <div className="p-4">
              <p className="mb-4 text-sm leading-relaxed text-foreground">
                Pour arriver à <strong>{to}</strong> avant {arriveBy}, le bus arrive trop tard.
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                <button className="rounded-xl border border-border bg-background p-3 text-left transition hover:border-primary/40">
                  <div className="mb-2 flex items-center gap-1.5">
                    <div className="flex size-6 items-center justify-center rounded-md bg-muted">
                      <BusIcon size={12} className="text-muted-foreground" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Bus</span>
                  </div>
                  <div className="text-lg font-bold">14h22</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{aiRec.busCost} Ar</div>
                  <Button variant="outline" size="sm" className="mt-3 h-7 w-full text-xs">Choisir</Button>
                </button>

                <button className="rounded-xl border-2 border-[#3BC1A8] bg-[#3BC1A8]/5 p-3 text-left">
                  <div className="mb-2 flex items-center gap-1.5">
                    <div className="flex size-6 items-center justify-center rounded-md bg-[#3BC1A8]/20">
                      <Bike size={12} className="text-[#3BC1A8]" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#3BC1A8]">Taxi-brousse</span>
                  </div>
                  <div className="text-lg font-bold">{aiRec.taxiMin} min</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{aiRec.taxiCost} Ar</div>
                  <Button size="sm" className="mt-3 h-7 w-full bg-[#3BC1A8] text-xs">Choisir</Button>
                </button>
              </div>
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
                className={`w-full overflow-hidden rounded-xl border bg-card text-left transition-all ${
                  isSel ? "border-[#3BC1A8] shadow-sm shadow-[#3BC1A8]/10" : "border-border hover:border-[#3BC1A8]/30"
                }`}
              >
                <div className="h-0.5 w-full" style={{ background: isSel ? line.color : "transparent" }} />
                <div className="p-4">
                  {/* ... le reste des cartes reste identique ... */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm" style={{ background: line.color }}>
                        {line.number}
                      </div>
                      <div>
                        <div className="font-semibold leading-tight">{line.name}</div>
                        <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin size={10} />
                          {r.stopName} · {r.walkMin} min à pied
                        </div>
                      </div>
                    </div>
                    <Badge className={`${statusColor(r.status)} shrink-0 text-[10px] font-semibold`}>
                      {r.status}
                    </Badge>
                  </div>

                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Arrive dans</div>
                      <div className="text-2xl font-bold leading-none text-[#3BC1A8]">
                        {r.arriveMin}
                        <span className="ml-0.5 text-sm font-normal text-muted-foreground">min</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mb-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">Occupation</div>
                      <OccupancyDots value={r.occupancy} />
                    </div>
                  </div>

                  {isSel && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden">
                      <div className="mt-4 border-t pt-3">
                        <div className="flex items-center gap-2 text-sm text-[#3BC1A8]">
                          <Bell size={14} />
                          Votre bus arrive dans {r.arriveMin} min
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                          <motion.div className="h-full rounded-full bg-[#3BC1A8]" initial={{ width: "0%" }} animate={{ width: `${100 - r.arriveMin * 8}%` }} transition={{ duration: 1 }} />
                        </div>
                        <div className="mt-3 flex items-center justify-between rounded-lg bg-[#3BC1A8]/5 px-3 py-2.5">
                          <Label htmlFor="alert" className="text-sm font-medium">M'alerter à 2 arrêts</Label>
                          <Switch id="alert" checked={alertEnabled} onCheckedChange={setAlertEnabled} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}