import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import SaldoMutasi from './pages/saldomutasi';
import InfoSaldo from './pages/InfoSaldo';
import UnderMaintenance from './pages/UnderMaintenance';
import { AuthProvider } from './contexts/AuthContext';
import { BankStatementProvider } from './contexts/BankStatementContext';
import { LoadingProvider } from './contexts/LoadingContext';
import Beranda from './pages/Beranda';
import PrivateRoute from './routes/PrivateRoutes';

import './index.css';
import Transaksi from './pages/Transaksi';

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
                      <InfoSaldo />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route
                path="transaksi"
                element={
                  <PrivateRoute>
                    <Transaksi />
                  </PrivateRoute>
                }
              >
                <Route
                  path="rekening"
                  element={
                    <PrivateRoute>
                      <Transaksi />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="transfer"
                  element={
                    <PrivateRoute>
                      <Transaksi />
                    </PrivateRoute>
                  }
                >
                  <Route
                    path="confirmation"
                    element={
                      <PrivateRoute>
                        <Transaksi />
                      </PrivateRoute>
                    }
                  />
                </Route>
              </Route>
            </Routes>
          </LoadingProvider>
        </BankStatementProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
