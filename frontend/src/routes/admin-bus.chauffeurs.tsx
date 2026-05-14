import { createFileRoute } from "@tanstack/react-router";
import { BUSES } from "@/lib/mock-data";

export const Route = createFileRoute("/admin-bus/chauffeurs")({
  component: () => (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Chauffeurs</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {BUSES.map((b) => (
          <div key={b.id} className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-bus text-bus-foreground font-bold">
                {b.chauffeur.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="font-semibold">{b.chauffeur}</div>
                <div className="text-xs text-muted-foreground">{b.matricule}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});
