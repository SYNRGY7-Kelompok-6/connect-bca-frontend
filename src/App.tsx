import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import UnderMaintenance from "./pages/UnderMaintenance";
import { AuthProvider } from "./contexts/AuthContext";
import Beranda from "./pages/Beranda";

import "./index.css";
import MutasiRekening from "./pages/MutasiRekening";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/saldo-mutasi" element={<MutasiRekening />} >
            <Route path="mutasi-rekening" element={<MutasiRekening />} />
          </Route>
          <Route path="/maintenance" element={<UnderMaintenance />} />
          <Route path="/" element={<Beranda />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
