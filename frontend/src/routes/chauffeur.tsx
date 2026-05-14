import {
  createFileRoute,
  Outlet,
  Link,
  useRouterState,
  useNavigate,
} from "@tanstack/react-router";
import { Bus, ShieldCheck, User, LogOut, Sparkles, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/chauffeur")({
  component: ChauffeurLayout,
});

const items = [
  { to: "/chauffeur/mon-bus", label: "Mon bus", icon: Bus },
  { to: "/chauffeur/assurance", label: "Assurance", icon: ShieldCheck },
  { to: "/chauffeur/profil", label: "Mon profil", icon: User },
];

function ChauffeurLayout() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!role) navigate({ to: "/login" });
  }, [role, navigate]);

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
              <p className="mt-1 text-sm text-slate-500">Espace chauffeur</p>
            </div>
          </div>
          <div className="mt-6 rounded-[28px] bg-[#3BC1A8]/5 p-4 text-sm text-[#0f766e] shadow-inner shadow-[#3BC1A8]/10">
            <p className="font-medium">Bienvenue chauffeur</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Accédez rapidement à votre bus, assurance et profil.
            </p>
          </div>
    <div className="flex min-h-screen bg-gradient-to-br from-[#ecfffb] via-[#eef6ff] to-[#f5f3ff]">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-white/20 bg-white/10 backdrop-blur-md md:flex">
        <div className="border-b border-white/20 p-5">
          <div className="flex items-center gap-2">
            <Sparkles size={24} className="text-[#185FA5]" />
            <div>
              <h1 className="text-lg font-black text-[#1B254B]">FianaCity</h1>
              <p className="text-xs text-[#185FA5]/70">Espace chauffeur</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {items.map((it) => {
            const active = path.startsWith(it.to);
            const Icon = it.icon;

            return (
              <Link 
                key={it.to} 
                to={it.to} 
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  active 
                    ? 'bg-white text-[#185FA5] shadow-md scale-[1.02]' 
                    : 'text-[#1B254B]/60 hover:bg-white/40 hover:text-[#185FA5]'
                }`}
              >
                <Icon size={18} /> {it.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/20 p-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-[#1B254B] font-semibold hover:bg-red-100/40 hover:text-red-600 transition-all" 
            onClick={() => { logout(); navigate({ to: "/login" }); }}
          >
            <LogOut size={16} /> Déconnexion
          </Button>
        </div>
      </aside>

      {/* Mobile & Tablet View */}
      <div className="flex w-full flex-col md:hidden">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/20 bg-white/10 backdrop-blur-md px-4">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-[#185FA5]" />
            <h1 className="text-lg font-black text-[#1B254B]">FianaCity</h1>
          </div>
          <button 
            onClick={() => { logout(); navigate({ to: "/login" }); }}
            className="text-[#1B254B] hover:text-red-600 transition-colors"
          >
            <LogOut size={20} />
          </button>
        </header>
        <nav className="flex border-b border-white/20 bg-white/10 backdrop-blur-md">
          {items.map((it) => {
            const active = path.startsWith(it.to);
            const Icon = it.icon;
            return (
              <Link 
                key={it.to} 
                to={it.to} 
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 text-center text-sm font-bold transition-all ${
                  active 
                    ? 'border-b-2 border-[#185FA5] text-[#185FA5] bg-white/20' 
                    : 'text-[#1B254B]/60 hover:bg-white/10'
                }`}
              >
                <it.icon size={16} />
                {it.label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      <main className="hidden flex-1 flex-col md:flex"><Outlet /></main>
    </div>
  );
}