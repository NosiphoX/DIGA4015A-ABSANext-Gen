import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";

import useUser from "./context/useUser";

function AppRoutes() {
  const { user } = useUser();

  return (
    <>
      <Navbar />

      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              user.onboardingComplete ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            }
          />

          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/home"
            element={
              user.onboardingComplete ? (
                <Home />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            }
          />

          <Route
            path="/dashboard"
            element={
              user.onboardingComplete ? (
                <Dashboard />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            }
          />

          <Route
            path="/tracks"
            element={
              user.onboardingComplete ? (
                <Tracks />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            }
          />

          <Route
            path="/tracks/first-property"
            element={
              user.onboardingComplete ? (
                <TrackDetail />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            }
          />

          <Route
            path="/tracks/balanced-lifestyle"
            element={
              user.onboardingComplete ? (
                <TrackDetail />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            }
          />

          <Route
            path="/tracks/financial-reset"
            element={
              user.onboardingComplete ? (
                <TrackDetail />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            }
          />

          <Route
            path="/simulation"
            element={
              user.onboardingComplete ? (
                <Simulation />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            }
          />

          <Route
            path="/simulation/rent-vs-buy"
            element={
              user.onboardingComplete ? (
                <StudioRentVsBuy />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            }
          />

          <Route
            path="/profile"
            element={
              user.onboardingComplete ? (
                <Profile />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            }
          />
        </Routes>
      </div>

      <Footer />
      <ScrollToTopButton />
    </>
  );
}

function App() {
  return (
    <Router basename="/DIGA4015A-ABSANext-Gen/">
      <AppRoutes />
    </Router>
  );
}

export default App;