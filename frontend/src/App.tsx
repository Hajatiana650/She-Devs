import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import { ChauffeurLayout } from "./pages/chauffeur";
import { MonBus } from "./pages/chauffeur.mon-bus";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chauffeur" element={<ChauffeurLayout />}>
          <Route index element={<Navigate to="mon-bus" replace />} />
          <Route path="mon-bus" element={<MonBus />} />
          <Route path="assurance" element={<div className="p-6">Assurance</div>} />
          <Route path="profil" element={<div className="p-6">Profil</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;