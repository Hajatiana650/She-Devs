import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, AlertTriangle, Eye, Search, FileText, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BUSES, BUS_LINES } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin-bus/bus")({
  component: BusManagement,
});

function BusManagement() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);

  const filtered = BUSES.filter((b) => {
    if (filter === "aptes") return b.fitness === "APTE";
    if (filter === "inaptes") return b.fitness === "INAPTE";
    if (filter === "soon") {
      const d = (new Date(b.expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
      return d < 60 && d > 0;
    }
    return true;
  });

  const inapteCount = BUSES.filter((b) => b.fitness === "INAPTE").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ecfffb] via-[#eef6ff] to-[#f5f3ff] p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* HEADER SECTION */}
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
             {/* MENU FILTRE STYLE "CHAUFFEUR" */}
             <div className="flex bg-zinc-200/50 backdrop-blur-md p-1 rounded-2xl border border-white/50 shadow-inner">
                <button 
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${filter === 'all' ? 'bg-white text-[#185FA5] shadow-sm' : 'text-zinc-500'}`}
                >TOUS</button>
                <button 
                  onClick={() => setFilter("aptes")}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${filter === 'aptes' ? 'bg-white text-[#3BC1A8] shadow-sm' : 'text-zinc-500'}`}
                >APTES</button>
                <button 
                  onClick={() => setFilter("inaptes")}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${filter === 'inaptes' ? 'bg-white text-red-500 shadow-sm' : 'text-zinc-500'}`}
                >INAPTES</button>
             </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="h-12 px-6 bg-[#185FA5] hover:bg-[#1B254B] text-white rounded-2xl font-black shadow-lg shadow-[#185FA5]/20 transition-all active:scale-95">
                  <Plus className="mr-2" size={20} strokeWidth={3} /> NOUVELLE VISITE
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px] rounded-[2.5rem] border-none bg-white/90 backdrop-blur-xl p-8 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black text-[#1B254B]">Rapport d'inspection</DialogTitle>
                </DialogHeader>
                <form className="space-y-6 mt-4" onSubmit={(e) => { e.preventDefault(); setOpen(false); toast.success("Rapport enregistré."); }}>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Véhicule</Label>
                      <Select defaultValue={BUSES[0]?.id}>
                        <SelectTrigger className="h-12 bg-white border-zinc-100 rounded-xl focus:ring-[#185FA5]"><SelectValue /></SelectTrigger>
                        <SelectContent>{BUSES.map((b) => <SelectItem key={b.id} value={b.id}>{b.matricule}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date de visite</Label>
                      <Input type="date" className="h-12 bg-white border-zinc-100 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prochaine échéance</Label>
                      <Input type="date" className="h-12 bg-white border-zinc-100 rounded-xl" />
                    </div>
                  </div>

                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Statut technique</Label>
                    <RadioGroup defaultValue="apte" className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="apte" id="r-apte" className="border-[#3BC1A8] text-[#3BC1A8]" />
                        <Label htmlFor="r-apte" className="font-bold text-[#3BC1A8] text-sm cursor-pointer">CONFORME</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="inapte" id="r-inapte" className="border-red-500 text-red-500" />
                        <Label htmlFor="r-inapte" className="font-bold text-red-500 text-sm cursor-pointer">NON-CONFORME</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Observations</Label>
                    <Textarea placeholder="..." className="bg-white border-zinc-100 rounded-xl resize-none" />
                  </div>

                  <Button type="submit" className="w-full h-14 bg-[#1B254B] text-white rounded-2xl font-black shadow-xl hover:bg-[#185FA5] transition-all">
                    ENREGISTRER LE RAPPORT
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* ALERTE CRITIQUE */}
        {inapteCount > 0 && (
          <div className="flex items-center gap-4 p-5 bg-red-50 border border-red-100 rounded-[2rem] text-red-600 shadow-sm animate-pulse-ring">
            <div className="size-10 bg-red-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
              <AlertTriangle size={20} />
            </div>
            <p className="text-sm font-bold tracking-tight">
              Alerte : {inapteCount} véhicule(s) immobilisé(s) pour non-conformité technique.
            </p>
          </div>
        )}

        {/* TABLEAU MODERNISÉ */}
        <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-white shadow-2xl shadow-[#1B254B]/5 overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-50/50">
              <TableRow className="border-zinc-100 hover:bg-transparent">
                <TableHead className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Matricule</TableHead>
                <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ligne Affectée</TableHead>
                <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chauffeur</TableHead>
                <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Statut</TableHead>
                <TableHead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dernier Check</TableHead>
                <TableHead className="text-right px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((b, i) => (
                <TableRow key={b.id} className="border-zinc-50 group hover:bg-white/80 transition-colors">
                  <TableCell className="py-5 px-8">
                    <div className="font-black text-[#1B254B] bg-zinc-100 px-3 py-1 rounded-lg inline-block text-xs">
                      {b.matricule}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-[#185FA5]/20 text-[#185FA5] font-black text-[10px] rounded-lg">
                      LIGNE {BUS_LINES.find(l => l.id === b.ligneId)?.number}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold text-slate-600 text-sm">
                    {b.chauffeur}
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-2 font-[900] text-[10px] uppercase tracking-tighter ${b.fitness === 'APTE' ? 'text-[#3BC1A8]' : 'text-red-500'}`}>
                      <div className={`size-2 rounded-full ${b.fitness === 'APTE' ? 'bg-[#3BC1A8] shadow-[0_0_10px_#3BC1A8]' : 'bg-red-500 animate-pulse'}`} />
                      {b.fitness}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-bold text-slate-400">
                    {b.lastVisit}
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <Button variant="ghost" size="sm" className="size-10 rounded-xl hover:bg-[#185FA5] hover:text-white transition-all">
                      <Eye size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filtered.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center gap-4">
              <Search className="text-zinc-200 size-16" />
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Aucun résultat trouvé</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}