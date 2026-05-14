import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, MapPin, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CAMPAIGNS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/campagnes")({
  component: Campagnes,
});

function Campagnes() {
  const [joined, setJoined] = useState<Record<string, boolean>>({});
  const [counts, setCounts] = useState<Record<string, number>>(
    Object.fromEntries(CAMPAIGNS.map((c) => [c.id, c.participants]))
  );

  const toggle = (id: string) => {
    setJoined((j) => ({ ...j, [id]: !j[id] }));
    setCounts((c) => ({ ...c, [id]: c[id] + (joined[id] ? -1 : 1) }));
  };

  return (
    <div className="space-y-8 p-6 bg-white min-h-screen">
      {/* Header Style "Black" */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900">Campagnes</h1>
          <p className="text-gray-500 mt-1">Actions collectives pour Fianarantsoa</p>
        </div>
      </div>

      {/* Grid de cartes style "Glass-Medical" */}
      <div className="grid md:grid-cols-2 gap-6">
        {CAMPAIGNS.map((c) => (
          <div 
            key={c.id} 
            className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-gray-50/50 p-6 shadow-sm transition-all hover:shadow-md"
          >
            {/* Badge en haut à droite */}
            <div className="flex justify-between items-start mb-4">
              <Badge className="bg-[#3BC1A8]/10 text-[#3BC1A8] border-none rounded-full px-4 py-1 font-bold">
                Active
              </Badge>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900 leading-tight">{c.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{c.message}</p>
            </div>

            {/* Infos avec icônes (Style épuré) */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm text-[#3BC1A8]">
                  <Calendar size={16} />
                </div>
                {new Date(c.date).toLocaleString("fr-FR", { dateStyle: "long" })}
              </div>

              <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm text-[#3BC1A8]">
                  <MapPin size={16} />
                </div>
                {c.quartiers.join(", ")}
              </div>

              <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm text-[#3BC1A8]">
                  <Users size={16} />
                </div>
                {counts[c.id]} participants
              </div>
            </div>

            {/* Bouton d'action adapté au code couleur */}
            <Button
              size="lg"
              className={`mt-8 w-full h-14 rounded-2xl text-base font-bold transition-all shadow-lg ${
                joined[c.id] 
                  ? "bg-white border-2 border-[#3BC1A8] text-[#3BC1A8] hover:bg-gray-50 shadow-none" 
                  : "bg-[#3BC1A8] text-white hover:bg-[#3BC1A8]/90 shadow-[#3BC1A8]/20"
              }`}
              onClick={() => toggle(c.id)}
            >
              {joined[c.id] ? (
                <span className="flex items-center gap-2"><CheckCircle2 size={20} /> Vous participez</span>
              ) : (
                "Je participe"
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}