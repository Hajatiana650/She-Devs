import { createFileRoute } from "@tanstack/react-router";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/admin-trash/statistiques")({
  component: Stats,
});

const monthly = [
  { mois: "Jan", signalements: 42, traites: 38 },
  { mois: "Fév", signalements: 51, traites: 47 },
  { mois: "Mar", signalements: 38, traites: 36 },
  { mois: "Avr", signalements: 60, traites: 54 },
  { mois: "Mai", signalements: 47, traites: 41 },
];

function Stats() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Statistiques déchets</h1>
      <div className="rounded-xl border bg-card p-5">
        <h2 className="font-semibold">Signalements & traitement</h2>
        <div className="mt-4 h-72">
          <ResponsiveContainer><LineChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="mois" fontSize={12} /><YAxis fontSize={12} /><Tooltip />
            <Line type="monotone" dataKey="signalements" stroke="#BA7517" strokeWidth={3} />
            <Line type="monotone" dataKey="traites" stroke="#3B6D11" strokeWidth={3} />
          </LineChart></ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-xl border bg-card p-5">
        <h2 className="font-semibold">Volume mensuel</h2>
        <div className="mt-4 h-72">
          <ResponsiveContainer><BarChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="mois" fontSize={12} /><YAxis fontSize={12} /><Tooltip />
            <Bar dataKey="signalements" fill="#639922" radius={[6,6,0,0]} />
          </BarChart></ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
