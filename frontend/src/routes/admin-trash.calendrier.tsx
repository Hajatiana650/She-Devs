import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QUARTIERS } from "@/lib/mock-data";

export const Route = createFileRoute("/admin-trash/calendrier")({
  component: CalendrierView,
});

type Status = "planned" | "done" | "overdue";

function genMonth(year: number, month: number) {
  const days = new Date(year, month + 1, 0).getDate();
  const events: Record<number, { quartier: string; status: Status }[]> = {};
  for (let d = 1; d <= days; d++) {
    if (d % 3 === 0) {
      const status: Status = d < 8 ? "overdue" : d < 15 ? "done" : "planned";
      events[d] = [{ quartier: QUARTIERS[d % QUARTIERS.length], status }];
      if (d % 6 === 0) events[d].push({ quartier: QUARTIERS[(d + 2) % QUARTIERS.length], status });
    }
  }
  return events;
}

function statusClass(s: Status) {
  if (s === "planned") return "bg-amber-500 text-white";
  if (s === "done") return "bg-[#3BC1A8] text-white";
  return "bg-red-500 text-white";
}

function CalendrierView() {
  const [date, setDate] = useState(new Date(2026, 4, 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const events = genMonth(date.getFullYear(), date.getMonth());

  const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay() || 7;
  const monthName = date.toLocaleString("fr-FR", { month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4fffc] via-[#f0f9f6] to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-[#3BC1A8] to-[#3A9AFF] mb-4">
            <CalendarIcon className="text-white" size={36} />
          </div>
          <h1 className="bg-gradient-to-r from-[#3BC1A8] to-[#3A9AFF] bg-clip-text text-4xl md:text-5xl font-extrabold text-transparent">
            Calendrier des Collectes
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Planification et suivi mensuel des opérations
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1))}
            className="rounded-2xl flex items-center gap-2"
          >
            <ChevronLeft size={20} />
            Mois précédent
          </Button>

          <h2 className="text-3xl font-bold text-slate-800 capitalize tracking-tight">
            {monthName}
          </h2>

          <Button 
            variant="outline" 
            onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1))}
            className="rounded-2xl flex items-center gap-2"
          >
            Mois suivant
            <ChevronRight size={20} />
          </Button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 mb-8 justify-center">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-amber-500" />
            <span>Planifiée</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-[#3BC1A8]" />
            <span>Effectuée</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <span>En retard</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="rounded-3xl border border-white/60 bg-white/80 shadow-xl backdrop-blur-xl overflow-hidden">
          {/* Weekdays */}
          <div className="grid grid-cols-7 border-b bg-slate-50/80">
            {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map((day) => (
              <div key={day} className="py-4 text-center text-sm font-semibold text-slate-600">
                {day}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7">
            {Array.from({ length: firstDay - 1 }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square border-b border-r bg-slate-50/50" />
            ))}

            {Array.from({ length: days }).map((_, i) => {
              const d = i + 1;
              const dayEvents = events[d] || [];
              const isSelected = selectedDay === d;

              return (
                <button
                  key={d}
                  onClick={() => setSelectedDay(isSelected ? null : d)}
                  className={`aspect-square border-b border-r p-3 text-left transition-all duration-200 hover:bg-[#3BC1A8]/5 relative
                    ${isSelected ? "bg-[#3BC1A8]/10 ring-2 ring-inset ring-[#3BC1A8]" : ""}`}
                >
                  <div className={`text-lg font-semibold transition-colors ${isSelected ? "text-[#3BC1A8]" : "text-slate-700"}`}>
                    {d}
                  </div>

                  <div className="mt-2 space-y-1">
                    {dayEvents.slice(0, 2).map((e, idx) => (
                      <div
                        key={idx}
                        className={`text-[10px] truncate rounded px-2 py-0.5 font-medium ${statusClass(e.status)}`}
                      >
                        {e.quartier}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[10px] text-slate-500">+{dayEvents.length - 2} autres</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Details */}
        {selectedDay && events[selectedDay] && (
          <div className="mt-8 rounded-3xl border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6">
              Collectes du {selectedDay} {monthName}
            </h3>
            
            <div className="space-y-4">
              {events[selectedDay].map((e, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between rounded-2xl border border-slate-100 p-5 hover:border-[#3BC1A8]/30 transition-colors"
                >
                  <div className="font-medium text-lg">{e.quartier}</div>
                  <Badge className={`px-6 py-2 text-sm ${statusClass(e.status)}`}>
                    {e.status === "planned" ? "Planifiée" : e.status === "done" ? "Effectuée" : "En retard"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}s