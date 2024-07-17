import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import UnderMaintenance from "./pages/UnderMaintenance";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/maintenance" element={<UnderMaintenance />} />
      </Routes>
    </Router>
  );
}

export default App;
