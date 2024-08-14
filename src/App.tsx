import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SaldoMutasi from "./pages/saldomutasi";
import InfoSaldo from "./pages/InfoSaldo";
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
              <Route
                path="/saldo-mutasi"
                element={
                  <PrivateRoute>
                    <SaldoMutasi />
                  </PrivateRoute>
                }
              >
                <Route
                  path="informasi-saldo-rekening"
                  element={
                    <PrivateRoute>
                      <InfoSaldo />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="mutasi-rekening"
                  element={
                    <PrivateRoute>
                      <MutasiRekening />
                    </PrivateRoute>
                  }
                />
              </Route>
            </Routes>
          </LoadingProvider>
        </BankStatementProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
