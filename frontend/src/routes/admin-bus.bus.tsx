import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, AlertTriangle } from "lucide-react";
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
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestion des bus</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-bus hover:bg-bus/90"><Plus size={16} /> Nouvelle visite</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Enregistrer une visite technique</DialogTitle></DialogHeader>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setOpen(false); toast.success("Visite enregistrée"); }}>
              <div className="space-y-2">
                <Label>Sélectionner bus</Label>
                <Select defaultValue={BUSES[0].id}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {BUSES.map((b) => <SelectItem key={b.id} value={b.id}>{b.matricule}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Date visite</Label>
                  <Input type="date" defaultValue="2026-05-14" />
                </div>
                <div className="space-y-2">
                  <Label>Expiration</Label>
                  <Input type="date" defaultValue="2027-05-14" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Résultat</Label>
                <RadioGroup defaultValue="apte" className="flex gap-6">
                  <div className="flex items-center gap-2"><RadioGroupItem value="apte" id="r-apte" /><Label htmlFor="r-apte">APTE</Label></div>
                  <div className="flex items-center gap-2"><RadioGroupItem value="inapte" id="r-inapte" /><Label htmlFor="r-inapte">INAPTE</Label></div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Observations</Label>
                <Textarea rows={3} placeholder="Notes du contrôleur..." />
              </div>
              <div className="space-y-2">
                <Label>Photo du contrôle</Label>
                <div className="flex h-24 items-center justify-center rounded-md border-2 border-dashed text-sm text-muted-foreground">
                  Glissez une photo ici
                </div>
              </div>
              <Button type="submit" className="w-full bg-bus">Enregistrer la visite</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {inapteCount > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-status-danger/30 bg-status-danger/10 p-4 text-sm">
          <AlertTriangle className="text-status-danger" size={20} />
          <div>
            <strong>{inapteCount} bus retiré(s) de la circulation.</strong> Les chauffeurs concernés ont été notifiés.
          </div>
        </div>
      )}

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">Tous ({BUSES.length})</TabsTrigger>
          <TabsTrigger value="aptes">Aptes</TabsTrigger>
          <TabsTrigger value="inaptes">Inaptes</TabsTrigger>
          <TabsTrigger value="soon">Visites à venir</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="overflow-x-auto rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Matricule</TableHead>
              <TableHead>Ligne</TableHead>
              <TableHead>Chauffeur</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Dernière visite</TableHead>
              <TableHead>Expiration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((b) => {
              const line = BUS_LINES.find((l) => l.id === b.ligneId);
              return (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.matricule}</TableCell>
                  <TableCell>L{line?.number}</TableCell>
                  <TableCell>{b.chauffeur}</TableCell>
                  <TableCell>
                    <Badge className={b.fitness === "APTE" ? "bg-status-success text-white" : "bg-status-danger text-white"}>
                      {b.fitness}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{b.lastVisit}</TableCell>
                  <TableCell className="text-sm">{b.expirationDate}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Voir</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
