import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, AlertTriangle, Eye } from "lucide-react";
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
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto fade-in-up">
      {/* Header avec un titre digne de ce nom */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gradient-brand">
            Gestion des flottes de bus
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Supervisez les contrôles techniques avant que vos chauffeurs ne se transforment en cascadeurs.
          </p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-brand text-white shadow-glow transition-all duration-300 hover:scale-[1.02] hover:opacity-95 active:scale-[0.98]">
              <Plus className="mr-2" size={18} /> Nouvelle visite
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] backdrop-blur-md bg-card/95 raw-shadow">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold tracking-tight">
                Enregistrer une visite technique
              </DialogTitle>
            </DialogHeader>
            <form 
              className="space-y-5 mt-2" 
              onSubmit={(e) => { 
                e.preventDefault(); 
                setOpen(false); 
                toast.success("Visite enregistrée. Miraculeusement, aucun pot d'échappement n'est tombé."); 
              }}
            >
              <div className="space-y-2">
                <Label className="font-medium text-xs uppercase tracking-wider text-muted-foreground">Sélectionner un véhicule</Label>
                <Select defaultValue={BUSES[0]?.id}>
                  <SelectTrigger className="bg-background/50 focus:ring-secondary"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {BUSES.map((b) => <SelectItem key={b.id} value={b.id}>{b.matricule}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-medium text-xs uppercase tracking-wider text-muted-foreground">Date visite</Label>
                  <Input type="date" defaultValue="2026-05-14" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label className="font-medium text-xs uppercase tracking-wider text-muted-foreground">Expiration</Label>
                  <Input type="date" defaultValue="2027-05-14" className="bg-background/50" />
                </div>
              </div>
              <div className="space-y-2 bg-muted/40 p-3 rounded-lg border">
                <Label className="font-medium text-xs uppercase tracking-wider text-muted-foreground block mb-2">Verdict final</Label>
                <RadioGroup defaultValue="apte" className="flex gap-8">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="apte" id="r-apte" className="text-success border-success" />
                    <Label htmlFor="r-apte" className="font-semibold text-success cursor-pointer text-sm">APTE TOUT VA BIEN</Label>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="inapte" id="r-inapte" className="text-destructive border-destructive" />
                    <Label htmlFor="r-inapte" className="font-semibold text-destructive cursor-pointer text-sm">INAPTE (ÉPAVE)</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label className="font-medium text-xs uppercase tracking-wider text-muted-foreground">Observations honnêtes</Label>
                <Textarea rows={2} placeholder="Sifflement suspect dans le moteur..." className="bg-background/50 resize-none" />
              </div>
              <div className="space-y-2">
                <Label className="font-medium text-xs uppercase tracking-wider text-muted-foreground">Preuve visuelle des dégâts</Label>
                <div className="flex h-24 items-center justify-center rounded-xl border-2 border-dashed border-border hover:border-secondary/50 transition-colors cursor-pointer text-xs text-muted-foreground bg-muted/20">
                  Glissez-déposez le désastre ici
                </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-brand text-white font-medium shadow-sm transition-all">
                Valider et prier pour les freins
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Alerte Dramatique */}
      {inapteCount > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive shadow-soft animate-pulse-ring">
          <AlertTriangle className="shrink-0 mt-0.5" size={18} />
          <div>
            <span className="font-bold">{inapteCount} bus déclaré(s) impropre(s) à la consommation routière.</span> Les chauffeurs ont été notifiés (et pleurent probablement).
          </div>
        </div>
      )}

      {/* Onglets épurés */}
      <Tabs value={filter} onValueChange={setFilter} className="w-full">
        <TabsList className="bg-muted/60 p-1 rounded-xl border">
          <TabsTrigger value="all" className="rounded-lg px-4 py-2 text-xs font-semibold">Tous ({BUSES.length})</TabsTrigger>
          <TabsTrigger value="aptes" className="rounded-lg px-4 py-2 text-xs font-semibold data-[state=active]:text-success">Aptes</TabsTrigger>
          <TabsTrigger value="inaptes" className="rounded-lg px-4 py-2 text-xs font-semibold data-[state=active]:text-destructive">Inaptes</TabsTrigger>
          <TabsTrigger value="soon" className="rounded-lg px-4 py-2 text-xs font-semibold data-[state=active]:text-secondary">Visites à venir</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Tableau Haut de Gamme avec effet Glassmorphic/Cards */}
      <div className="overflow-hidden rounded-xl border bg-card shadow-soft transition-all duration-300">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Matricule</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Ligne</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Chauffeur courageux</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Verdict</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Dernier check</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Fin de validité</TableHead>
              <TableHead className="font-right text-xs uppercase tracking-wider text-muted-foreground text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground italic">
                  Aucun bus ne correspond. Tout le monde est au dépôt.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((b, index) => {
                const line = BUS_LINES.find((l) => l.id === b.ligneId);
                const isApte = b.fitness === "APTE";
                return (
                  <TableRow 
                    key={b.id} 
                    className="hover:bg-muted/20 transition-colors duration-150 group border-b"
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    <TableCell className="font-mono font-bold tracking-tight text-foreground">{b.matricule}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
                        Ligne {line?.number || "?"}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {b.chauffeur}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={`font-semibold text-xs tracking-wide px-2.5 py-0.5 rounded-full ${
                          isApte 
                            ? "bg-success/10 text-success border-success/30" 
                            : "bg-destructive/10 text-destructive border-destructive/30 animate-pulse"
                        }`}
                      >
                        {b.fitness}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-mono text-muted-foreground">{b.lastVisit}</TableCell>
                    <TableCell className="text-sm font-mono text-muted-foreground">{b.expirationDate}</TableCell>
                    <TableCell className="text-right pr-6">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 opacity-60 group-hover:opacity-100 hover:bg-secondary/10 hover:text-secondary rounded-lg transition-all"
                      >
                        <Eye size={15} />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}