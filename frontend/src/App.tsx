import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Campagnes from "./pages/app.campagnes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chauffeur/assurance" element={<Login />} />
        <Route path="/app/campagnes" element={<Campagnes />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;