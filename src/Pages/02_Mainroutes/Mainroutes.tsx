import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "../00_Header/Header";
import Footer from "../01_Footer/Footer";
import Home from "../../Components/00_Home/Home";
import Terms from "../03_Terms/Terms";
import Privacy from "../04_Privacy/Privacy";
import Login from "../05-Login/Login";
import Dashboard from "../06-Dashboard/Dashboard";
import Subscription from "../07-Subscription/Subscription";

// import Terms from "../03_Terms/Terms";
// import Privacy from "../04_Privacy/Privacy";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
