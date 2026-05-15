import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { MapPin, Search, Sparkles, Bus as BusIcon, Bike, Clock, Bell, Navigation, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import Map, { Marker, Source, Layer } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { BUS_LINES, BUSES, FIANA_CENTER } from "@/lib/mock-data";

export const Route = createFileRoute("/app/bus")({
  component: BusSearch,
});

// --- Helpers ---
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
          className={`h-1.5 w-4 rounded-full transition-all duration-500 ${
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
  const [results, setResults] = useState<any[] | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [alertEnabled, setAlertEnabled] = useState(false);

  const MAPTILER_KEY = "Nkd9QjufierbZprt6QDC";
  const mapStyle = `https://api.maptiler.com/maps/streets-v4/style.json?key=${MAPTILER_KEY}`;

  const handleSearch = () => {
    const opts = BUSES.filter((b) => b.status !== "INAPTE")
      .slice(0, 3)
      .map((b, i) => ({
        ligneId: b.ligneId,
        busId: b.id,
        stopName: BUS_LINES.find((l) => l.id === b.ligneId)!.stops[1].name,
        walkMin: 3 + i * 2,
        arriveMin: 6 + i * 8,
        occupancy: b.occupancy,
        status: b.status,
      }));
    setResults(opts);
    setSelected(opts[0]?.busId || null);
  };

  // --- Logic Map ---
  const selectedLine = useMemo(() => {
    if (!selected) return null;
    const bus = BUSES.find((b) => b.id === selected);
    return bus ? BUS_LINES.find((l) => l.id === bus.ligneId) ?? null : null;
  }, [selected]);

  const geojson = useMemo(() => {
    if (!selectedLine) return null;
    return {
      type: "Feature" as const,
      geometry: {
        type: "LineString" as const,
        coordinates: selectedLine.stops.map((s) => [s.coords[1], s.coords[0]]),
      },
      properties: {},
    };
  }, [selectedLine]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      
      {/* SEARCH PANEL PREMIUM */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-b from-[#3BC1A8]/10 to-transparent px-4 pb-8 pt-6"
      >
        <div className="mx-auto max-w-xl">
          <div className="relative flex flex-col gap-4">
            {/* Ligne pointillée décorative entre départ et arrivée */}
            <div className="absolute left-[17px] top-[34px] h-[48px] w-[2px] border-l-2 border-dotted border-[#3BC1A8]/30" />

            {/* Départ */}
            <div className="group relative flex items-center gap-4">
              <div className="z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#3BC1A8] shadow-lg shadow-[#3BC1A8]/20 ring-4 ring-white">
                <div className="size-2.5 rounded-full bg-white animate-pulse" />
              </div>
              <div className="flex-1">
                <Label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-[#3BC1A8]">Point de départ</Label>
                <div className="relative">
                  <Input 
                    value={from} 
                    onChange={(e) => setFrom(e.target.value)}
                    className="h-12 border-none bg-white shadow-sm ring-1 ring-black/5 transition-all focus-visible:ring-[#3BC1A8]"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3BC1A8]">
                    <Navigation size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Arrivée */}
            <div className="group relative flex items-center gap-4">
              <div className="z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-[#3BC1A8] bg-white shadow-md ring-4 ring-white">
                <MapPin size={16} className="text-[#3BC1A8]" />
              </div>
              <div className="flex-1">
                <Label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-[#3BC1A8]">Destination</Label>
                <Input 
                  value={to} 
                  onChange={(e) => setTo(e.target.value)}
                  className="h-12 border-none bg-white shadow-sm ring-1 ring-black/5 transition-all focus-visible:ring-[#3BC1A8]"
                />
              </div>
            </div>

            {/* Heure + Bouton */}
            <div className="mt-2 flex items-center gap-3">
              <div className="flex-1">
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#3BC1A8]" />
                  <Input 
                    type="time" 
                    value={arriveBy} 
                    onChange={(e) => setArriveBy(e.target.value)}
                    className="h-11 border-none bg-white pl-10 shadow-sm ring-1 ring-black/5"
                  />
                </div>
              </div>
              <Button 
                onClick={handleSearch}
                className="h-11 bg-[#3BC1A8] px-6 font-bold shadow-lg shadow-[#3BC1A8]/30 hover:bg-[#3BC1A8]/90"
              >
                <Search size={18} className="mr-2" />
                Trouver
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* MAP SECTION WITH OVERLAY BADGE */}
      <div className="relative h-[300px] w-full border-y bg-muted overflow-hidden shadow-inner">
        <Map
          initialViewState={{ longitude: FIANA_CENTER[1], latitude: FIANA_CENTER[0], zoom: 13.5 }}
          mapStyle={mapStyle}
          style={{ width: "100%", height: "100%" }}
        >
          {/* User Position */}
          <Marker longitude={FIANA_CENTER[1]} latitude={FIANA_CENTER[0]}>
             <motion.div 
               animate={{ scale: [1, 1.2, 1] }} 
               transition={{ repeat: Infinity, duration: 2 }}
               className="size-5 rounded-full bg-[#3A9AFF] border-4 border-white shadow-lg" 
             />
          </Marker>

          {/* Render Buses */}
          {BUSES.filter(b => b.status !== "INAPTE").map((b) => {
            const line = BUS_LINES.find((l) => l.id === b.ligneId)!;
            return (
              <Marker key={b.id} longitude={b.position[1]} latitude={b.position[0]}>
                <div 
                  className="flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-black text-white shadow-lg transition-transform hover:scale-110" 
                  style={{ background: line.color }}
                >
                  <BusIcon size={10} fill="white" /> {line.number}
                </div>
              </Marker>
            );
          })}

          {/* Route Layer */}
          {geojson && selectedLine && (
            <Source id="route" type="geojson" data={geojson}>
              <Layer
                id="route-line"
                type="line"
                paint={{ "line-color": selectedLine.color, "line-width": 6, "line-opacity": 0.8 }}
              />
            </Source>
          )}
        </Map>
        
        {/* Overlay Badge */}
        <div className="absolute bottom-4 left-4 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-[10px] font-bold shadow-sm border border-black/5 flex items-center gap-2">
           <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
           DIRECT FIANARANTSOA LIVE
        </div>
      </div>

      {/* RESULTS LIST */}
      <div className="flex-1 p-4">
        <AnimatePresence mode="wait">
          {!results ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="mb-4 rounded-full bg-[#3BC1A8]/10 p-6">
                <BusIcon size={40} className="text-[#3BC1A8] opacity-40" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Prêt pour le départ ?<br/>Lancez la recherche pour voir les bus.</p>
            </motion.div>
          ) : (
            <motion.div className="space-y-4">
               {results.map((r, i) => {
                 const line = BUS_LINES.find(l => l.id === r.ligneId)!;
                 const isSel = selected === r.busId;
                 return (
                   <motion.div
                     key={r.busId}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.1 }}
                     onClick={() => setSelected(r.busId)}
                     className={`relative cursor-pointer rounded-2xl border bg-white p-4 transition-all ${
                       isSel ? "border-[#3BC1A8] ring-1 ring-[#3BC1A8]" : "border-black/5 hover:border-[#3BC1A8]/50"
                     }`}
                   >
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div 
                            className="flex size-12 items-center justify-center rounded-xl text-lg font-black text-white shadow-md"
                            style={{ background: line.color }}
                          >
                            {line.number}
                          </div>
                          <div>
                            <h4 className="font-bold">{line.name}</h4>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin size={10} /> {r.stopName} · {r.walkMin}m
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-[#3BC1A8]">{r.arriveMin}<span className="text-xs font-normal opacity-60 ml-0.5">min</span></div>
                          <Badge className={`${statusColor(r.status)} text-[9px] h-4 uppercase`}>{r.status}</Badge>
                        </div>
                     </div>

                     {/* Details expansibles */}
                     <AnimatePresence>
                       {isSel && (
                         <motion.div 
                           initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                           className="mt-4 border-t pt-4"
                         >
                            <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground mb-2">
                               <span>Occupation</span>
                               <span className={r.occupancy > 80 ? "text-red-500" : "text-[#3BC1A8]"}>{r.occupancy}%</span>
                            </div>
                            <OccupancyDots value={r.occupancy} />
                            
                            <div className="mt-4 flex items-center justify-between rounded-xl bg-[#3BC1A8]/5 p-3">
                               <div className="flex items-center gap-2">
                                  <Bell size={14} className="text-[#3BC1A8]" />
                                  <span className="text-xs font-medium">Alerte de proximité</span>
                               </div>
                               <Switch checked={alertEnabled} onCheckedChange={setAlertEnabled} />
                            </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </motion.div>
                 );
               })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}