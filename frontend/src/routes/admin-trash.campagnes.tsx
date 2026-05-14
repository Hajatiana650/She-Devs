import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Megaphone, Users, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CAMPAIGNS, QUARTIERS } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin-trash/campagnes")({
  component: Campagnes,
});

function Campagnes() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (q: string) => setSelected((s) => s.includes(q) ? s.filter((x) => x !== q) : [...s, q]);

  return (
    <div className="grid gap-6 p-4 md:p-6 lg:grid-cols-2">
      <div className="rounded-xl border bg-card p-5">
        <div className="flex items-center gap-2">
          <Megaphone className="text-trash" size={20} />
          <h2 className="font-bold">Lancer une campagne</h2>
        </div>
        <form className="mt-4 space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Annonce publiée"); }}>
          <div className="space-y-2">
            <Label>Titre de la campagne</Label>
            <Input placeholder="Ex: Grand nettoyage du quartier" required />
          </div>
          <div className="space-y-2">
            <Label>Quartiers ciblés</Label>
            <div className="flex flex-wrap gap-2">
              {QUARTIERS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => toggle(q)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${
                    selected.includes(q) ? "border-trash bg-trash text-trash-foreground" : "border-border hover:border-trash"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Date et heure</Label>
            <Input type="datetime-local" defaultValue="2026-05-25T08:00" />
          </div>
          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea rows={4} placeholder="Détails de la campagne..." />
          </div>
          <Button type="submit" className="w-full bg-trash hover:bg-trash/90">Publier l'annonce</Button>
        </form>
      </div>

      <div>
        <h2 className="font-bold">Campagnes actives</h2>
        <div className="mt-4 space-y-3">
          {CAMPAIGNS.map((c) => (
            <div key={c.id} className="rounded-xl border bg-card p-4">
              <h3 className="font-semibold">{c.title}</h3>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Calendar size={14} /> {new Date(c.date).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}</div>
                <div className="flex items-center gap-2"><MapPin size={14} /> {c.quartiers.join(", ")}</div>
                <div className="flex items-center gap-2"><Users size={14} /> {c.participants} participants</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
