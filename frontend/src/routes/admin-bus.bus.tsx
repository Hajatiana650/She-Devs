import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, AlertTriangle, Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useBusManagement } from "@/hooks/useManagement";

export const Route = createFileRoute("/admin-bus/bus")({
  component: BusManagement,
});

function BusManagement() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);

  const { data: BUSES, busRetires } = useBusManagement(filter);

  const filtered = BUSES.filter((b) => {
    if (filter === "aptes") return b.statut === "APTE";
    if (filter === "inaptes") return b.statut === "INAPTE";
    if (filter === "soon") return b.joursRestants < 60 && b.joursRestants > 0;
    return true;
  });

  const inapteCount = BUSES.filter((b) => b.statut === "INAPTE").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ecfffb] via-[#eef6ff] to-[#f5f3ff] p-4 md:p-10 font-sans">
      
      {/* 🔥 TOUT TON UI RESTE IDENTIQUE */}
      
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

        {/* HEADER SECTION (inchangé) */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-[1000] tracking-tight text-[#1B254B]">
              Flotte <span className="text-[#185FA5]">Automobile</span>
            </h1>
            <div className="h-1.5 w-16 bg-[#3BC1A8] mt-2 rounded-full" />
            <p className="text-slate-500 font-medium mt-3 max-w-md">
              Contrôle technique et suivi de conformité de l'ensemble du parc.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">

            {/* FILTER */}
            <div className="flex bg-zinc-200/50 backdrop-blur-md p-1 rounded-2xl border border-white/50 shadow-inner">
              <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded-xl text-[10px] font-black ${filter === "all" ? "bg-white text-[#185FA5]" : "text-zinc-500"}`}>TOUS</button>
              <button onClick={() => setFilter("aptes")} className={`px-4 py-2 rounded-xl text-[10px] font-black ${filter === "aptes" ? "bg-white text-[#3BC1A8]" : "text-zinc-500"}`}>APTES</button>
              <button onClick={() => setFilter("inaptes")} className={`px-4 py-2 rounded-xl text-[10px] font-black ${filter === "inaptes" ? "bg-white text-red-500" : "text-zinc-500"}`}>INAPTES</button>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="h-12 px-6 bg-[#185FA5] text-white rounded-2xl font-black">
                  <Plus className="mr-2" size={20} /> NOUVELLE VISITE
                </Button>
              </DialogTrigger>

              {/* ❗ FORM INCHANGÉ */}
              <DialogContent className="sm:max-w-[550px] rounded-[2.5rem] border-none bg-white/90 backdrop-blur-xl p-8 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black text-[#1B254B]">
                    Rapport d'inspection
                  </DialogTitle>
                </DialogHeader>

                <form className="space-y-6 mt-4" onSubmit={(e) => { e.preventDefault(); setOpen(false); toast.success("Rapport enregistré."); }}>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <Label>Véhicule</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {BUSES.map((b) => (
                            <SelectItem key={b.idBus} value={String(b.idBus)}>
                              {b.matricule}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-14 bg-[#1B254B] text-white rounded-2xl font-black">
                    ENREGISTRER
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* ALERTE */}
        {inapteCount > 0 && (
          <div className="flex items-center gap-4 p-5 bg-red-50 border border-red-100 rounded-[2rem] text-red-600 shadow-sm">
            <AlertTriangle size={20} />
            <p className="text-sm font-bold">
              Alerte : {inapteCount} véhicule(s) non conforme(s)
            </p>
          </div>
        )}

        {/* TABLE */}
        <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-white shadow-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matricule</TableHead>
                <TableHead>Ligne</TableHead>
                <TableHead>Chauffeur</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernier Check</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((b) => (
                <TableRow key={b.idBus}>
                  <TableCell>{b.matricule}</TableCell>
                  <TableCell>{b.ligne}</TableCell>
                  <TableCell>{b.chauffeur}</TableCell>
                  <TableCell>{b.statut}</TableCell>
                  <TableCell>{b.derniereVisite}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filtered.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center gap-4">
              <Search className="text-zinc-200 size-16" />
              <p>Aucun résultat</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}