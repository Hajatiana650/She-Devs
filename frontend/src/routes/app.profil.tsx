import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut, User, Bell, Globe, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { CURRENT_USER } from "@/lib/mock-data";

export const Route = createFileRoute("/app/profil")({
  component: Profil,
});

function Profil() {
  const { logout, email } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-4 p-4">
      <div className="rounded-xl border bg-card p-5 text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-bus text-bus-foreground text-2xl font-bold">
          {CURRENT_USER.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <h2 className="mt-3 font-bold">{CURRENT_USER.name}</h2>
        <p className="text-sm text-muted-foreground">{email ?? CURRENT_USER.email}</p>
      </div>

      <div className="rounded-xl border bg-card">
        {[
          { icon: Bell, label: "Notifications" },
          { icon: Globe, label: "Langue : Français / Malagasy" },
          { icon: User, label: "Mon compte" },
          { icon: HelpCircle, label: "Aide & support" },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className={`flex items-center gap-3 p-4 ${i > 0 ? "border-t" : ""}`}>
              <Icon size={18} className="text-muted-foreground" />
              <span className="flex-1 text-sm">{item.label}</span>
            </div>
          );
        })}
      </div>

      <Button variant="outline" className="w-full" onClick={() => { logout(); navigate({ to: "/login" }); }}>
        <LogOut size={16} /> Déconnexion
      </Button>
    </div>
  );
}
