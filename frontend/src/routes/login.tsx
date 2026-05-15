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

import {
  type Role,
} from "@/lib/auth";

import { useLogin } from "@/hooks/useLogin";
import { runFullDiagnostic } from "@/lib/backend-diagnostic";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { login, isPending, error } = useLogin();

  const [role, setRoleVal] =
    useState<Role>("POPULATION");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handle = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    login({
      role,
      email,
      password,
    });
  };

  const handleDiagnostic = async () => {
    await runFullDiagnostic();
    alert("✅ Vérifiez la console du navigateur (F12 → Console) pour les détails du diagnostic");
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left - Bus side */}
      <div className="flex flex-1 flex-col items-center justify-center bg-bus p-8 text-bus-foreground md:p-12">
        <Bus
          size={72}
          strokeWidth={1.5}
        />

        <h2 className="mt-6 text-3xl font-bold tracking-tight">
          Fianarantsoa se connecte
        </h2>

        <p className="mt-2 text-center text-bus-foreground/80">
          Suivi des bus en temps réel
        </p>
      </div>

      {/* Right - Trash side */}
      <div className="flex flex-1 flex-col items-center justify-center bg-trash p-8 text-trash-foreground md:p-12 order-last md:order-none md:hidden lg:flex">
        <Recycle
          size={72}
          strokeWidth={1.5}
        />

        <h2 className="mt-6 text-3xl font-bold tracking-tight">
          Une ville plus propre pour
          tous
        </h2>

        <p className="mt-2 text-center text-trash-foreground/80">
          Gestion citoyenne des
          déchets
        </p>
      </div>

      {/* Center - Login */}
      <div className="flex flex-1 items-center justify-center bg-background p-6">
        <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-bold">
            FianaCity
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Connectez-vous à votre
            espace
          </p>

          <form
            onSubmit={handle}
            className="mt-6 space-y-4"
          >
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email
              </Label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="pl-9"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="pwd">
                Mot de passe
              </Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="pwd"
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="pl-9"
                  placeholder="********"
                  required
                />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label>
                Je suis
              </Label>

              <Select
                value={role}
                onValueChange={(v) =>
                  setRoleVal(
                    v as Role
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="POPULATION">
                    Citoyen
                  </SelectItem>

                  <SelectItem value="CHAUFFEUR">
                    Chauffeur
                  </SelectItem>

                  <SelectItem value="ADMIN_BUS">
                    Admin Transport
                  </SelectItem>

                  <SelectItem value="ADMIN_TRASH">
                    Admin Déchets
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isPending}
            >
              {isPending
                ? "Connexion..."
                : "Se connecter"}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Connectez-vous avec
              votre compte backend
            </p>
          </form>
        </div>
      </main>

 {/* RIGHT */}
<aside className="relative hidden flex-1 overflow-hidden bg-gradient-to-br from-cyan-700 via-cyan-600 to-blue-700 text-white lg:flex">

  <div className="absolute inset-0 bg-black/10" />
  <div className="absolute right-0 top-0 h-full w-1/3 skew-x-12 bg-white/5" />

  <div className="relative z-10 flex flex-col items-center justify-center px-14 text-center">

    <div className="relative mb-10">
      <div className="absolute inset-0 scale-110 rounded-full border border-white/20 blur-sm" />
      <div className="relative rounded-[2rem] border border-white/20 bg-white/10 p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-md">
        <Recycle size={64} strokeWidth={1.2} />
      </div>
    </div>

    <span className="mb-3 text-xs font-light uppercase tracking-[0.35em] text-white/60">
      Environnement
    </span>

    <h2 className="text-5xl font-light leading-tight tracking-tight">
      Une ville<br />
      <em>plus propre</em>
    </h2>

    <div className="my-6 flex items-center gap-3">
      <div className="h-px w-12 bg-white/30" />
      <div className="h-1 w-1 rounded-full bg-white/50" />
      <div className="h-px w-12 bg-white/30" />
    </div>

    <p className="max-w-xs text-base font-light leading-relaxed text-white/70">
      Gestion intelligente des déchets et amélioration durable de l'environnement urbain.
    </p>

  </div>
</aside>
    </div>
  );
}