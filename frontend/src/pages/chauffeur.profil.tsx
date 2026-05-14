import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute()({
  component: () => (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold">Mon profil</h1>
      <div className="mt-4 rounded-xl border bg-card p-5">
        <div className="flex items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-full bg-bus text-bus-foreground text-xl font-bold">RJ</div>
          <div>
            <div className="font-bold">Rakoto Jean</div>
            <div className="text-sm text-muted-foreground">Chauffeur — Ligne 1</div>
            <div className="text-xs text-muted-foreground">Permis : B-2018-FNR</div>
          </div>
        </div>
      </div>
    </div>
  ),
});
