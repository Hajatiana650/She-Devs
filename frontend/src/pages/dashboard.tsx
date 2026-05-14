import {Button} from "@/components/pieces/button";
export default function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <div style={{ marginTop: "20px" }}>
        <p>Bienvenue sur le tableau de bord 👋</p>
       <Button variant="destructive">Voir les détails</Button>
      </div>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <div style={{ padding: "15px", border: "1px solid #ccc" }}>
          <h3>Utilisateurs</h3>
          <p>120</p>
        </div>

        <div style={{ padding: "15px", border: "1px solid #ccc" }}>
          <h3>Projets</h3>
          <p>8</p>
        </div>

        <div style={{ padding: "15px", border: "1px solid #ccc" }}>
          <h3>Messages</h3>
          <p>24</p>
        </div>
      </div>
    </div>
  );
}