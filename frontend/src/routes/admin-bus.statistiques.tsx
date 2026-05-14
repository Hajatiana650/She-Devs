import { createFileRoute } from "@tanstack/react-router";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/admin-bus/statistiques")({
  component: Stats,
});

const ridership = [
  { jour: "Lun", passagers: 2100 }, { jour: "Mar", passagers: 2400 }, { jour: "Mer", passagers: 2200 },
  { jour: "Jeu", passagers: 2600 }, { jour: "Ven", passagers: 2900 }, { jour: "Sam", passagers: 1800 }, { jour: "Dim", passagers: 1100 },
];
const lines = [
  { ligne: "L1", trips: 45 }, { ligne: "L2", trips: 38 }, { ligne: "L3", trips: 29 },
];

function Stats() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Statistiques transport</h1>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <h2 className="font-semibold">Passagers / jour</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer><LineChart data={ridership}>
              <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="jour" fontSize={12} /><YAxis fontSize={12} /><Tooltip />
              <Line type="monotone" dataKey="passagers" stroke="#185FA5" strokeWidth={3} />
            </LineChart></ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <h2 className="font-semibold">Trajets par ligne</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer><BarChart data={lines}>
              <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="ligne" fontSize={12} /><YAxis fontSize={12} /><Tooltip />
              <Bar dataKey="trips" fill="#378ADD" radius={[6,6,0,0]} />
            </BarChart></ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
