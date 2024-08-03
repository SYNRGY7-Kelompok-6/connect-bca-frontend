import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SaldoMutasi from "./pages/saldomutasi";
import InfoSaldo from "./pages/InfoSaldo";
import UnderMaintenance from "./pages/UnderMaintenance";
import { AuthProvider } from "./contexts/AuthContext";
// import PrivateRoute from "./routes/PrivateRoutes";

import "./index.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/maintenance" element={<UnderMaintenance />} />
          {/* <Route
            path="/"
            element={
              <PrivateRoute>
                <Beranda />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;