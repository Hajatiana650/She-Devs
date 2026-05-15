import { createFileRoute, Outlet, Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { 
  LayoutDashboard, 
  AlertCircle, 
  Calendar, 
  Megaphone, 
  BarChart3, 
  LogOut, 
  Sparkles,
  Trash2,
  ChevronRight
} from "lucide-react";
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
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!role) navigate({ to: "/login" });
  }, [role, navigate]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#ecfffb] via-[#eef6ff] to-[#f5f3ff] font-sans">
      
      {/* --- SIDEBAR DESKTOP PREMIUM --- */}
      <aside className="hidden w-72 flex-col bg-white/70 backdrop-blur-xl border-r border-white py-8 px-5 sticky top-0 h-screen lg:flex transition-all">
        
        {/* LOGO SECTION */}
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="size-12 rounded-2xl bg-gradient-to-br from-[#1B254B] to-[#185FA5] flex items-center justify-center shadow-lg shadow-[#185FA5]/20">
            <Trash2 className="text-white" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-[1000] text-[#1B254B] text-xl tracking-tighter leading-none italic">
              Ny'Agnay<span className="text-[#3BC1A8]"></span>
            </span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Fianarantsoa</span>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-2">
          {items.map((it) => {
            const active = path.startsWith(it.to);
            const Icon = it.icon;

            return (
              <Link
                key={it.to}
                to={it.to}
                className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-300 ${
                  active
                    ? "bg-[#185FA5] text-white shadow-xl shadow-[#185FA5]/20"
                    : "text-slate-500 hover:bg-white hover:text-[#1B254B] hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                  <span className="text-sm font-black tracking-tight">{it.label}</span>
                </div>
                {active && <ChevronRight size={14} className="opacity-50" />}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER / USER SECTION */}
        <div className="pt-6 border-t border-white/60">
          <div className="mb-4 px-4 py-3 bg-white/50 rounded-2xl border border-white/60">
           
          </div>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-4 rounded-2xl px-4 py-6 text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all font-black"
            onClick={() => {
              logout();
              navigate({ to: "/login" });
            }}
          >
            <LogOut size={20} strokeWidth={2.5} />
            <span className="text-sm">Déconnexion</span>
          </Button>
        </div>
      </aside>

      {/* --- MOBILE VIEW --- */}
      <div className="flex w-full flex-col lg:hidden">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between bg-white/80 px-6 backdrop-blur-lg border-b border-white">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#1B254B] flex items-center justify-center">
              <Trash2 className="text-white" size={18} />
            </div>
            <span className="font-[1000] text-[#1B254B] italic">ECO<span className="text-[#3BC1A8]">TRASH</span></span>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-xl text-rose-500"
            onClick={() => {
              logout();
              navigate({ to: "/login" });
            }}
          >
            <LogOut size={22} />
          </Button>
        </header>

        {/* Navigation Mobile Horizontale */}
        <nav className="flex bg-white/50 backdrop-blur-md overflow-x-auto px-4 py-2 border-b border-white scrollbar-hide">
          {items.map((it) => {
            const active = path.startsWith(it.to);
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                  active
                    ? "bg-[#185FA5] text-white shadow-lg"
                    : "text-slate-500 hover:text-[#1B254B]"
                }`}
              >
                {it.label.toUpperCase()}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      {/* --- MAIN CONTENT DESKTOP --- */}
      <main className="hidden flex-1 lg:block p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}