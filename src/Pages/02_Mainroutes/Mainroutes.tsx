import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../00_Header/Header";
import Footer from "../01_Footer/Footer";
import Home from "../../Components/00_Home/Home";
// import Terms from "../03_Terms/Terms";
// import Privacy from "../04_Privacy/Privacy";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/class" element={<Service />} />
          <Route path="/gallery" element={<Pages />} />
          <Route path="/blog" element={<Contact />} /> */}
          {/* <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<Privacy />} /> */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
