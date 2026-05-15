import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { MapPin, Search, Sparkles, Bus as BusIcon, Bike, Clock, Bell } from "lucide-react";
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

  const lng = FIANA_CENTER[1];
  const lat = FIANA_CENTER[0];


  const MAPTILER_KEY = "Nkd9QjufierbZprt6QDC";
const mapStyle =
  true
    ? `https://api.maptiler.com/maps/streets-v4/style.json?key=Nkd9QjufierbZprt6QDC`
    : "https://demotiles.maplibre.org/style.json";
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
    setSelected(opts[0].busId);
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
    <div className="flex flex-col">

      {/* SEARCH */}
      <div className="space-y-3 bg-bus-bg p-4">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase text-bus">
            Mon arrêt de départ
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-bus" />
            <Input value={from} onChange={(e) => setFrom(e.target.value)} className="bg-card pl-9" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase text-bus">
            Ma destination
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-bus" />
            <Input value={to} onChange={(e) => setTo(e.target.value)} className="bg-card pl-9" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase text-bus">
            Heure d'arrivée
          </Label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-bus" />
            <Input type="time" value={arriveBy} onChange={(e) => setArriveBy(e.target.value)} className="bg-card pl-9" />
          </div>
        </div>

        <Button size="lg" className="w-full bg-bus hover:bg-bus/90" onClick={handleSearch}>
          <Search size={18} className="mr-2" /> Rechercher
        </Button>
      </div>

      {/* MAP */}
      <div style={{ height: "320px", width: "100%" }}>
        <Map
          initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: 13,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle={mapStyle}
        >
          <Marker longitude={lng} latitude={lat}>
            <div className="size-4 rounded-full bg-blue-500 border-2 border-white" />
          </Marker>

          {/* BUS STOPS */}
          {BUS_LINES.flatMap((l) =>
            l.stops.map((s, i) => (
              <Marker key={`stop-${l.id}-${i}`} longitude={s.coords[1]} latitude={s.coords[0]}>
                <div className="size-3 rounded-full bg-white border-2" />
              </Marker>
            ))
          )}

          {/* BUS */}
          {BUSES.map((b) => {
            const line = BUS_LINES.find((l) => l.id === b.ligneId)!;

            return (
              <Marker key={b.id} longitude={b.position[1]} latitude={b.position[0]}>
                <div className="px-2 py-1 text-xs font-bold text-white rounded-full" style={{ background: line.color }}>
                  🚌 {line.number}
                </div>
              </Marker>
            );
          })}

          {/* ROUTE */}
          {geojson && selectedLine && (
            <Source id="route" type="geojson" data={geojson}>
              <Layer
                id="route-line"
                type="line"
                paint={{
                  "line-color": selectedLine.color,
                  "line-width": 5,
                }}
              />
            </Source>
          )}
        </Map>
      </div>

      {/* RESULTS */}
      <div className="p-4">
        {!results && (
          <div className="text-sm text-muted-foreground border p-4 rounded">
            Lance une recherche pour voir les bus.
          </div>
        )}
      </div>
    </div>
  );
}