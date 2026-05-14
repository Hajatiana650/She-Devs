import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Camera, MapPin, CheckCircle2, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { QUARTIERS, SIGNALS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/signaler")({
  component: Signaler,
});

function Signaler() {
  const [submitted, setSubmitted] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [quartier, setQuartier] = useState("Ankofafa");
  const [desc, setDesc] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setPhoto(URL.createObjectURL(f));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
          <div className="flex size-20 items-center justify-center rounded-full bg-trash text-trash-foreground">
            <CheckCircle2 size={48} />
          </div>
        </motion.div>
        <h2 className="mt-4 text-xl font-bold">Merci !</h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Votre signalement a été transmis à l'équipe municipale.
        </p>

        <div className="mt-6 w-full max-w-sm rounded-xl border bg-card p-4">
          <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">Suivi</p>
          <div className="flex items-center justify-between">
            {["En attente", "Pris en compte", "Collecte planifiée"].map((s, i) => (
              <div key={s} className="flex flex-1 flex-col items-center">
                <div className={`size-3 rounded-full ${i === 0 ? "bg-trash" : "bg-border"}`} />
                <span className="mt-1.5 text-[10px] text-muted-foreground">{s}</span>
              </div>
            ))}
          </div>
        </div>
        <Button className="mt-6 bg-trash hover:bg-trash/90" onClick={() => { setSubmitted(false); setPhoto(null); setDesc(""); }}>
          Nouveau signalement
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <div className="rounded-xl border bg-card p-5">
        <h2 className="text-lg font-bold">Signaler un excès de déchets</h2>
        <p className="mt-1 text-sm text-muted-foreground">Aidez-nous à garder Fianarantsoa propre.</p>

        <form onSubmit={submit} className="mt-4 space-y-4">
          <div>
            <Label className="text-xs font-semibold uppercase">Photo</Label>
            <label className="mt-2 flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-trash-bg/50 transition hover:border-trash">
              {photo ? (
                <img src={photo} alt="Preview" className="h-full w-full rounded-lg object-cover" />
              ) : (
                <div className="text-center text-trash">
                  <Camera className="mx-auto" size={32} />
                  <p className="mt-2 text-sm font-medium">Prenez une photo ou importez</p>
                  <p className="text-xs text-muted-foreground">Jusqu'à 10 Mo</p>
                </div>
              )}
              <input type="file" accept="image/*" capture="environment" onChange={handleFile} className="hidden" />
            </label>
          </div>

          <div>
            <Label htmlFor="desc" className="text-xs font-semibold uppercase">Description</Label>
            <Textarea id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} className="mt-2" rows={3} placeholder="Décrivez la situation..." required />
          </div>

          <div>
            <Label className="text-xs font-semibold uppercase">Quartier</Label>
            <Select value={quartier} onValueChange={setQuartier}>
              <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
              <SelectContent>
                {QUARTIERS.map((q) => <SelectItem key={q} value={q}>{q}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <Button type="button" variant="outline" className="w-full">
            <MapPin size={16} /> Utiliser ma position GPS
          </Button>

          <Button type="submit" size="lg" className="w-full bg-trash hover:bg-trash/90">
            <Upload size={18} /> Envoyer le signalement
          </Button>
        </form>
      </div>

      <div className="rounded-xl border bg-card p-4">
        <h3 className="font-semibold">Mes signalements</h3>
        <div className="mt-3 space-y-2">
          {SIGNALS.slice(0, 3).map((s) => (
            <div key={s.id} className="flex gap-3 rounded-lg border p-2">
              <img src={s.photo} alt="" className="size-14 rounded-md object-cover" />
              <div className="flex-1">
                <div className="text-sm font-medium">{s.quartier}</div>
                <div className="text-xs text-muted-foreground">{s.date}</div>
                <Badge className={`mt-1 ${
                  s.status === "EN ATTENTE" ? "bg-muted text-foreground" :
                  s.status === "PRIS EN COMPTE" ? "bg-bus text-bus-foreground" :
                  "bg-trash text-trash-foreground"
                }`}>{s.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
