import { useState } from "react";
import { Calendar, MapPin, Users, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CAMPAIGNS } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";

export default function Campagnes() {
  const [joined, setJoined] = useState<Record<string, boolean>>({});
  const [counts, setCounts] = useState<Record<string, number>>(
    Object.fromEntries(CAMPAIGNS.map((c) => [c.id, c.participants]))
  );

  const toggle = (id: string) => {
    const isJoining = !joined[id];
    setJoined((prev) => ({ ...prev, [id]: isJoining }));
    setCounts((prev) => ({
      ...prev,
      [id]: isJoining ? prev[id] + 1 : Math.max(0, prev[id] - 1),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/40 to-background pb-12">
      {/* Header */}
      <div className="relative py-12 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow">
          <Sparkles className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Campagnes Citoyennes</h1>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">
          Agissons ensemble pour Fianarantsoa
        </p>
      </div>

      {/* Stats */}
      <div className="mx-auto max-w-5xl px-6 mb-10">
        <div className="flex justify-center gap-8 rounded-3xl bg-card p-5 shadow-soft border">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{CAMPAIGNS.length}</div>
            <div className="text-xs text-muted-foreground">Campagnes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary">
              {Object.values(counts).reduce((a, b) => a + b, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Participants</div>
          </div>
        </div>
      </div>

      {/* Campagnes Grid - Version Compacte */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {CAMPAIGNS.map((campaign, index) => {
              const isJoined = !!joined[campaign.id];
              const count = counts[campaign.id];

              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="group flex flex-col rounded-3xl border bg-card overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Image compacte */}
                  <div className="relative h-40 bg-gradient-to-br from-primary via-primary/80 to-secondary/70">
                    <Badge className="absolute top-4 right-4 bg-white/95 text-black text-xs font-medium">
                      Active
                    </Badge>
                  </div>

                  <div className="flex-1 p-5 flex flex-col">
                    <h3 className="font-semibold leading-tight text-lg line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                      {campaign.title}
                    </h3>

                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="line-clamp-1">
                          {new Date(campaign.date).toLocaleDateString("fr-FR", { 
                            month: "short", 
                            day: "numeric" 
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="line-clamp-1">{campaign.quartiers[0]}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-5">
                      {campaign.message}
                    </p>

                    {/* Participants */}
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{count} participants</span>
                      </div>
                      {isJoined && <Heart className="h-4 w-4 text-red-500 fill-current" />}
                    </div>

                    {/* Bouton */}
                    <Button
                      onClick={() => toggle(campaign.id)}
                      className={`w-full h-11 text-sm font-medium transition-all ${
                        isJoined 
                          ? "bg-emerald-600 hover:bg-emerald-700" 
                          : "bg-gradient-brand hover:brightness-105"
                      }`}
                    >
                      {isJoined ? "✓ Je participe" : "Je rejoins"}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}