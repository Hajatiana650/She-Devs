import { useNavigate } from "react-router-dom";
import { LogOut, User, Bell, Globe, HelpCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CURRENT_USER } from "@/lib/mock-data";

function Profil() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const avatarUrl = CURRENT_USER.avatar || CURRENT_USER.image || null;

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="mx-auto max-w-md px-4 pt-8 space-y-8">
        
        {/* ==================== HEADER AVATAR ==================== */}
        <div className="flex flex-col items-center">
          <div className="relative animate-float">
            {/* Glow + Gradient Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-primary opacity-30 blur-xl animate-pulse-ring" />
            
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-brand p-1 shadow-glow">
              <div className="flex h-full w-full overflow-hidden rounded-full bg-card">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={CURRENT_USER.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-gradient-brand">
                    {CURRENT_USER.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status en ligne */}
          <div className="mt-3 flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-600 dark:text-emerald-400">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            En ligne
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground">
            {CURRENT_USER.name}
          </h1>
          <p className="text-muted-foreground mt-1">{CURRENT_USER.email}</p>
        </div>

        {/* ==================== MENU ==================== */}
        <div className="rounded-3xl bg-card p-2 shadow-soft border border-border/60">
          {[
            { icon: Bell, label: "Notifications", desc: "Gérer mes alertes" },
            { icon: Globe, label: "Langue", desc: "Français / Malagasy" },
            { icon: User, label: "Mon compte", desc: "Informations personnelles" },
            { icon: HelpCircle, label: "Aide & support", desc: "Centre d'aide" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 hover:bg-accent hover:shadow-sm active:scale-[0.985]"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary transition-transform group-hover:scale-110">
                  <Icon size={26} />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-foreground">{item.label}</p>
                  {item.desc && (
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  )}
                </div>

                <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1.5" />
              </div>
            );
          })}
        </div>

        {/* ==================== BOUTON DECONNEXION ==================== */}
        <Button
          onClick={handleLogout}
          variant="destructive"
          size="lg"
          className="w-full rounded-2xl py-7 text-base font-semibold shadow-md active:scale-[0.98] transition-all duration-200 hover:brightness-105"
        >
          <LogOut size={22} className="mr-3" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}

export default Profil;