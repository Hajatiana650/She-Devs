import { createFileRoute, Link } from "@tanstack/react-router";
import { Bus, Recycle, User, Lock, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import type ReCAPTCHAType from "react-google-recaptcha";

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
import { runFullDiagnostic } from "@/lib/backend-diagnostic";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { login, isPending, error } = useLogin();

  const [role, setRoleVal] = useState<Role>("POPULATION");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // ReCAPTCHA client-only
  const [ReCAPTCHA, setReCAPTCHA] =
    useState<typeof ReCAPTCHAType | null>(null);

  useEffect(() => {
    import("react-google-recaptcha").then((mod) => {
      setReCAPTCHA(() => mod.default as typeof ReCAPTCHAType);
    });
  }, []);

  const SITE_KEY =
    "6Lcz1OosAAAAABlsRhZ6k9ZyNdUbJ08B4_hF2IeP";

  const handle = (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) return;

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
    <div className="relative flex min-h-screen overflow-hidden bg-[#f7f8fa]">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      {/* LEFT */}
      <aside className="relative hidden flex-1 overflow-hidden bg-gradient-to-br from-cyan-700 via-cyan-600 to-blue-700 text-white md:flex">

        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-16 text-center">

          <div className="mb-10 rounded-[2rem] border border-white/20 bg-white/10 p-7 backdrop-blur-xl">
            <Bus size={72} strokeWidth={1.4} />
          </div>

          <span className="mb-4 text-xs uppercase tracking-[0.4em] text-white/70">
            Mobilité Urbaine
          </span>

          <h2 className="text-5xl font-bold leading-tight">
            Fianarantsoa <br />
            <span className="font-light italic">
              se connecte
            </span>
          </h2>

          <div className="my-7 h-px w-28 bg-white/30" />

          <p className="max-w-sm text-lg leading-relaxed text-white/80">
            Suivi intelligent des transports urbains et
            mobilité en temps réel.
          </p>
        </div>
      </aside>

      {/* CENTER */}
      <main className="relative z-10 flex flex-1 items-center justify-center p-6">

        <div className="w-full max-w-[470px]">

          <div className="overflow-hidden rounded-[2.2rem] border border-white/40 bg-white/90 shadow-[0_25px_80px_rgba(0,0,0,0.12)] backdrop-blur-2xl">

            <div className="p-10">

              {/* HEADER */}
              <header className="mb-9 text-center">

                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
                  Bienvenue sur
                </span>

                <h1 className="mt-2 bg-gradient-to-r from-cyan-700 via-blue-700 to-emerald-600 bg-clip-text text-6xl font-black italic tracking-tight text-transparent">
                  Ny'Agnay
                </h1>

                <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500" />

                <p className="mt-5 text-[17px] font-semibold leading-relaxed text-black">
                  Plateforme intelligente de transport et
                  de gestion urbaine.
                </p>
              </header>

              {/* FORM */}
              <form onSubmit={handle} className="space-y-6">

                {/* EMAIL */}
                <div className="space-y-2">

                  <Label
                    htmlFor="email"
                    className="text-sm font-bold uppercase tracking-[0.2em] text-black"
                  >
                    Adresse e-mail
                  </Label>

                  <div className="group relative">

                    <User className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-cyan-700" />

                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@exemple.com"
                      required
                      className="h-14 rounded-2xl border-2 border-gray-200 bg-white pl-11 text-[15px] font-semibold text-black placeholder:text-gray-400 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">

                  <Label
                    htmlFor="pwd"
                    className="text-sm font-bold uppercase tracking-[0.2em] text-black"
                  >
                    Mot de passe
                  </Label>

                  <div className="group relative">

                    <Lock className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-cyan-700" />

                    <Input
                      id="pwd"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="• • • • • • • •"
                      required
                      className="h-14 rounded-2xl border-2 border-gray-200 bg-white pl-11 text-[15px] font-semibold tracking-[0.2em] text-black placeholder:tracking-normal placeholder:text-gray-400 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200"
                    />
                  </div>
                </div>

                {/* ROLE */}
                <div className="space-y-2">

                  <Label className="text-sm font-bold uppercase tracking-[0.2em] text-black">
                    Je suis
                  </Label>

                  <Select
                    value={role}
                    onValueChange={(v) =>
                      setRoleVal(v as Role)
                    }
                  >
                    <SelectTrigger className="h-14 rounded-2xl border-2 border-gray-200 bg-white text-[15px] font-bold text-black focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent className="rounded-2xl border border-gray-200 bg-white">

                      {[
                        {
                          value: "POPULATION",
                          label: "Citoyen",
                        },
                        {
                          value: "CHAUFFEUR",
                          label: "Chauffeur",
                        },
                        {
                          value: "ADMIN_BUS",
                          label: "Admin Transport",
                        },
                        {
                          value: "ADMIN_TRASH",
                          label: "Admin Déchets",
                        },
                      ].map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          className="text-sm font-semibold text-black"
                        >
                          {item.label}
                        </SelectItem>
                      ))}

                    </SelectContent>
                  </Select>
                </div>

                {/* CAPTCHA */}
                <div className="space-y-3">

                  <div className="text-center">
                    <span className="text-sm font-bold uppercase tracking-[0.25em] text-black">
                      Vérification de sécurité
                    </span>
                  </div>

                  <div className="flex justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">

                    {ReCAPTCHA && SITE_KEY ? (
                      <ReCAPTCHA
                        sitekey={SITE_KEY}
                        onChange={(token) =>
                          setCaptchaToken(token)
                        }
                        onExpired={() =>
                          setCaptchaToken(null)
                        }
                        theme="light"
                      />
                    ) : (
                      <div className="flex h-[78px] w-[304px] items-center justify-center gap-3 text-sm font-semibold text-gray-500">
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
                        Chargement...
                      </div>
                    )}

                  </div>
                </div>

                {/* ERROR */}
                {error && (
                  <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 space-y-3">
                    <div className="flex gap-3">
                      <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-red-600">{error}</p>
                        <p className="text-xs text-red-500 mt-1">
                          💡 Assurez-vous que le backend est en cours d'exécution sur http://localhost:3000
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={handleDiagnostic}
                      variant="outline"
                      className="w-full h-10 rounded-xl text-sm font-semibold border-red-300 text-red-600 hover:bg-red-50"
                    >
                      🔍 Diagnostiquer le problème
                    </Button>
                  </div>
                )}

                {/* BUTTON */}
                <Button
                  type="submit"
                  disabled={isPending || !captchaToken}
                  className="h-14 w-full rounded-2xl bg-gradient-to-r from-cyan-700 to-emerald-600 text-[15px] font-bold uppercase tracking-[0.15em] text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
                >
                  {isPending ? (
                    <span className="flex items-center gap-3">
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Connexion en cours...
                    </span>
                  ) : (
                    "Se connecter"
                  )}
                </Button>

                {/* REGISTER */}
                <p className="pt-2 text-center text-[15px] font-bold text-black">
                  Pas encore de compte ?{" "}

                  <Link
                    to="/register"
                    className="font-black text-black underline underline-offset-4 transition hover:text-cyan-700"
                  >
                    Créer un compte
                  </Link>
                </p>

              </form>
            </div>
          </div>

          <p className="mt-6 text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
            Fianarantsoa · Madagascar
          </p>

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