import { Outlet, NavLink } from "react-router-dom";
import { Bus, ShieldCheck, User } from "lucide-react";

const items = [
  { to: "/chauffeur/mon-bus", label: "Mon bus", icon: Bus },
  { to: "/chauffeur/assurance", label: "Assurance", icon: ShieldCheck },
  { to: "/chauffeur/profil", label: "Mon profil", icon: User },
];

export function ChauffeurLayout() {
  return (
    <div className="flex min-h-screen bg-background">

      {/* SIDEBAR */}
      <aside className="hidden w-64 flex-col border-r bg-card md:flex">
        <div className="border-b p-5">
          <h1 className="text-lg font-bold text-bus">FianaCity</h1>
          <p className="text-xs text-muted-foreground">Espace chauffeur</p>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {items.map((it) => {
            const Icon = it.icon;

            return (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-bus text-white"
                      : "text-foreground hover:bg-accent"
                  }`
                }
              >
                <Icon size={18} />
                {it.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

    </div>
  );
}