import { createFileRoute } from "@tanstack/react-router";
import {
  Truck,
  Recycle,
  User,
  Lock,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion"; // Import de framer-motion
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Role } from "@/lib/auth";
import { useLogin } from "@/hooks/useLogin";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { login, isPending, error } = useLogin();

  const [role, setRoleVal] = useState<Role>("POPULATION");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    login({ role, email, password });
  };

  return (
    <div className="relative flex min-h-screen flex-col md:flex-row bg-gradient-soft overflow-hidden">
      {/* Glow background (Ny'Agnay style) */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-hero opacity-20 blur-3xl" />

      {/* LEFT - ANIMATED WASTE TRUCK SECTION */}
      <div className="relative flex flex-1 flex-col items-center justify-center p-10 text-white bg-gradient-brand shadow-glow overflow-hidden">
        
        {/* Conteneur de l'animation */}
        <div className="relative flex flex-col items-center">
          
          <motion.div 
            className="relative flex h-24 w-24 items-center justify-center"
            animate={{ 
              y: [0, -4, 0], // Vibration du camion sur la route
            }}
            transition={{ 
              duration: 0.5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {/* Fond vitré derrière l'icône */}
            <div className="absolute inset-0 rounded-2xl bg-white/15 backdrop-blur shadow-xl" />
            
            {/* Camion */}
            <Truck size={48} className="relative z-10" />
            
            {/* Icône Recycle qui tourne au-dessus du camion */}
            <motion.div
              className="absolute -top-2 -right-2 z-20 bg-emerald-500 rounded-full p-1.5 border-2 border-white shadow-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Recycle size={18} className="text-white" />
            </motion.div>
          </motion.div>

          {/* Effet de sol / route qui défile sous le camion */}
          <div className="mt-4 flex gap-2 h-1 w-24 overflow-hidden">
             <motion.div 
                className="flex gap-4"
                animate={{ x: [0, -40] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
             >
                <div className="h-1 w-8 bg-white/40 rounded-full" />
                <div className="h-1 w-8 bg-white/40 rounded-full" />
                <div className="h-1 w-8 bg-white/40 rounded-full" />
             </motion.div>
          </div>
        </div>

        <h2 className="mt-8 text-3xl font-bold tracking-tight text-center">
           Ny'Agnay Fianarantsoa 
        </h2>

        <p className="mt-2 text-center text-white/80 max-w-xs">
Les routes nous lient, mais la propreté de la ville fait notre dignité. Érivons ensemble la nouvelle histoire de Fianarantsoa.        </p>
      </div>

      {/* CENTER LOGIN CARD */}
      <div className="relative flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border bg-card/80 backdrop-blur-xl p-8 shadow-glow">

          {/* Title Ny'Agnay style */}
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-gradient-brand">Ny'Agnay</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Connectez-vous à votre espace
            </p>
          </div>

          <form onSubmit={handle} className="mt-6 space-y-5">

            {/* EMAIL */}
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 bg-background/60 backdrop-blur"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <Label>Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 bg-background/60 backdrop-blur"
                  placeholder="********"
                  required
                />
              </div>
            </div>

            {/* ROLE */}
            <div className="space-y-2">
              <Label>Je suis</Label>
              <Select value={role} onValueChange={(v) => setRoleVal(v as Role)}>
                <SelectTrigger className="bg-background/60 backdrop-blur">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="POPULATION">Citoyen</SelectItem>
                  <SelectItem value="CHAUFFEUR">Chauffeur</SelectItem>
                  <SelectItem value="ADMIN_BUS">Admin Transport</SelectItem>
                  <SelectItem value="ADMIN_TRASH">Admin Déchets</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-2 text-sm text-red-500">
                {error}
              </div>
            )}

            {/* BUTTON */}
            <Button
              type="submit"
              className="w-full rounded-full bg-gradient-brand shadow-glow hover:opacity-90 transition-opacity"
              size="lg"
              disabled={isPending}
            >
              {isPending ? "Connexion..." : "Se connecter"}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Accès sécurisé Ny'Agnay Platform
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}