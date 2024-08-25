import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import InfoSaldo from "./pages/InfoSaldo";
import UnderMaintenance from "./pages/UnderMaintenance";
import { AuthProvider } from "./contexts/AuthContext";
import { BankStatementProvider } from "./contexts/BankStatementContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { QrisTfProvider } from "./contexts/QrisTransferContext";
import { QrisBrProvider } from "./contexts/QrisBayarContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import Beranda from "./pages/Beranda";
import PrivateRoute from "./routes/PrivateRoutes";
import MutasiRekening from "./pages/MutasiRekening";
import Transaksi from "./pages/Transaksi";
import { SavedAccountsProvider } from "./contexts/SavedAccountsContext";
import { TransferProvider } from "./contexts/TransferContext";
import Qris from "./pages/qris";
import QrisBayar from "./pages/qrisbayar";
import QrisTransfer from "./pages/qristransfer";
import Profile from "./pages/Profile";

import "./index.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <BankStatementProvider>
          <SavedAccountsProvider>
            <TransferProvider>
              <LoadingProvider>
                <QrisTfProvider>
                  <QrisBrProvider>
                    <ProfileProvider>
                      <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                          path="/maintenance"
                          element={<UnderMaintenance />}
                        />
                        <Route
                          path="/"
                          element={
                            <PrivateRoute>
                              <Beranda />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/informasi-saldo-rekening"
                          element={
                            <PrivateRoute>
                              <InfoSaldo />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/mutasi-rekening"
                          element={
                            <PrivateRoute>
                              <MutasiRekening />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/transaksi"
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
                        <Route
                          path="/qris"
                          element={
                            <PrivateRoute>
                              <Qris />
                            </PrivateRoute>
                          }
                        >
                          <Route
                            path="qris-bayar"
                            element={
                              <PrivateRoute>
                                <QrisBayar />
                              </PrivateRoute>
                            }
                          />
                          <Route
                            path="qris-transfer"
                            element={
                              <PrivateRoute>
                                <QrisTransfer />
                              </PrivateRoute>
                            }
                          />
                        </Route>
                        <Route
                          path="/profile"
                          element={
                            <PrivateRoute>
                              <Profile />
                            </PrivateRoute>
                          }
                        />
                      </Routes>
                    </ProfileProvider>
                  </QrisBrProvider>
                </QrisTfProvider>
              </LoadingProvider>
            </TransferProvider>
          </SavedAccountsProvider>
        </BankStatementProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
