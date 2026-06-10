import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Card from "../components/Card";
import useUser from "../context/useUser";
import { formatCurrency } from "../utils/formatters";
import { getFinancialAdvice } from "../utils/financialAdvice";

gsap.registerPlugin(useGSAP);

function Profile() {
  const profileRef = useRef(null);
  const { user, resetUser } = useUser();

  const advice = getFinancialAdvice(user);

  useGSAP(
    () => {
      gsap.from(".profile-animate", {
        opacity: 0,
        y: 26,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".profile-orb", {
        scale: 0.7,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.75)",
      });
    },
    { scope: profileRef }
  );

  return (
    <main className="profile-page" ref={profileRef}>
      <section className="profile-hero profile-animate">
        <div>
          <p className="hero-label">Your Financial Identity</p>
          <h1>{user.name}'s Wealth Studio</h1>
          <p>
            A personalised overview of your money profile, financial behaviour,
            current strategy direction, and next best move.
          </p>

          <div className="profile-hero-actions">
            <Link to="/dashboard" className="primary-btn">
              Update Money Snapshot
            </Link>

            <Link to="/tracks" className="secondary-btn secondary-dark">
              View Strategy Tracks
            </Link>
          </div>
        </div>

        <div className="profile-orb">
          <span>{user.financialPersonality || "Builder"}</span>
        </div>
      </section>

      <section className="profile-stats-grid profile-animate">
        <Card className="profile-stat-card">
          <span>Total Income</span>
          <h2>{formatCurrency(advice.totalIncome)}</h2>
          <p>Monthly income from salary and side income.</p>
        </Card>

        <Card className="profile-stat-card">
          <span>Monthly Leftover</span>
          <h2>{formatCurrency(advice.monthlyLeftover)}</h2>
          <p>{advice.savingsRate}% potential savings rate.</p>
        </Card>

        <Card className="profile-stat-card">
          <span>Debt Pressure</span>
          <h2>{advice.debtToIncomeRatio}%</h2>
          <p>Debt compared against monthly income.</p>
        </Card>

        <Card className="profile-stat-card">
          <span>Financial Health</span>
          <h2>{advice.financialHealth}</h2>
          <p>Based on income, expenses, savings, and debt.</p>
        </Card>
      </section>

      <section className="profile-layout">
        <div className="profile-main-column">
          <Card className={`profile-identity-card ${advice.insightState} profile-animate`}>
            <p className="section-kicker">Current Reading</p>
            <h2>{advice.insightTitle}</h2>
            <p>{advice.insightMessage}</p>

            <details>
              <summary>Why this matters</summary>
              <p>{advice.insightDetails}</p>
            </details>
          </Card>

          <Card className="profile-animate">
            <p className="section-kicker">Your Money Personality</p>
            <h2>{user.financialPersonality || "Balanced Builder"}</h2>
            <p>
              This identity is based on your onboarding answers and current
              financial position. It gives the product a more personal tone,
              but it can change as your profile changes.
            </p>

            <div className="personality-tags">
              <span>{user.goal || "Goal not selected"}</span>
              <span>{user.riskStyle || "Risk style not selected"}</span>
              <span>{advice.recommendedTrack}</span>
            </div>
          </Card>
        </div>

        <aside className="profile-side-column">
          <Card className="profile-animate">
            <p className="section-kicker">Recommended Track</p>
            <h2>{advice.recommendedTrack}</h2>
            <p>{advice.recommendedTrackMessage}</p>

            <Link to="/tracks" className="primary-btn dashboard-btn">
              Explore Track
            </Link>
          </Card>

          <Card className="profile-animate">
            <p className="section-kicker">Profile Details</p>

            <div className="breakdown-row">
              <span>Name</span>
              <strong>{user.name}</strong>
            </div>

            <div className="breakdown-row">
              <span>Email</span>
              <strong>{user.email || "Not added"}</strong>
            </div>

            <div className="breakdown-row">
              <span>Main Goal</span>
              <strong>{user.goal || "Not selected"}</strong>
            </div>

            <div className="breakdown-row">
              <span>Risk Style</span>
              <strong>{user.riskStyle || "Not selected"}</strong>
            </div>
          </Card>

          <Card className="profile-animate">
            <p className="section-kicker">Account</p>
            <p>
              
            </p>

            <button className="reset-profile-btn danger-reset" onClick={resetUser}>
              Reset saved profile
            </button>
          </Card>
        </aside>
      </section>
    </main>
  );
}

export default Profile;