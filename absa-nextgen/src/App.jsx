import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Tracks from "./pages/Tracks";
import TrackDetail from "./pages/TrackDetail";
import Simulation from "./pages/Simulation";
import StudioRentVsBuy from "./pages/StudioRentVsBuy";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router basename="/DIGA4015A-ABSANext-Gen/">
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/tracks/first-property" element={<TrackDetail />} />
          <Route path="/tracks/balanced-lifestyle" element={<TrackDetail />} />
          <Route path="/tracks/financial-reset" element={<TrackDetail />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/simulation/rent-vs-buy" element={<StudioRentVsBuy />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

      <Footer />
      <ScrollToTopButton />
    </Router>
  );
}

export default App;