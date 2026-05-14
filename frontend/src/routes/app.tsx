import { createFileRoute, Outlet, Link, useRouterState, useNavigate, redirect } from "@tanstack/react-router";
import { Bus, AlertTriangle, Megaphone, User } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

const tabs = [
  { to: "/app/bus", label: "Bus", icon: Bus },
  { to: "/app/signaler", label: "Signaler", icon: AlertTriangle },
  { to: "/app/campagnes", label: "Campagnes", icon: Megaphone },
  { to: "/app/profil", label: "Profil", icon: User },
];

function AppLayout() {
  const { role } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!role) navigate({ to: "/login" });
  }, [role, navigate]);

  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen flex-col bg-background pb-16">
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-card px-4">
        <h1 className="text-lg font-bold">FianaCity</h1>
        <span className="text-xs text-muted-foreground">Citoyen</span>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-4 border-t bg-card">
        {tabs.map((t) => {
          const active = path.startsWith(t.to);
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs transition-colors ${
                active ? "text-bus" : "text-muted-foreground"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              <span className={active ? "font-semibold" : ""}>{t.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
