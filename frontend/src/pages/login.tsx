import { Link, useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, Shield, Users, Bus } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const nav = useNavigate();
  const [role, setRole] = useState<"admin" | "population" | "driver">("admin");

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left visual */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-hero p-12 text-white lg:flex">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-bold">SmartFianar</div>
            <div className="text-[11px] uppercase tracking-wider opacity-80">Smart City</div>
          </div>
        </Link>
        <div>
          <h2 className="text-5xl font-bold leading-tight">
            Une ville intelligente, à portée de main.
          </h2>
          <p className="mt-4 max-w-md text-white/85">
            Accédez à votre espace pour piloter la circulation, signaler des déchets ou
            communiquer avec l'administration.
          </p>
        </div>
        <div className="text-xs opacity-70">© 2026 Fianarantsoa Smart City</div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center bg-background p-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold tracking-tight">Bon retour 👋</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Choisissez votre espace et connectez-vous.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2 rounded-xl border bg-muted/40 p-1">
            {[
              { k: "admin",      icon: Shield, label: "Admin"     },
              { k: "population", icon: Users,  label: "Citoyen"   },
              { k: "driver",     icon: Bus,    label: "Chauffeur" },
            ].map((r) => (
              <button
                key={r.k}
                onClick={() => setRole(r.k as typeof role)}
                className={`flex flex-col items-center gap-1 rounded-lg px-2 py-3 text-xs font-medium transition ${
                  role === r.k
                    ? "bg-card text-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <r.icon className="h-4 w-4" />
                {r.label}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              nav("/dashboard");
            }}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="vous@fianarantsoa.mg"
                className="mt-1.5 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none ring-ring/30 transition focus:ring-2"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Mot de passe
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none ring-ring/30 transition focus:ring-2"
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:opacity-95"
            >
              Se connecter <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link to="/register" className="font-semibold text-primary">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}