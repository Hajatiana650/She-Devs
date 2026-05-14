import { createFileRoute, Outlet, Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, AlertCircle, Calendar, Megaphone, BarChart3, LogOut } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin-trash")({
  component: AdminTrashLayout,
});

const items = [
  { to: "/admin-trash/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin-trash/signalements", label: "Signalements", icon: AlertCircle },
  { to: "/admin-trash/calendrier", label: "Calendrier collecte", icon: Calendar },
  { to: "/admin-trash/campagnes", label: "Campagnes", icon: Megaphone },
  { to: "/admin-trash/statistiques", label: "Statistiques", icon: BarChart3 },
];

function AdminTrashLayout() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (!role) navigate({ to: "/login" }); }, [role, navigate]);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="theme-trash flex min-h-screen bg-background">
      <aside className="hidden w-60 flex-col border-r bg-card lg:flex">
        <div className="border-b p-5">
          <h1 className="text-lg font-bold text-trash">FianaCity</h1>
          <p className="text-xs text-muted-foreground">Admin Déchets</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {items.map((it) => {
            const active = path.startsWith(it.to);
            const Icon = it.icon;
            return (
              <Link key={it.to} to={it.to} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${active ? "bg-trash text-trash-foreground" : "text-foreground hover:bg-accent"}`}>
                <Icon size={18} /> {it.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t p-3">
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => { logout(); navigate({ to: "/login" }); }}>
            <LogOut size={16} /> Déconnexion
          </Button>
        </div>
      </aside>
      <div className="flex w-full flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b bg-card px-4 lg:hidden">
          <h1 className="font-bold text-trash">Admin Déchets</h1>
          <button onClick={() => { logout(); navigate({ to: "/login" }); }}><LogOut size={18} /></button>
        </header>
        <nav className="flex overflow-x-auto border-b bg-card lg:hidden">
          {items.map((it) => {
            const active = path.startsWith(it.to);
            return (
              <Link key={it.to} to={it.to} className={`whitespace-nowrap px-4 py-2.5 text-sm ${active ? "border-b-2 border-trash font-semibold text-trash" : "text-muted-foreground"}`}>
                {it.label}
              </Link>
            );
          })}
        </nav>
        <main className="flex-1 overflow-x-hidden"><Outlet /></main>
      </div>
    </div>
  );
}
