import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Power, MapPin, Users, Car, Navigation2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useMyBus } from "../hooks/useBus";

export const Route = createFileRoute("/chauffeur/mon-bus")({
  component: MonBus,
});

function MonBus() {
  const { data: bus, isLoading, error } = useMyBus();
  const [active, setActive] = useState(true);

  const MAPTILER_KEY = "Nkd9QjufierbZprt6QDC";
  const mapStyle = `https://api.maptiler.com/maps/streets-v4/style.json?key=${MAPTILER_KEY}`;

  // Simulation précise à Talatamaty (Près de l'intersection principale)
  const SIMULATED_CAR_POS = {
    longitude: 47.0985,
    latitude: -21.4358,
    heading: 45 // Direction du véhicule
  };

  if (isLoading) return <div className="flex h-screen items-center justify-center italic text-slate-400">Synchronisation GPS...</div>;
  if (error || !bus) return <div className="flex h-screen items-center justify-center text-rose-500 font-bold">Erreur Flux de Données</div>;

  const driverName = bus.driver?.user.user_name || "Chauffeur";

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#F8FAFC]">
      
      {/* 1. CARTE DE NAVIGATION IMMERSIVE */}
      <div className="absolute inset-0 z-0">
        <Map
          initialViewState={{ 
            longitude: SIMULATED_CAR_POS.longitude, 
            latitude: SIMULATED_CAR_POS.latitude, 
            zoom: 17, // Zoom plus proche pour la voiture
            pitch: 60, // Angle de vue "conduite"
            bearing: SIMULATED_CAR_POS.heading 
          }}
          mapStyle={mapStyle}
          style={{ width: "100%", height: "100%" }}
        >
          {/* Marqueur Voiture avec animation de position */}
          <Marker longitude={SIMULATED_CAR_POS.longitude} latitude={SIMULATED_CAR_POS.latitude}>
            <div className="relative flex flex-col items-center">
              {/* Effet d'onde (Pulse) sous la voiture */}
              <div className="absolute -inset-4 z-0 rounded-full bg-[#3BC1A8]/20 animate-ping" />
              
              <motion.div 
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative z-10 flex size-14 items-center justify-center rounded-2xl bg-black text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-4 ring-white"
              >
                <Car size={28} fill="currentColor" className="text-[#3BC1A8]" />
              </motion.div>
              
              <div className="mt-3 flex items-center gap-1 rounded-full bg-black px-3 py-1 text-[9px] font-black tracking-tighter text-white shadow-lg uppercase">
                <Navigation2 size={8} fill="currentColor" className="rotate-45" />
                En mouvement
              </div>
            </div>
          </Marker>
        </Map>
      </div>

      {/* 2. OVERLAY : INFOS DU CONDUCTEUR */}
      <div className="absolute inset-x-0 top-0 z-20 p-4">
        <motion.div 
          initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="mx-auto flex max-w-xl items-center justify-between rounded-[2rem] border border-white/40 bg-white/80 p-4 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center gap-4">
            <div className="size-12 overflow-hidden rounded-2xl bg-slate-200 border-2 border-[#3BC1A8]">
              <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                <Users size={20} />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#3BC1A8]">Ma Session</p>
              <h2 className="text-base font-bold text-slate-900 leading-tight">{driverName}</h2>
            </div>
          </div>
          
          <div className="h-10 w-px bg-slate-200 mx-2" />
          
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Batterie</p>
            <p className="text-xs font-black text-slate-900">88%</p>
          </div>
        </motion.div>
      </div>

      {/* 3. DASHBOARD DE CONTRÔLE (BAS) */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-4 pb-10">
        <motion.div 
          initial={{ y: 100 }} animate={{ y: 0 }}
          className="mx-auto max-w-xl space-y-4"
        >
         
          {/* Bouton Principal Interactif */}
          <Button 
            onClick={() => setActive(!active)}
            className={`h-20 w-full rounded-[2.5rem] text-lg font-black transition-all shadow-[0_20px_40px_rgba(0,0,0,0.15)] ${
              active 
              ? "bg-rose-500 hover:bg-rose-600 text-white" 
              : "bg-[#3BC1A8] hover:bg-[#34ab95] text-white"
            }`}
          >
            <Power size={24} className="mr-3" strokeWidth={3} />
            {active ? "TERMINER LA TOURNÉE" : "DÉMARRER LA VOITURE"}
          </Button>

          {/* Location Footer */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-white/90 border border-slate-100 px-5 py-2.5 text-[10px] font-black text-slate-900 shadow-lg backdrop-blur-sm">
              <div className="size-2 rounded-full bg-[#3BC1A8] animate-pulse" />
              TALATAMATY - POINT DE CONTRÔLE A
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}