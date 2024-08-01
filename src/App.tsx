import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import UnderMaintenance from "./pages/UnderMaintenance";
import { AuthProvider } from "./contexts/AuthContext";
import { BankStatementProvider } from "./contexts/BankStatementContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import Beranda from "./pages/Beranda";
import PrivateRoute from "./routes/PrivateRoutes";

import "./index.css";
import MutasiRekening from "./pages/MutasiRekening";

function App() {
  return (
    <Router>
      <AuthProvider>
        <BankStatementProvider>
          <LoadingProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/maintenance" element={<UnderMaintenance />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Beranda />
                  </PrivateRoute>
                }
              />
            </Routes>
          </LoadingProvider>
        </BankStatementProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
