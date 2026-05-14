import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BUSES } from "@/lib/mock-data";

export const Route = createFileRoute("/chauffeur/assurance")({
  component: Assurance,
});

function Assurance() {
  const bus = BUSES[0];
  const expiresAt = new Date(bus.expirationDate);
  const today = new Date();
  const daysLeft = Math.max(0, Math.ceil((expiresAt.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  const totalDays = 365;
  const pct = Math.min(100, (daysLeft / totalDays) * 100);
  const barColor = pct > 50 ? "bg-status-success" : pct > 20 ? "bg-status-warning" : "bg-status-danger";

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Assurance & visite technique</h1>

      <div className="rounded-xl border bg-card p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-bus-bg text-bus">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="font-semibold">Statut technique</div>
            <Badge className={`mt-1 ${bus.fitness === "APTE" ? "bg-status-success" : "bg-status-danger"} text-white`}>{bus.fitness}</Badge>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs uppercase text-muted-foreground">Dernière visite</div>
            <div className="mt-1 font-semibold">{bus.lastVisit}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-muted-foreground">Expiration</div>
            <div className="mt-1 font-semibold">{bus.expirationDate}</div>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Expire dans</span>
            <span className="font-bold">{daysLeft} jours</span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-muted">
            <div className={`h-full ${barColor} transition-all`} style={{ width: `${pct}%` }} />
          </div>
        </div>

        <Button className="mt-5 w-full bg-bus hover:bg-bus/90">
          <Calendar size={16} /> Planifier ma prochaine visite
        </Button>
      </div>
    </div>
  );
}
