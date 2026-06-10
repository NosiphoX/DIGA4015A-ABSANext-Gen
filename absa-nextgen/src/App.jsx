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
import CarFinanceVsInvest from "./pages/CarFinanceVsInvest";
import LocalVsOffshore from "./pages/LocalVsOffshore";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";

import useUser from "./context/useUser";

function ProtectedRoute({ children }) {
  const { user, isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}

function OnboardingRoute() {
  const { user, isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user.onboardingComplete) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Onboarding />;
}

function RootRoute() {
  const { user, isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Navigate to="/dashboard" replace />;
}

function AppRoutes() {
  return (
    <>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<RootRoute />} />

          <Route path="/login" element={<Login />} />

          <Route path="/onboarding" element={<OnboardingRoute />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tracks"
            element={
              <ProtectedRoute>
                <Tracks />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tracks/:trackSlug"
            element={
              <ProtectedRoute>
                <TrackDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/simulation"
            element={
              <ProtectedRoute>
                <Simulation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/simulation/rent-vs-buy"
            element={
              <ProtectedRoute>
                <StudioRentVsBuy />
              </ProtectedRoute>
            }
          />

          <Route
            path="/simulation/car-finance-vs-invest"
            element={
              <ProtectedRoute>
                <CarFinanceVsInvest />
              </ProtectedRoute>
            }
          />

          <Route
            path="/simulation/local-vs-offshore"
            element={
              <ProtectedRoute>
                <LocalVsOffshore />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
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