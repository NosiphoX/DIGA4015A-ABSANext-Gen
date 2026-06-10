import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "../components/Card";
import useUser from "../context/useUser";

function Login() {
  const navigate = useNavigate();
  const { user, setUser, resetUser } = useUser();
  const [email, setEmail] = useState(user.email || "");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    if (!email.trim()) {
      setMessage("Please enter an email address to continue.");
      return;
    }

    setUser((prevUser) => ({
      ...prevUser,
      email,
      onboardingComplete: true,
    }));

    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-animation-wrapper">
        <Card className="login-card">
          <p className="hero-label">Welcome Back</p>
          <h1>Log into your Wealth Studio</h1>
          <p>
            This prototype uses local storage, so your profile is remembered on
            this device.
          </p>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </div>

          {message && <p className="form-error">{message}</p>}

          <div className="quick-actions">
            <button className="primary-btn dashboard-btn" onClick={handleLogin}>
              Continue
            </button>

            <Link
              to="/onboarding"
              className="secondary-btn dashboard-btn secondary-dark"
            >
              Create New Profile
            </Link>

            <button className="reset-profile-btn" onClick={resetUser}>
              Reset saved profile
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Login;