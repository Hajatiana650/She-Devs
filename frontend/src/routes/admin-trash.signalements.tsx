import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTrashSignals } from "@/hooks/useTrash";
import { luxeToast } from "@/lib/luxe-toast";
import type { Signal } from "@/api/trash.api";
import { Eye, CheckCircle, Loader } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin-trash/signalements")({
  component: Signalements,
});

function priorityBadge(p: Signal["priority"]) {
  if (p === "HAUTE") return "bg-rose-500 text-white";
  if (p === "NORMALE") return "bg-amber-500 text-white";
  return "bg-slate-400 text-white";
}

function statusBadge(s: Signal["status"]) {
  if (s === "EN ATTENTE") return "bg-slate-100 text-slate-700 border border-slate-200";
  if (s === "PRIS EN COMPTE") return "bg-[#3BC1A8]/10 text-[#3BC1A8] border border-[#3BC1A8]/30";
  return "bg-emerald-500 text-white";
}

function Signalements() {
  const { signals, loading, validateSignal } = useTrashSignals();
  const [validatingId, setValidatingId] = useState<number | null>(null);

  const accept = async (id: number) => {
    setValidatingId(id);
    try {
      const success = await validateSignal(id);
      if (success) {
        luxeToast.signalAccepted();
      }
    } catch (error) {
      luxeToast.error("Erreur lors de la validation du signalement");
    } finally {
      setValidatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4fffc] via-[#f0f9f6] to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="bg-gradient-to-r from-[#3BC1A8] to-[#3A9AFF] bg-clip-text text-4xl font-extrabold text-transparent">
            Signalements Citoyens
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Gestion et suivi des signalements de déchets
          </p>
        </div>

        {/* Main Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-xl backdrop-blur-xl">
          {/* Decorative background elements */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#3BC1A8]/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#3A9AFF]/5 blur-3xl" />

          <div className="relative z-10 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-800">Tous les signalements</h2>
                <p className="text-sm text-slate-500 mt-1">
                  {signals.length} signalements au total
                </p>
              </div>
              <div className="text-sm px-4 py-2 bg-white rounded-2xl border border-slate-100">
                {loading ? "Chargement..." : "Mise à jour en temps réel"}
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <Loader size={40} className="animate-spin text-[#3BC1A8]" />
                <p className="text-slate-500">Chargement des signalements...</p>
              </div>
            ) : signals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-500 mb-2">Aucun signalement pour le moment</p>
                <p className="text-xs text-slate-400">Les signalements des citoyens apparaîtront ici</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-slate-100 hover:bg-transparent">
                      <TableHead className="w-20">Photo</TableHead>
                      <TableHead>Quartier</TableHead>
                      <TableHead>Signalé par</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Priorité</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {signals.map((s) => (
                      <TableRow 
                        key={s.id} 
                        className="group hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-0"
                      >
                        <TableCell>
                          <img 
                            src={s.photo} 
                            alt="Signalement" 
                            className="size-14 rounded-2xl object-cover ring-1 ring-slate-100" 
                          />
                        </TableCell>
                        <TableCell className="font-medium text-slate-800">{s.quartier}</TableCell>
                        <TableCell className="text-slate-600">{s.reportedBy}</TableCell>
                        <TableCell className="text-sm text-slate-500">{s.date}</TableCell>
                        
                        <TableCell>
                          <Badge className={`rounded-full px-4 py-1 text-xs font-semibold ${priorityBadge(s.priority)}`}>
                            {s.priority}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <Badge className={`rounded-full px-4 py-1 text-xs font-semibold ${statusBadge(s.status)}`}>
                            {s.status}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                          {s.status === "EN ATTENTE" ? (
                            <Button 
                              onClick={() => accept(s.id)}
                              disabled={validatingId === s.id}
                              className="bg-[#3BC1A8] hover:bg-[#3BC1A8]/90 text-white rounded-2xl px-6 shadow-md transition-all duration-200 hover:scale-105 flex items-center gap-2 disabled:opacity-50"
                            >
                              {validatingId === s.id ? (
                                <Loader size={18} className="animate-spin" />
                              ) : (
                                <CheckCircle size={18} />
                              )}
                              {validatingId === s.id ? "..." : "Prendre en compte"}
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="rounded-2xl border-slate-200 text-slate-500"
                              disabled
                            >
                              <Eye size={18} className="mr-2" />
                              Déjà pris en compte
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-8">
          Fiana • Système de gestion des déchets intelligents
        </p>
      </div>
    </div>
  );
}