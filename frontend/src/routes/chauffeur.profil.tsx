import { createFileRoute } from "@tanstack/react-router";
import { User, Award, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/chauffeur/profil")({
  component: Profil,
});

function Profil() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f4fffc] via-[#eef7ff] to-white p-4 md:p-8">
      <div className="pointer-events-none absolute left-0 top-0 h-52 w-52 rounded-full bg-[#3BC1A8]/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 h-60 w-60 rounded-full bg-[#3A9AFF]/10 blur-3xl" />
      <div className="max-w-xl mx-auto">
        {/* Header centré */}
        <div className="text-center mb-10">
          <h1 className="bg-gradient-to-r from-[#3BC1A8] to-[#3A9AFF] bg-clip-text text-4xl font-bold tracking-tight text-transparent">
            Mon Profil
          </h1>
          <p className="text-zinc-600 mt-2 text-lg">
            Informations personnelles
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-zinc-200 bg-white shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="h-32 bg-gradient-to-r from-[#3BC1A8] via-[#3A9AFF] to-[#3BC1A8] relative">
            <div className="absolute -bottom-12 left-8 flex items-center gap-5">
              <div className="flex size-24 items-center justify-center rounded-3xl bg-white shadow-xl text-4xl font-bold text-[#3BC1A8] ring-4 ring-white">
                RJ
              </div>
            </div>
          </div>

          <div className="pt-16 pb-8 px-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-3xl font-bold text-zinc-900">Rakoto Jean</div>
                <div className="text-lg text-zinc-600 mt-1">Chauffeur — Ligne 1</div>
              </div>
              <div className="px-4 py-2 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-2xl flex items-center gap-2">
                <Award size={18} />
                Actif
              </div>
            </div>

            <div className="mt-2 text-sm text-zinc-500">Permis : B-2018-FNR</div>

            {/* Informations supplémentaires */}
            <div className="mt-10 grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4 bg-zinc-50 rounded-2xl p-5 border border-zinc-100">
                <div className="w-10 h-10 rounded-xl bg-[#3BC1A8]/10 flex items-center justify-center text-[#3BC1A8]">
                  <Phone size={22} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500">Téléphone</div>
                  <div className="font-medium text-zinc-900">+261 34 12 345 67</div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-zinc-50 rounded-2xl p-5 border border-zinc-100">
                <div className="w-10 h-10 rounded-xl bg-[#3A9AFF]/10 flex items-center justify-center text-[#3A9AFF]">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500">Email</div>
                  <div className="font-medium text-zinc-900">jean.rakoto@fiana.mg</div>
                </div>
              </div>
            </div>

            <button className="mt-8 w-full h-14 rounded-2xl bg-gradient-to-r from-[#3BC1A8] to-[#3A9AFF] text-white font-semibold text-base hover:brightness-110 transition-all shadow-lg">
              Modifier mes informations
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-500 mt-8">
          Fiana • Mobilité intelligente
        </p>
      </div>
    </div>
  );
}