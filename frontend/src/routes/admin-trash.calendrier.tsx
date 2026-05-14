import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QUARTIERS } from "@/lib/mock-data";

export const Route = createFileRoute("/admin-trash/calendrier")({
  component: CalendrierView,
});

// Generate mock collections for current month
type Status = "planned" | "done" | "overdue";
function genMonth(year: number, month: number) {
  const days = new Date(year, month + 1, 0).getDate();
  const events: Record<number, { quartier: string; status: Status }[]> = {};
  for (let d = 1; d <= days; d++) {
    if (d % 3 === 0) {
      const status: Status = d < 8 ? "overdue" : d < 15 ? "done" : "planned";
      events[d] = [{ quartier: QUARTIERS[d % QUARTIERS.length], status }];
      if (d % 6 === 0) events[d].push({ quartier: QUARTIERS[(d + 2) % QUARTIERS.length], status });
    }
  }
  return events;
}

function statusClass(s: Status) {
  if (s === "planned") return "bg-status-warning";
  if (s === "done") return "bg-status-success";
  return "bg-status-danger";
}

function CalendrierView() {
  const [date, setDate] = useState(new Date(2026, 4, 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const events = genMonth(date.getFullYear(), date.getMonth());

  const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay() || 7;
  const monthName = date.toLocaleString("fr-FR", { month: "long", year: "numeric" });

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Calendrier des collectes</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1))}><ChevronLeft size={16} /></Button>
          <span className="min-w-40 text-center font-semibold capitalize">{monthName}</span>
          <Button variant="outline" size="icon" onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1))}><ChevronRight size={16} /></Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1.5"><span className="size-3 rounded-full bg-status-warning" /> Planifiée</div>
        <div className="flex items-center gap-1.5"><span className="size-3 rounded-full bg-status-success" /> Effectuée</div>
        <div className="flex items-center gap-1.5"><span className="size-3 rounded-full bg-status-danger" /> En retard</div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="grid grid-cols-7 border-b bg-muted/50 text-xs font-semibold">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
            <div key={d} className="p-3 text-center">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: firstDay - 1 }).map((_, i) => <div key={"e" + i} className="aspect-square border-b border-r bg-muted/20" />)}
          {Array.from({ length: days }).map((_, i) => {
            const d = i + 1;
            const evts = events[d] || [];
            return (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`aspect-square border-b border-r p-1.5 text-left transition hover:bg-trash-bg ${selectedDay === d ? "bg-trash-bg" : ""}`}
              >
                <div className="text-xs font-semibold">{d}</div>
                <div className="mt-1 space-y-0.5">
                  {evts.slice(0, 2).map((e, k) => (
                    <div key={k} className={`truncate rounded px-1 py-0.5 text-[10px] text-white ${statusClass(e.status)}`}>{e.quartier}</div>
                  ))}
                  {evts.length > 2 && <div className="text-[9px] text-muted-foreground">+{evts.length - 2}</div>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDay && events[selectedDay] && (
        <div className="rounded-xl border bg-card p-4">
          <h3 className="font-semibold">Collectes du {selectedDay} {monthName}</h3>
          <div className="mt-3 space-y-2">
            {events[selectedDay].map((e, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                <span className="font-medium">{e.quartier}</span>
                <Badge className={`${statusClass(e.status)} text-white`}>
                  {e.status === "planned" ? "Planifiée" : e.status === "done" ? "Effectuée" : "En retard"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
