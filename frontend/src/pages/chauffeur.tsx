import { Outlet, Link, useLocation } from "react-router-dom";
import { Bus, ShieldCheck, User } from "lucide-react";

const items = [
  { to: "/chauffeur/mon-bus", label: "Mon bus", icon: Bus },
  { to: "/chauffeur/assurance", label: "Assurance", icon: ShieldCheck },
  { to: "/chauffeur/profil", label: "Mon profil", icon: User },
];

export function ChauffeurLayout() {

  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="flex min-h-screen bg-background">

      <aside className="hidden w-64 flex-col border-r bg-card md:flex">
        <div className="border-b p-5">
          <h1 className="text-lg font-bold text-bus">FianaCity</h1>
          <p className="text-xs text-muted-foreground">
            Espace chauffeur
          </p>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {items.map((it) => {
            const active = path.startsWith(it.to);
            const Icon = it.icon;

            return (
              <Link
                key={it.to}
                to={it.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-bus text-bus-foreground"
                    : "text-foreground hover:bg-accent"
                }`}
              >
                <Icon size={18} />
                {it.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex w-full flex-col md:hidden">

        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-card px-4">
          <h1 className="text-lg font-bold text-bus">
            FianaCity Chauffeur
          </h1>
        </header>

        <nav className="flex border-b bg-card">
          {items.map((it) => {
            const active = path.startsWith(it.to);

            return (
              <Link
                key={it.to}
                to={it.to}
                className={`flex-1 px-3 py-2.5 text-center text-sm ${
                  active
                    ? "border-b-2 border-bus font-semibold text-bus"
                    : "text-muted-foreground"
                }`}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      <main className="hidden flex-1 md:block">
        <Outlet />
      </main>

    </div>
  );
}