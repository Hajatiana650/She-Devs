import { createFileRoute, Outlet, Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Bus, ShieldCheck, User, LogOut, Sparkles } from "lucide-react";
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
  useEffect(() => { if (!role) navigate({ to: "/login" }); }, [role, navigate]);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
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
        <main className="flex-1"><Outlet /></main>
      </div>

      <main className="hidden flex-1 flex-col md:flex"><Outlet /></main>
    </div>
  );
}
