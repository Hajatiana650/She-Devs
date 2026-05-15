import { createFileRoute, Outlet, Link, useRouterState, useNavigate, redirect } from "@tanstack/react-router";
import { Bus, AlertTriangle, Megaphone, User, MessageCircle, LogOut, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

const items = [
  { to: "/app/bus", label: "Bus", icon: Bus },
  { to: "/app/signaler", label: "Signaler", icon: AlertTriangle },
  { to: "/app/campagnes", label: "Campagnes", icon: Megaphone },
  { to: "/app/atsihitany", label: "Atsihitany", icon: MessageCircle },
  { to: "/app/profil", label: "Profil", icon: User },
];


function AppLayout() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!role) navigate({ to: "/login" });
  }, [role, navigate]);

  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#ecfffb] via-[#eef6ff] to-[#f5f3ff]">

      {/* SIDEBAR DESKTOP MODERNE */}
      <aside className="hidden w-80 flex-col rounded-r-[40px] border-r border-[#3BC1A8]/15 bg-white/95 shadow-[0_30px_80px_rgba(59,193,168,0.14)] backdrop-blur-xl md:flex">
        <div className="border-b border-[#3BC1A8]/10 px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-[#3BC1A8] via-[#33b7ad] to-[#2f99c3] shadow-lg shadow-[#3BC1A8]/25">
              <Sparkles className="text-white" size={22} />
              <div className="absolute inset-0 rounded-3xl bg-white/10" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">FianaCity</h1>
              <p className="mt-1 text-sm text-slate-500">Espace citoyen</p>
            </div>
          </div>
          <div className="mt-6 rounded-[28px] bg-[#3BC1A8]/5 p-4 text-sm text-[#0f766e] shadow-inner shadow-[#3BC1A8]/10">
            <p className="font-medium">Bienvenue citoyen</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Accédez aux bus, signalements, campagnes et vos messages.
            </p>
          </div>
        </div>

        <nav className="flex-1 px-6 py-6 space-y-4">
          {items.map((it) => {
            const active = path.startsWith(it.to);
            const Icon = it.icon;

            return (
              <Link
                key={it.to}
                to={it.to}
                className={`group flex items-center gap-4 rounded-[26px] border px-5 py-4 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "border-[#3BC1A8] bg-[#3BC1A8]/15 text-slate-900 shadow-lg shadow-[#3BC1A8]/10"
                    : "border-transparent bg-white text-slate-700 hover:border-[#3BC1A8]/30 hover:bg-[#3BC1A8]/10 hover:text-[#0f766e]"
                }`}
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl transition ${
                  active ? "bg-[#3BC1A8] text-white" : "bg-[#3BC1A8]/10 text-[#3BC1A8] group-hover:bg-[#3BC1A8]/20"
                }`}>
                  <Icon size={18} />
                </div>
                <span>{it.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[#3BC1A8]/10 px-6 py-5">
          <Button
            variant="ghost"
            className="w-full justify-between gap-3 rounded-[26px] border border-[#3BC1A8]/10 bg-[#3BC1A8]/5 px-4 py-3 text-[#0f766e] transition hover:bg-[#3BC1A8]/10"
            onClick={() => {
              logout();
              navigate({ to: "/login" });
            }}
          >
            <span className="flex items-center gap-2">
              <LogOut size={18} /> Déconnexion
            </span>
          </Button>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <div className="flex w-full flex-col md:hidden">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#3BC1A8]/10 bg-white/70 px-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3BC1A8] via-[#33b7ad] to-[#2f99c3] text-white">
              <Sparkles size={20} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">FianaCity</h1>
              <p className="text-xs text-slate-500">Citoyen</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#3BC1A8] hover:bg-[#3BC1A8]/10"
            onClick={() => {
              logout();
              navigate({ to: "/login" });
            }}
          >
            <LogOut size={18} />
          </Button>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        {/* MOBILE BOTTOM NAV */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t bg-white/95 backdrop-blur-xl">
          {items.map((t) => {
            const active = path.startsWith(t.to);
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs transition-colors ${
                  active ? "text-[#3BC1A8]" : "text-slate-500"
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                <span className={active ? "font-semibold" : ""}>{t.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* DESKTOP MAIN CONTENT */}
      <div className="hidden flex-1 flex-col md:flex">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
