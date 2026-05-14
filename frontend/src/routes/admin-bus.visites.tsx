import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin-bus/visites")({
  component: () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Visites techniques</h1>
      <p className="mt-2 text-muted-foreground">Historique et planning des visites techniques.</p>
      <div className="mt-6 rounded-xl border bg-card p-8 text-center text-muted-foreground">
        Module visites — voir l'onglet "Bus & Lignes" pour enregistrer une nouvelle visite.
      </div>
    </div>
  ),
});
