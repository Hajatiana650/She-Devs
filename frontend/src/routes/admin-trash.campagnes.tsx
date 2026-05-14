import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Megaphone, Users, Calendar, MapPin, Plus, Users2 } from "lucide-react";
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

  const toggle = (q: string) => {
    setSelected((s) => 
      s.includes(q) ? s.filter((x) => x !== q) : [...s, q]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Campagne publiée avec succès !");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4fffc] via-[#f0f9f6] to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-[#3BC1A8] to-[#3A9AFF] flex items-center justify-center shadow-lg">
              <Megaphone className="text-white" size={32} />
            </div>
          </div>
          <h1 className="bg-gradient-to-r from-[#3BC1A8] to-[#3A9AFF] bg-clip-text text-4xl md:text-5xl font-extrabold text-transparent">
            Campagnes de Sensibilisation
          </h1>
          <p className="mt-3 text-lg text-slate-600 max-w-md mx-auto">
            Mobilisez les citoyens pour un environnement plus propre
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Formulaire de création (inchangé) */}
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-xl backdrop-blur-xl p-8">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#3BC1A8]/10 blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center gap-3">
                  <Plus size={26} className="text-[#3BC1A8]" />
                  Lancer une nouvelle campagne
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-slate-700">Titre de la campagne</Label>
                    <Input 
                      placeholder="Ex: Grand nettoyage collectif du centre-ville" 
                      className="rounded-2xl h-12 border-slate-200 focus:border-[#3BC1A8]"
                      required 
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-slate-700">Quartiers ciblés</Label>
                    <div className="flex flex-wrap gap-2">
                      {QUARTIERS.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => toggle(q)}
                          className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 border
                            ${selected.includes(q) 
                              ? "bg-[#3BC1A8] text-white border-[#3BC1A8] shadow-md scale-105" 
                              : "bg-white border-slate-200 hover:border-[#3BC1A8] hover:text-[#3BC1A8]"
                            }`}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-700">Date et heure</Label>
                      <Input 
                        type="datetime-local" 
                        defaultValue="2026-05-25T08:00" 
                        className="rounded-2xl h-12 border-slate-200" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700">Message / Description</Label>
                    <Textarea 
                      rows={5} 
                      placeholder="Décrivez l'objectif de la campagne et les actions attendues..." 
                      className="rounded-2xl border-slate-200 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#3BC1A8] to-[#3A9AFF] text-lg font-semibold shadow-lg hover:brightness-110 transition-all duration-300"
                  >
                    Publier la campagne
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Campagnes Actives - Version Améliorée */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center gap-3">
              Campagnes actives
              <span className="text-sm font-normal text-slate-500">({CAMPAIGNS.length})</span>
            </h2>

            <div className="space-y-6">
              {CAMPAIGNS.map((c, index) => (
                <div 
                  key={c.id} 
                  className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-sm backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Top Accent Gradient */}
                  <div className="h-2 bg-gradient-to-r from-[#3BC1A8] via-[#3A9AFF] to-[#3BC1A8]" />

                  <div className="p-7">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-xl leading-tight text-slate-800 pr-6 group-hover:text-[#3BC1A8] transition-colors">
                        {c.title}
                      </h3>
                      <div className="px-4 py-1.5 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-2xl whitespace-nowrap">
                        En cours
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-3 text-slate-600">
                        <div className="w-9 h-9 rounded-2xl bg-[#3BC1A8]/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="text-[#3BC1A8]" size={20} />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-slate-500">Date</p>
                          <p className="font-medium">
                            {new Date(c.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-slate-600">
                        <div className="w-9 h-9 rounded-2xl bg-[#3BC1A8]/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="text-[#3BC1A8]" size={20} />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-slate-500">Quartiers</p>
                          <p className="font-medium text-sm">{c.quartiers.join(" • ")}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-slate-600">
                        <div className="w-9 h-9 rounded-2xl bg-[#3BC1A8]/10 flex items-center justify-center flex-shrink-0">
                          <Users2 className="text-[#3BC1A8]" size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs uppercase tracking-widest text-slate-500">Participation</p>
                            <p className="font-semibold text-lg text-slate-700">{c.participants}</p>
                          </div>
                          <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#3BC1A8] to-[#3A9AFF] rounded-full transition-all duration-500" 
                              style={{ width: `${Math.min(100, c.participants / 2)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="border-t border-slate-100 bg-slate-50/80 px-7 py-4 text-sm flex items-center justify-between">
                    <span className="text-slate-500">Voir les détails</span>
                    <Button variant="ghost" size="sm" className="text-[#3BC1A8] hover:text-[#3BC1A8]/80">
                      Gérer →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}