import { createFileRoute, Outlet, Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Bus, AlertTriangle, Megaphone, User, LayoutDashboard } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

const tabs = [
  { to: "/app/bus", label: "Suivi des Bus", icon: Bus },
  { to: "/app/signaler", label: "Signaler un problème", icon: AlertTriangle },
  { to: "/app/campagnes", label: "Campagnes", icon: Megaphone },
  { to: "/app/profil", label: "Mon Profil", icon: User },
];

function AppLayout() {
  const { role } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!role) navigate({ to: "/login" });
  }, [role, navigate]);

  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-background">
      {/* SIDEBAR - Fixed on Desktop */}
      <aside className="sticky top-0 hidden h-screen w-72 flex-col border-r bg-card/50 backdrop-blur-xl md:flex">
        {/* Logo Section */}
        <div className="flex h-20 items-center px-8">
          <h1 className="text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent">
            Ny'Agnay
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          {tabs.map((t) => {
            const active = path.startsWith(t.to);
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  active 
                    ? "bg-gradient-brand text-white shadow-glow" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                <span>{t.label}</span>
                
                {active && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 z-[-1] rounded-xl bg-gradient-brand"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Footer Section */}
        <div className="border-t p-6">
          <div className="flex items-center gap-3 rounded-2xl bg-secondary/50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-white font-bold">
              {role?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold truncate">Utilisateur</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {role || "Citoyen"}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE HEADER (Visible uniquement sur mobile) */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-card/80 px-6 backdrop-blur-md md:hidden">
          <h1 className="text-xl font-bold text-gradient-brand">Ny'Agnay</h1>
          <div className="h-8 w-8 rounded-full bg-gradient-brand" />
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-4 md:p-8 relative">
           {/* Glow subtil en arrière-plan */}
           <div className="pointer-events-none absolute -top-24 right-0 h-[400px] w-[400px] rounded-full bg-gradient-brand opacity-[0.03] blur-[100px]" />
           
           <div className="relative mx-auto max-w-5xl">
              <Outlet />
           </div>
        </main>
      </div>

      {/* MOBILE NAV (Optionnel : si tu veux garder la barre en bas sur téléphone) */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-4 border-t bg-card/90 backdrop-blur-lg md:hidden">
        {tabs.map((t) => {
          const active = path.startsWith(t.to);
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`flex flex-col items-center justify-center py-3 text-[10px] transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon size={18} />
              <span className="mt-1">{t.label.split(' ')[0]}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}