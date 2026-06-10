import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Card from "../components/Card";
import useUser from "../context/useUser";
import { createAccount, loginAccount } from "../utils/authService";
import { sendWelcomeEmail } from "../utils/emailService";

gsap.registerPlugin(useGSAP);

function Login() {
  const loginRef = useRef(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, loadUserFromAccount } = useUser();

  const [mode, setMode] = useState("login");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useGSAP(
    () => {
      gsap.from(".login-reveal", {
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
      });
    },
    { scope: loginRef }
  );

  if (isAuthenticated && user.onboardingComplete) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isAuthenticated && !user.onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage("");
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setStatusMessage("Please enter your email and password.");
      setIsLoading(false);
      return;
    }

    if (mode === "signup") {
      if (!formData.name) {
        setStatusMessage("Please enter your name.");
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setStatusMessage("Password must be at least 6 characters.");
        setIsLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setStatusMessage("Passwords do not match.");
        setIsLoading(false);
        return;
      }

      const result = createAccount({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (!result.success) {
        setStatusMessage(result.message);
        setIsLoading(false);
        return;
      }

      loadUserFromAccount(result.account);

      await sendWelcomeEmail(result.account);

      setIsLoading(false);
      navigate("/onboarding");
      return;
    }

    const result = loginAccount({
      email: formData.email,
      password: formData.password,
    });

    if (!result.success) {
      setStatusMessage(result.message);
      setIsLoading(false);
      return;
    }

    loadUserFromAccount(result.account);
    setIsLoading(false);

    if (result.account.onboardingComplete) {
      navigate("/dashboard");
    } else {
      navigate("/onboarding");
    }
  };

  return (
    <main className="auth-experience" ref={loginRef}>
      <section className="auth-hero login-reveal">
        <div>
          <p className="section-kicker">ABSA NextGen Wealth Studio</p>

          <h1>
            {mode === "login"
              ? "Welcome back to your financial path."
              : "Create your NextGen Wealth profile."}
          </h1>

          <p>
            Sign in to continue your personalised dashboard, strategy tracks,
            and simulation studios.
          </p>
        </div>

        <div className="auth-orb">
          <span>Secure Session</span>
          <strong>{mode === "login" ? "Login" : "Sign Up"}</strong>
          <small>Local prototype access</small>
        </div>
      </section>

      <section className="auth-layout login-reveal">
        <Card className="auth-card studio-control-card">
          <div className="auth-tabs">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => {
                setMode("login");
                setStatusMessage("");
              }}
            >
              Login
            </button>

            <button
              type="button"
              className={mode === "signup" ? "active" : ""}
              onClick={() => {
                setMode("signup");
                setStatusMessage("");
              }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="studio-control-grid">
              {mode === "signup" && (
                <div className="input-group floating-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </div>
              )}

              <div className="input-group floating-field">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>

              <div className="input-group floating-field">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                />
              </div>

              {mode === "signup" && (
                <div className="input-group floating-field">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat password"
                  />
                </div>
              )}
            </div>

            {statusMessage && (
              <p className="auth-status-message">{statusMessage}</p>
            )}

            <button type="submit" className="primary-btn auth-submit-btn">
              {isLoading
                ? "Preparing your studio..."
                : mode === "login"
                ? "Login"
                : "Create Account"}
            </button>
          </form>

          <p className="auth-disclaimer">
            Prototype note: account data is stored locally on this device for
            demonstration purposes.
          </p>
        </Card>
      </section>
    </main>
  );
}

export default Login;