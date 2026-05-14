import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SIGNALS, type Signal } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin-trash/signalements")({
  component: Signalements,
});

function priorityBadge(p: Signal["priority"]) {
  if (p === "HAUTE") return "bg-status-danger text-white";
  if (p === "NORMALE") return "bg-status-warning text-white";
  return "bg-muted text-foreground";
}
function statusBadge(s: Signal["status"]) {
  if (s === "EN ATTENTE") return "bg-muted text-foreground";
  if (s === "PRIS EN COMPTE") return "bg-bus text-bus-foreground";
  return "bg-status-success text-white";
}

function Signalements() {
  const [items, setItems] = useState(SIGNALS);

  const accept = (id: string) => {
    setItems((arr) => arr.map((s) => s.id === id ? { ...s, status: "PRIS EN COMPTE" as const } : s));
    toast.success("Citoyen notifié");
  };

  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-2xl font-bold">Signalements</h1>

      <div className="overflow-x-auto rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Photo</TableHead>
              <TableHead>Quartier</TableHead>
              <TableHead>Signalé par</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((s) => (
              <TableRow key={s.id}>
                <TableCell><img src={s.photo} alt="" className="size-12 rounded object-cover" /></TableCell>
                <TableCell className="font-medium">{s.quartier}</TableCell>
                <TableCell className="text-sm">{s.reportedBy}</TableCell>
                <TableCell className="text-sm">{s.date}</TableCell>
                <TableCell><Badge className={priorityBadge(s.priority)}>{s.priority}</Badge></TableCell>
                <TableCell><Badge className={statusBadge(s.status)}>{s.status}</Badge></TableCell>
                <TableCell>
                  {s.status === "EN ATTENTE" && (
                    <Button size="sm" className="bg-trash hover:bg-trash/90" onClick={() => accept(s.id)}>Prendre en compte</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
