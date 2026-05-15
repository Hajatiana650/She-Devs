import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bus,
  Trash2,
  MessageSquareText,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  Leaf,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ny'Agnay — Plateforme Ny'Agnay de Fianarantsoa" },
      {
        name: "description",
        content:
          "Ny'Agnay : gestion intelligente des transports, des déchets et de la communication citoyenne pour transformer Fianarantsoa en Ny'Agnay.",
      },
      { property: "og:title", content: "Ny'Agnay — Ny'Agnay de Fianarantsoa" },
      {
        property: "og:description",
        content: "Transports, déchets et canal citoyen — une seule plateforme intelligente.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold">Ny'Agnay</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Ny'Agnay · Fianarantsoa
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#modules" className="text-muted-foreground hover:text-foreground">Modules</a>
            <a href="#vision" className="text-muted-foreground hover:text-foreground">Vision</a>
            <a href="#impact" className="text-muted-foreground hover:text-foreground">Impact</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline">
              Connexion
            </Link>
            <Link
              to="/app"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:opacity-95"
            >
              S'isncrire <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-hero opacity-20 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-soft">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Plateforme intelligente · Fianarantsoa
            </div>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Pourquoi choisir
              <span className="text-gradient-brand"> Ny'Agnay?</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Ny'Agnay centralise la circulation, les transports publics, les déchets et la
              voix des citoyens dans un système unifié, temps réel et intuitif.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/app"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:opacity-95"
              >
                Explorer le dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#modules"
                className="inline-flex items-center gap-2 rounded-full border bg-card px-7 py-3.5 text-sm font-semibold transition hover:bg-accent"
              >
                Découvrir les modules
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t pt-6">
              {[
                { v: "120+", l: "Bus suivis" },
                { v: "—45%", l: "Temps d'attente" },
                { v: "24/7", l: "Surveillance" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl font-bold tracking-tight">{s.v}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual mock */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-hero opacity-20 blur-2xl" />
            <div className="relative rounded-3xl border bg-card p-6 shadow-glow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-warning/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-success" />
                </div>
                <div className="text-xs font-medium text-muted-foreground">Ny'Agnay.app</div>
              </div>
              <div className="mt-4 overflow-hidden rounded-2xl bg-gradient-hero p-6 text-white">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-80">
                  <Activity className="h-3.5 w-3.5" /> Carte temps réel
                </div>
                <div className="mt-2 text-2xl font-bold">12 lignes actives · 87 bus en circulation</div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {["28", "38", "40"].map((l) => (
                    <div key={l} className="rounded-xl bg-white/15 p-3 backdrop-blur">
                      <div className="text-[10px] uppercase opacity-80">Ligne {l}</div>
                      <div className="text-lg font-bold">{["3", "5", "2"][["28","40","38"].indexOf(l)]} min</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  { n: "23", l: "Signalements" },
                  { n: "6", l: "Zones critiques" },
                  { n: "98%", l: "Aptes" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border bg-background p-3">
                    <div className="text-xl font-bold text-primary">{s.n}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border bg-card p-4 shadow-soft sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 animate-pulse-ring items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <MapPin className="h-5 w-5" />
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Trois modules · Une plateforme
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Une ville intelligente, connectée, citoyenne
          </h2>
          <p className="mt-4 text-muted-foreground">
            Chaque module résout un problème urbain concret de Fianarantsoa.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Bus,
              title: "Smart Bus",
              desc: "Suivi GPS en temps réel, estimation d'arrivée, alertes de visite technique et recommandations intelligentes.",
              tag: "Transport",
            },
            {
              icon: Trash2,
              title: "Smart Waste",
              desc: "Signalement citoyen avec photo, priorisation des zones critiques et planification des collectes.",
              tag: "Environnement",
            },
            {
              icon: MessageSquareText,
              title: "Canal Citoyen",
              desc: "Requêtes, suggestions et réclamations directes vers l'administration avec suivi de statut.",
              tag: "Communication",
            },
          ].map((m) => (
            <div
              key={m.title}
              className="group relative overflow-hidden rounded-3xl border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-12 translate-x-12 rounded-full bg-gradient-brand opacity-10 blur-2xl transition-opacity group-hover:opacity-30" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow">
                <m.icon className="h-6 w-6" />
              </div>
              <div className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {m.tag}
              </div>
              <h3 className="mt-1 text-2xl font-bold">{m.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              <Link
                to="/app"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary"
              >
                Ouvrir le module <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="bg-gradient-brand py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-3">
          {[
            { icon: Activity, title: "Temps réel", desc: "Données urbaines à la seconde, partout dans la ville." },
            { icon: ShieldCheck, title: "Sécurisé", desc: "Authentification par rôle : admin, population, chauffeur." },
            { icon: Leaf, title: "Écologique", desc: "Moins d'embouteillages, moins de déchets, plus de qualité de vie." },
          ].map((v) => (
            <div key={v.title} className="rounded-3xl bg-white/10 p-8 backdrop-blur">
              <v.icon className="h-8 w-8" />
              <h3 className="mt-4 text-2xl font-bold">{v.title}</h3>
              <p className="mt-2 text-white/85">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="impact" className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
          Prêt à découvrir  <span className="text-gradient-brand">Ny'Agnay</span> en action ?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Plongez dans le dashboard interactif et explorez les trois modules de Ny'Agnay.
        </p>
        <Link
          to="/app"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-8 py-4 text-sm font-semibold text-white shadow-glow"
        >
          Entrer dans la plateforme <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <footer className="border-t bg-card">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-brand">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span>© 2026 Ny'Agnay — Fianarantsoa Ny'Agnay</span>
          </div>
          <div className="flex gap-6">
            <a href="#modules" className="hover:text-foreground">Modules</a>
            <a href="#vision" className="hover:text-foreground">Vision</a>
            <Link to="/app" className="hover:text-foreground">Plateforme</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

