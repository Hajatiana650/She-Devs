import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
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
    <div className="space-y-3 p-4">
      <div>
        <h2 className="text-lg font-bold">Campagnes citoyennes</h2>
        <p className="text-sm text-muted-foreground">Participez aux actions collectives de votre ville.</p>
      </div>

      {CAMPAIGNS.map((c) => (
        <div key={c.id} className="rounded-xl border bg-card p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold">{c.title}</h3>
            <Badge className="bg-trash-bg text-trash">Active</Badge>
          </div>
          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Calendar size={14} /> {new Date(c.date).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}</div>
            <div className="flex items-center gap-2"><MapPin size={14} /> {c.quartiers.join(", ")}</div>
            <div className="flex items-center gap-2"><Users size={14} /> {counts[c.id]} habitants participent déjà</div>
          </div>
          <p className="mt-3 text-sm">{c.message}</p>
          <Button
            size="lg"
            className={`mt-3 w-full ${joined[c.id] ? "bg-status-success hover:bg-status-success/90" : "bg-trash hover:bg-trash/90"}`}
            onClick={() => toggle(c.id)}
          >
            {joined[c.id] ? "✓ Vous participez" : "Je participe"}
          </Button>
        </div>
      ))}
    </div>
  );
}
