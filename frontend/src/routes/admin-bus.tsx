import { createFileRoute, Outlet, Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, Bus, ClipboardCheck, Users, BarChart3, LogOut, Sparkles, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin-bus")({
  component: AdminBusLayout,
});


const items = [
  { to: "/admin-bus/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin-bus/bus", label: "Bus & Lignes", icon: Bus },
  { to: "/admin-bus/visites", label: "Visites", icon: ClipboardCheck },
  { to: "/admin-bus/chauffeurs", label: "Chauffeurs", icon: Users },
  { to: "/admin-bus/statistiques", label: "Statistiques", icon: BarChart3 },
  { to: "/admin-bus/atsihitany", label: "Atsihitany", icon: MessageCircle },
];

function AdminBusLayout() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!role) navigate({ to: "/login" });
  }, [role, navigate]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#ecfffb] via-[#eef6ff] to-[#f5f3ff]">
<<<<<<< HEAD
      <aside className="hidden w-64 flex-col border-r border-white/20 bg-white/10 backdrop-blur-md lg:flex">
        <div className="border-b border-white/20 p-5">
          <div className="flex items-center gap-2">
            <Sparkles size={24} className="text-[#185FA5]" />
            <div>
              <h1 className="text-lg font-black text-[#1B254B]">FianaCity</h1>
              <p className="text-xs text-[#185FA5]/70">Admin Transport</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-2 p-4">
=======
      {/* SIDEBAR DESKTOP MODERNE */}
      <aside className="hidden w-80 flex-col rounded-r-[40px] border-r border-[#3BC1A8]/15 bg-white/95 shadow-[0_30px_80px_rgba(59,193,168,0.14)] backdrop-blur-xl lg:flex">
        <div className="border-b border-[#3BC1A8]/10 px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-[#3BC1A8] via-[#33b7ad] to-[#2f99c3] shadow-lg shadow-[#3BC1A8]/25">
              <Sparkles className="text-white" size={22} />
              <div className="absolute inset-0 rounded-3xl bg-white/10" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">FianaCity</h1>
              <p className="mt-1 text-sm text-slate-500">Admin Transport</p>
            </div>
          </div>
          <div className="mt-6 rounded-[28px] bg-[#3BC1A8]/5 p-4 text-sm text-[#0f766e] shadow-inner shadow-[#3BC1A8]/10">
            <p className="font-medium">Bienvenue Admin</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Gérez les bus, chauffeurs et visites techniques.
            </p>
          </div>
        </div>

        <nav className="flex-1 px-6 py-6 space-y-4">
>>>>>>> 017379017d074cf6d84265b9d41248fa333d8226
          {items.map((it) => {
            const active = path.startsWith(it.to);
            const Icon = it.icon;

            return (
              <Link
                key={it.to}
                to={it.to}
<<<<<<< HEAD
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? 'bg-white text-[#185FA5] shadow-md scale-[1.02]'
                    : 'text-[#1B254B]/60 hover:bg-white/40 hover:text-[#185FA5]'
                }`}
              >
                <Icon size={18} /> {it.label}
=======
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
>>>>>>> 017379017d074cf6d84265b9d41248fa333d8226
              </Link>
            );
          })}
        </nav>
<<<<<<< HEAD
        <div className="border-t border-white/20 p-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-[#1B254B] font-semibold hover:bg-red-100/40 hover:text-red-600 transition-all"
            onClick={() => { logout(); navigate({ to: "/login" }); }}
          >
            <LogOut size={16} /> Déconnexion
=======

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
>>>>>>> 017379017d074cf6d84265b9d41248fa333d8226
          </Button>
        </div>
      </aside>

<<<<<<< HEAD
      <div className="flex w-full flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/20 bg-white/10 backdrop-blur-md px-4 lg:hidden">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-[#185FA5]" />
            <h1 className="text-lg font-black text-[#1B254B]">FianaCity</h1>
          </div>
          <button
            onClick={() => { logout(); navigate({ to: "/login" }); }}
            className="text-[#1B254B] hover:text-red-600 transition-colors"
=======
      {/* MOBILE HEADER */}
      <div className="flex w-full flex-col lg:hidden">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3BC1A8] via-[#33b7ad] to-[#2f99c3] text-white">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">FianaCity</h1>
              <p className="text-xs text-slate-500">Admin Transport</p>
            </div>
          </div>
          <button
            className="rounded-2xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-[#3BC1A8]/40 hover:text-[#0f766e]"
            onClick={() => {
              logout();
              navigate({ to: "/login" });
            }}
>>>>>>> 017379017d074cf6d84265b9d41248fa333d8226
          >
            <LogOut size={20} />
          </button>
        </header>
<<<<<<< HEAD
        <nav className="flex border-b border-white/20 bg-white/10 backdrop-blur-md lg:hidden">
=======

        <nav className="flex border-b border-slate-200 bg-white/95 overflow-x-auto">
>>>>>>> 017379017d074cf6d84265b9d41248fa333d8226
          {items.map((it) => {
            const active = path.startsWith(it.to);
            const Icon = it.icon;
            return (
              <Link
                key={it.to}
                to={it.to}
<<<<<<< HEAD
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 text-center text-sm font-bold transition-all ${
                  active
                    ? 'border-b-2 border-[#185FA5] text-[#185FA5] bg-white/20'
                    : 'text-[#1B254B]/60 hover:bg-white/10'
                }`}
              >
                <Icon size={16} />
=======
                className={`whitespace-nowrap px-4 py-3 text-center text-sm font-semibold transition ${
                  active
                    ? "border-b-3 border-[#3BC1A8] text-[#0f766e]"
                    : "text-slate-500 hover:text-[#137f76]"
                }`}
              >
>>>>>>> 017379017d074cf6d84265b9d41248fa333d8226
                {it.label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 px-4 py-4">
          <Outlet />
        </main>
      </div>

      {/* MAIN CONTENT DESKTOP */}
      <main className="hidden flex-1 lg:block px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}

