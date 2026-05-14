import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bus, Recycle, User, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth, type Role } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { setRole } = useAuth();
  const navigate = useNavigate();
  const [role, setRoleVal] = useState<Role>("POPULATION");
  const [email, setEmail] = useState("demo@fianacity.mg");

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(role, email);
    const route = {
      POPULATION: "/app/bus",
      CHAUFFEUR: "/chauffeur/mon-bus",
      ADMIN_BUS: "/admin-bus/dashboard",
      ADMIN_TRASH: "/admin-trash/dashboard",
    }[role];
    navigate({ to: route });
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left - Bus side */}
      <div className="flex flex-1 flex-col items-center justify-center bg-bus p-8 text-bus-foreground md:p-12">
        <Bus size={72} strokeWidth={1.5} />
        <h2 className="mt-6 text-3xl font-bold tracking-tight">Fianarantsoa se connecte</h2>
        <p className="mt-2 text-center text-bus-foreground/80">Suivi des bus en temps réel</p>
      </div>

      {/* Right - Trash side */}
      <div className="flex flex-1 flex-col items-center justify-center bg-trash p-8 text-trash-foreground md:p-12 order-last md:order-none md:hidden lg:flex">
        <Recycle size={72} strokeWidth={1.5} />
        <h2 className="mt-6 text-3xl font-bold tracking-tight">Une ville plus propre pour tous</h2>
        <p className="mt-2 text-center text-trash-foreground/80">Gestion citoyenne des déchets</p>
      </div>

      {/* Center - Login */}
      <div className="flex flex-1 items-center justify-center bg-background p-6">
        <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-bold">FianaCity</h1>
          <p className="mt-1 text-sm text-muted-foreground">Connectez-vous à votre espace</p>

          <form onSubmit={handle} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pwd">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="pwd" type="password" defaultValue="demo1234" className="pl-9" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Je suis</Label>
              <Select value={role} onValueChange={(v) => setRoleVal(v as Role)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="POPULATION">Citoyen</SelectItem>
                  <SelectItem value="CHAUFFEUR">Chauffeur</SelectItem>
                  <SelectItem value="ADMIN_BUS">Admin Transport</SelectItem>
                  <SelectItem value="ADMIN_TRASH">Admin Déchets</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" size="lg">Se connecter</Button>
            <p className="text-center text-xs text-muted-foreground">Démo — n'importe quel mot de passe fonctionne</p>
          </form>
        </div>
      </div>
    </div>
  );
}
