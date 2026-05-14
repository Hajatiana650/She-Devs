import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Plus, AlertTriangle, Search, Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useBusManagement } from "@/hooks/useManagement";
import { useCreateVisit } from "@/hooks/useVisit";

export const Route = createFileRoute("/admin-bus/bus")({
  component: BusManagement,
});

function BusManagement() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);

  // Form state
  const [busId, setBusId] = useState("");
  const [dateVisite, setDateVisite] = useState("");
  const [prochaineEcheance, setProchaineEcheance] = useState("");
  const [statut, setStatut] = useState<"APTE" | "INAPTE">("APTE");
  const [observation, setObservation] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: BUSES, busRetires } = useBusManagement(filter);
  const { mutate: createVisit, isPending } = useCreateVisit();

  const filtered = BUSES.filter((b) => {
    if (filter === "aptes") return b.statut === "APTE";
    if (filter === "inaptes") return b.statut === "INAPTE";
    if (filter === "soon") return b.joursRestants < 60 && b.joursRestants > 0;
    return true;
  });

  const inapteCount = BUSES.filter((b) => b.statut === "INAPTE").length;

  function resetForm() {
    setBusId("");
    setDateVisite("");
    setProchaineEcheance("");
    setStatut("APTE");
    setObservation("");
    setFile(null);
  }

 function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  createVisit(
    {
      busId: Number(busId),
      visitType: "TECHNICAL_VISIT",
      result: statut,
      dateVisit: dateVisite,
      dateLimit: prochaineEcheance,
      observation,
      // attachment: à gérer via upload séparé si le backend attend une URL
    },
    {
      onSuccess: () => {
        toast.success("Rapport enregistré.");
        resetForm();
        setOpen(false);
      },
      onError: () => {
        toast.error("Erreur lors de l'enregistrement.");
      },
    }
  );
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ecfffb] via-[#eef6ff] to-[#f5f3ff] p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

        {/* HEADER */}
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

            {/* DIALOG */}
            <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
              <DialogTrigger asChild>
                <Button className="h-12 px-6 bg-[#185FA5] hover:bg-[#1B254B] text-white rounded-2xl font-black shadow-lg shadow-[#185FA5]/20 transition-all active:scale-95">
                  <Plus className="mr-2" size={20} strokeWidth={3} />
                  NOUVELLE VISITE
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[550px] rounded-[2.5rem] border-none bg-white/90 backdrop-blur-xl p-8 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black text-[#1B254B]">
                    Rapport d'inspection
                  </DialogTitle>
                </DialogHeader>

                <form className="space-y-6 mt-4" onSubmit={handleSubmit}>

                  {/* VEHICULE */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Véhicule</Label>
                    <Select value={busId} onValueChange={setBusId} required>
                      <SelectTrigger className="h-12 bg-white border-zinc-100 rounded-xl focus:ring-[#185FA5]">
                        <SelectValue placeholder="Sélectionner un véhicule" />
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

                  {/* DATES */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date de visite</Label>
                      <Input type="date" value={dateVisite} onChange={(e) => setDateVisite(e.target.value)}
                        className="h-12 bg-white border-zinc-100 rounded-xl" required />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prochaine échéance</Label>
                      <Input type="date" value={prochaineEcheance} onChange={(e) => setProchaineEcheance(e.target.value)}
                        className="h-12 bg-white border-zinc-100 rounded-xl" required />
                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Statut technique</Label>
                    <RadioGroup value={statut} onValueChange={(v) => setStatut(v as "APTE" | "INAPTE")} className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="APTE" id="r-apte" className="border-[#3BC1A8] text-[#3BC1A8]" />
                        <Label htmlFor="r-apte" className="font-bold text-[#3BC1A8] text-sm cursor-pointer">CONFORME</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="INAPTE" id="r-inapte" className="border-red-500 text-red-500" />
                        <Label htmlFor="r-inapte" className="font-bold text-red-500 text-sm cursor-pointer">NON-CONFORME</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* OBSERVATION */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Observations</Label>
                    <Textarea value={observation} onChange={(e) => setObservation(e.target.value)}
                      placeholder="..." className="bg-white border-zinc-100 rounded-xl resize-none" />
                  </div>

                  {/* ATTACHMENT — vrai input file */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pièce jointe</Label>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    />

                    {file ? (
                      <div className="flex items-center justify-between h-12 px-4 bg-white border border-zinc-100 rounded-xl">
                        <div className="flex items-center gap-2 min-w-0">
                          <Paperclip size={14} className="text-[#185FA5] shrink-0" />
                          <span className="text-sm font-medium text-slate-600 truncate">{file.name}</span>
                        </div>
                        <button type="button" onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}>
                          <X size={14} className="text-slate-400 hover:text-red-500 transition-colors" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-3 w-full h-12 px-4 bg-white border border-dashed border-zinc-200 rounded-xl text-sm text-slate-400 hover:border-[#185FA5] hover:text-[#185FA5] transition-colors"
                      >
                        <Paperclip size={14} />
                        Choisir un fichier (PDF, image)
                      </button>
                    )}
                  </div>

                  {/* SUBMIT */}
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-14 bg-[#1B254B] text-white rounded-2xl font-black shadow-xl hover:bg-[#185FA5] transition-all disabled:opacity-60"
                  >
                    {isPending ? "ENREGISTREMENT..." : "ENREGISTRER LE RAPPORT"}
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
            <p className="text-sm font-bold">Alerte : {inapteCount} véhicule(s) non conforme(s)</p>
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