import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ChauffeurLayout } from "./pages/chauffeur";
import { MonBus } from "./pages/chauffeur.mon-bus";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Profil from "./pages/app.profile";           // ← Import du composant
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />

          {/* Routes Chauffeur */}
          <Route path="/chauffeur" element={<ChauffeurLayout />}>
            <Route index element={<Navigate to="mon-bus" replace />} />
            <Route path="mon-bus" element={<MonBus />} />
            <Route path="assurance" element={<div className="p-6">Assurance Page</div>} />
            
            {/* Route Profil ajoutée */}
            
          </Route>
          <Route path="profil" element={<Profil />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;