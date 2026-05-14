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
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
        <motion.div 
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="flex size-24 items-center justify-center rounded-full bg-[#3BC1A8] text-white">
            <CheckCircle2 size={52} />
          </div>
        </motion.div>

        <h2 className="mt-6 text-2xl font-bold text-gray-900">Merci pour votre signalement !</h2>
        <p className="mt-2 max-w-sm text-gray-600">
          Votre contribution aide à rendre Fianarantsoa plus propre.
        </p>

        <Button 
          onClick={() => { 
            setSubmitted(false); 
            setPhoto(null); 
            setDesc(""); 
          }}
          className="mt-8 bg-[#3BC1A8] hover:bg-[#3BC1A8]/90 text-white px-8"
        >
          Nouveau signalement
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        
        {/* Titre avec animation "avant/arrière" lente */}
        <div className="text-center pt-6 pb-2">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 tracking-tight inline-block"
          >
            <span className="relative">
              Signaler
              <motion.span
                animate={{ 
                  textShadow: [
                    "0 4px 8px rgba(59, 193, 168, 0.3)",
                    "0 8px 16px rgba(59, 193, 168, 0.5)",
                    "0 4px 8px rgba(59, 193, 168, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-1 bg-gradient-to-r from-[#3BC1A8] to-[#3A9AFF] opacity-20 blur-xl rounded-3xl -z-10"
              />
            </span>
            <motion.span 
              className="text-[#3BC1A8] inline-block ml-2"
              animate={{ 
                x: [-5, 5] // Mouvement horizontal avant/arrière
              }}
              transition={{
                duration: 1.5, // Lent
                repeat: Infinity, 
                repeatType: "reverse", // Fait l'aller-retour
                ease: "easeInOut" // Mouvement fluide
              }}
            > 
              un problème
            </motion.span>
          </motion.h1>
          <p className="mt-2 text-gray-600">Aidez-nous à garder Fianarantsoa propre</p>
        </div>

        <div className="rounded-3xl bg-white border shadow-lg overflow-hidden">
          <form onSubmit={submit} className="p-8 space-y-8">
            
            {/* Photo */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">Photo du problème</Label>
              <label className="block cursor-pointer">
                <div className="aspect-video border-2 border-dashed border-[#3BC1A8]/40 hover:border-[#3BC1A8] rounded-2xl flex flex-col items-center justify-center bg-[#3BC1A8]/5 transition-all overflow-hidden">
                  {photo ? (
                    <img src={photo} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Camera size={48} className="mx-auto text-[#3BC1A8]/70" />
                      <p className="mt-3 font-medium text-[#3BC1A8]">Prendre ou importer une photo</p>
                    </div>
                  )}
                </div>
                <input type="file" accept="image/*" capture="environment" onChange={handleFile} className="hidden" />
              </label>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="desc" className="text-sm font-semibold text-gray-700">Description</Label>
              <Textarea
                id="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={4}
                className="mt-2 rounded-2xl border-[#3BC1A8]/20 focus:border-[#3BC1A8]"
                placeholder="Décrivez ce que vous avez vu..."
                required
              />
            </div>

            {/* Quartier */}
            <div>
              <Label className="text-sm font-semibold text-gray-700">Quartier</Label>
              <Select value={quartier} onValueChange={setQuartier}>
                <SelectTrigger className="mt-2 h-12 rounded-2xl border-[#3BC1A8]/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {QUARTIERS.map((q) => (
                    <SelectItem key={q} value={q}>{q}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="button" variant="outline" className="w-full h-12 rounded-2xl border-[#3BC1A8]/30 text-[#3BC1A8] hover:bg-[#3BC1A8]/5">
              <MapPin size={18} className="mr-2" />
              Utiliser ma position actuelle
            </Button>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-14 text-lg bg-[#3BC1A8] hover:bg-[#3BC1A8]/90 rounded-2xl font-semibold"
            >
              <Upload size={20} className="mr-3" />
              Envoyer le signalement
            </Button>
          </form>
        </div>

        {/* Mes signalements */}
        <div className="bg-white rounded-3xl border p-6 shadow">
          <h3 className="font-semibold text-lg mb-4">Mes derniers signalements</h3>
          <div className="space-y-4">
            {SIGNALS.slice(0, 3).map((s) => (
              <div key={s.id} className="flex gap-4 bg-zinc-50 rounded-2xl p-4 border">
                <img src={s.photo} alt="" className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="font-medium">{s.quartier}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{s.date}</div>
                  <Badge className="mt-2" variant="secondary">{s.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}