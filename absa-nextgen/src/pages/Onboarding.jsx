import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Card from "../components/Card";
import useUser from "../context/useUser";

gsap.registerPlugin(useGSAP);

function Onboarding() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const pageRef = useRef(null);
  const stepRef = useRef(null);

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    monthlyIncome: "",
    sideIncome: "",
    rent: "",
    debt: "",
    savings: "",
    goal: "",
    riskStyle: "",
  });

  useGSAP(
    () => {
      gsap.from(".onboarding-focus-hero", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".onboarding-card", {
        opacity: 0,
        y: 22,
        duration: 0.7,
        delay: 0.15,
        ease: "power3.out",
      });
    },
    { scope: pageRef }
  );

  useGSAP(
    () => {
      gsap.fromTo(
        stepRef.current,
        {
          opacity: 0,
          y: 18,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.45,
          ease: "power3.out",
        }
      );
    },
    { dependencies: [step], scope: pageRef }
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const convertToNumber = (value) => {
    if (value === "") return 0;
    return Number(value);
  };

  const getFinancialPersonality = () => {
    const debt = convertToNumber(formData.debt);

    if (debt >= 15000 || formData.goal === "Pay off debt") {
      return "Foundation Builder";
    }

    if (formData.goal === "Buy my first property") {
      return "Future Owner";
    }

    if (formData.goal === "Balance lifestyle and investing") {
      return "Lifestyle Strategist";
    }

    if (formData.riskStyle === "Growth") {
      return "Growth Explorer";
    }

    return "Balanced Builder";
  };

  const getRecommendedTrack = () => {
    const debt = convertToNumber(formData.debt);

    if (debt >= 15000 || formData.goal === "Pay off debt") {
      return "Financial Reset & Foundation Builder";
    }

    if (formData.goal === "Buy my first property") {
      return "First Property Path";
    }

    if (
      formData.goal === "Start investing consistently" ||
      formData.goal === "Balance lifestyle and investing"
    ) {
      return "Balanced Lifestyle & Investing";
    }

    return "Financial Reset & Foundation Builder";
  };

  const canContinue = () => {
    if (step === 1) {
      return formData.name.trim() !== "" && formData.email.trim() !== "";
    }

    if (step === 2) {
      return formData.monthlyIncome !== "" && formData.rent !== "";
    }

    if (step === 3) {
      return formData.goal !== "" && formData.riskStyle !== "";
    }

    return true;
  };

  const animateStepOut = (callback) => {
    gsap.to(stepRef.current, {
      opacity: 0,
      y: -12,
      filter: "blur(6px)",
      duration: 0.25,
      ease: "power2.in",
      onComplete: callback,
    });
  };

  const handleNext = () => {
    if (!canContinue()) return;

    if (step < 4) {
      animateStepOut(() => setStep((prevStep) => prevStep + 1));
    }
  };

  const handleBack = () => {
    if (step > 1) {
      animateStepOut(() => setStep((prevStep) => prevStep - 1));
    }
  };

  const completeOnboarding = () => {
    const finalUser = {
      name: formData.name,
      email: formData.email,
      monthlyIncome: convertToNumber(formData.monthlyIncome),
      sideIncome: convertToNumber(formData.sideIncome),
      rent: convertToNumber(formData.rent),
      carPayment: 0,
      insurance: 0,
      medicalAid: 0,
      subscriptions: 0,
      food: 0,
      debt: convertToNumber(formData.debt),
      savings: convertToNumber(formData.savings),
      goal: formData.goal,
      riskStyle: formData.riskStyle,
      financialPersonality: getFinancialPersonality(),
      recommendedTrack: getRecommendedTrack(),
      onboardingComplete: true,
    };

    setUser(finalUser);
    navigate("/dashboard");
  };

  return (
    <main className="onboarding-focus-page" ref={pageRef}>
      <section className="onboarding-focus-hero">
        <p className="hero-label">Create Your Wealth Studio</p>
        <h1>Set up your money profile.</h1>
        <p>
          A short guided setup that personalises your dashboard, strategy track,
          and simulation results.
        </p>
      </section>

      <section className="onboarding-focus-layout">
        <Card className="onboarding-card">
          <div className="onboarding-top-row">
            <div>
              <p className="step-label">Step {step} of 4</p>
              <h2>
                {step === 1 && "Your identity"}
                {step === 2 && "Your money picture"}
                {step === 3 && "Your direction"}
                {step === 4 && "Your starting profile"}
              </h2>
            </div>

            <div className="step-indicator compact">
              <span className={step >= 1 ? "active-step" : ""}>1</span>
              <span className={step >= 2 ? "active-step" : ""}>2</span>
              <span className={step >= 3 ? "active-step" : ""}>3</span>
              <span className={step >= 4 ? "active-step" : ""}>4</span>
            </div>
          </div>

          <div className="onboarding-step" ref={stepRef}>
            {step === 1 && (
              <>
                <p className="form-intro">
                  Start with the basics. This is how your app will remember and
                  greet you.
                </p>

                <div className="input-grid">
                  <div className="input-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="input-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <p className="form-intro">
                  Enter rough monthly values. You can update the detailed budget
                  later in your Money Snapshot.
                </p>

                <div className="input-grid">
                  <div className="input-group">
                    <label>Monthly Income</label>
                    <input
                      type="number"
                      name="monthlyIncome"
                      value={formData.monthlyIncome}
                      onChange={handleChange}
                      placeholder="e.g. 38000"
                    />
                  </div>

                  <div className="input-group">
                    <label>Side Income</label>
                    <input
                      type="number"
                      name="sideIncome"
                      value={formData.sideIncome}
                      onChange={handleChange}
                      placeholder="Optional"
                    />
                  </div>

                  <div className="input-group">
                    <label>Monthly Rent</label>
                    <input
                      type="number"
                      name="rent"
                      value={formData.rent}
                      onChange={handleChange}
                      placeholder="e.g. 12000"
                    />
                  </div>

                  <div className="input-group">
                    <label>Total Debt</label>
                    <input
                      type="number"
                      name="debt"
                      value={formData.debt}
                      onChange={handleChange}
                      placeholder="Optional"
                    />
                  </div>

                  <div className="input-group">
                    <label>Current Savings</label>
                    <input
                      type="number"
                      name="savings"
                      value={formData.savings}
                      onChange={handleChange}
                      placeholder="Optional"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <p className="form-intro">
                  Choose the direction that best describes what you want your
                  next five years to build toward.
                </p>

                <div className="input-grid">
                  <div className="input-group">
                    <label>Main Goal</label>
                    <select
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                    >
                      <option value="">Select a goal</option>
                      <option>Build an emergency fund</option>
                      <option>Buy my first property</option>
                      <option>Pay off debt</option>
                      <option>Start investing consistently</option>
                      <option>Balance lifestyle and investing</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label>Risk Style</label>
                    <select
                      name="riskStyle"
                      value={formData.riskStyle}
                      onChange={handleChange}
                    >
                      <option value="">Select your style</option>
                      <option>Careful</option>
                      <option>Balanced</option>
                      <option>Growth</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <p className="form-intro">
                  This is the first version of your profile. The app will adapt
                  as you update your values.
                </p>

                <div className="identity-grid">
                  <div className="personality-preview">
                    <span>Your financial personality</span>
                    <h3>{getFinancialPersonality()}</h3>
                    <p>
                      A starting identity that shapes the tone and priorities of
                      your financial guidance.
                    </p>
                  </div>

                  <div className="personality-preview track-preview">
                    <span>Recommended strategy track</span>
                    <h3>{getRecommendedTrack()}</h3>
                    <p>
                      This is the first track the app recommends based on your
                      goal, debt, and risk style.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="onboarding-actions">
            {step > 1 && (
              <button
                type="button"
                className="secondary-dark action-btn"
                onClick={handleBack}
              >
                Back
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                className={`primary-btn action-btn ${
                  !canContinue() ? "disabled-btn" : ""
                }`}
                onClick={handleNext}
                disabled={!canContinue()}
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                className="primary-btn action-btn"
                onClick={completeOnboarding}
              >
                Enter My Studio
              </button>
            )}
          </div>
        </Card>

        <aside className="onboarding-side-panel">
          <p className="side-panel-label">Live setup</p>
          <h3>
            {formData.name ? `${formData.name}'s profile` : "Your profile"}
          </h3>
          <p>
            Your inputs will create a saved local profile and personalise the
            rest of the experience.
          </p>

          <div className="mini-profile-list">
            <span>Goal: {formData.goal || "Not selected yet"}</span>
            <span>Style: {formData.riskStyle || "Not selected yet"}</span>
            <span>
              Identity: {step === 4 ? getFinancialPersonality() : "Building..."}
            </span>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Onboarding;