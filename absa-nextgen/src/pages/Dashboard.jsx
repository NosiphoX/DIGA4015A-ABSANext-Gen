import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Card from "../components/Card";
import Tooltip from "../components/Tooltip";
import { formatCurrency } from "../utils/formatters";
import { getFinancialAdvice } from "../utils/financialAdvice";
import useUser from "../context/useUser";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Dashboard() {
  const dashboardRef = useRef(null);
  const [showBanner, setShowBanner] = useState(true);
  const { user, setUser } = useUser();

  const advice = getFinancialAdvice(user);

  const currentDate = new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  useGSAP(
    () => {
      gsap.from(".dashboard-reveal", {
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.utils.toArray(".focus-section").forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0.45,
            y: 36,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 45%",
              scrub: true,
            },
          }
        );

        gsap.to(section, {
          opacity: 0.35,
          y: -24,
          filter: "blur(3px)",
          scrollTrigger: {
            trigger: section,
            start: "bottom 38%",
            end: "bottom 12%",
            scrub: true,
          },
        });
      });
    },
    { scope: dashboardRef }
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    const textFields = ["name", "goal", "riskStyle", "financialPersonality"];

    setUser((prevUser) => ({
      ...prevUser,
      [name]: textFields.includes(name) ? value : Number(value),
    }));
  };

  return (
    <main className="dashboard-experience" ref={dashboardRef}>
      <section className="dashboard-hero dashboard-reveal focus-section">
        <div className="dashboard-hero-copy">
          <p className="dashboard-date">{currentDate}</p>
          <h1>Hello, {user.name || "there"}</h1>
          <p>
            Your Money Snapshot is reading your income, expenses, debt, savings,
            and goal to guide your next best financial move.
          </p>

          <div className="hero-action-row">
            <a href="#money-editor" className="primary-btn">
              Update My Details
            </a>

            <Link to="/simulation" className="secondary-btn secondary-dark">
              Test a Scenario
            </Link>
          </div>
        </div>

        <div className={`financial-orb ${advice.insightState}`}>
          <span>Financial Health</span>
          <strong>{advice.financialHealth}</strong>
          <small>{advice.savingsRate}% savings rate</small>
        </div>
      </section>

      {showBanner && (
        <section className="context-banner dashboard-reveal">
          <div>
            <h4>Welcome to your Money Snapshot</h4>
            <p>
              This dashboard changes as your profile changes. Your advice,
              strategy track, and goal progress are based on your actual inputs.
            </p>
          </div>

          <button onClick={() => setShowBanner(false)}>Dismiss</button>
        </section>
      )}

      <section className="money-flow-section dashboard-reveal focus-section">
        <div className="money-flow-main">
          <p className="section-kicker">Current Position</p>
          <h2>{formatCurrency(advice.monthlyLeftover)}</h2>
          <p>
            Estimated money left after your main monthly costs. This is the
            amount that can support savings, debt payments, investing, or future
            property planning.
          </p>
        </div>

        <div className="money-flow-strip">
          <div>
            <span>Total Income</span>
            <strong>{formatCurrency(advice.totalIncome)}</strong>
          </div>

          <div>
            <span>Monthly Costs</span>
            <strong>{formatCurrency(advice.totalExpenses)}</strong>
          </div>

          <div>
            <span>Debt Pressure</span>
            <strong>{advice.debtToIncomeRatio}%</strong>
          </div>
        </div>
      </section>

      <section className="dashboard-story-grid focus-section">
        <Card className={`insight-card ${advice.insightState} dashboard-reveal`}>
          <div className="card-title-row">
            <h3>Financial Insight</h3>
            <Tooltip text="This insight is based on your income, expenses, debt, savings, and selected goal." />
          </div>

          <p className="insight-title">{advice.insightTitle}</p>
          <p className="insight-text">{advice.insightMessage}</p>

          <details>
            <summary>Learn More</summary>
            <p>{advice.insightDetails}</p>
          </details>
        </Card>

        <Card className="recommended-track-card dashboard-reveal">
          <div className="card-title-row">
            <h3>Recommended Strategy Track</h3>
            <Tooltip text="This recommendation changes based on your current financial profile and goal." />
          </div>

          <p className="recommendation-title">{advice.recommendedTrack}</p>
          <p>{advice.recommendedTrackMessage}</p>

          <Link to="/tracks" className="primary-btn dashboard-btn">
            View Track
          </Link>
        </Card>
      </section>

      <section className="goal-focus-panel dashboard-reveal focus-section">
        <div>
          <p className="section-kicker">Goal Progress</p>
          <h2>{advice.goalTitle}</h2>
          <p>{advice.goalMessage}</p>
        </div>

        <div className="goal-progress-visual">
        <div
          className="goal-progress-circle"
          style={{ "--goal-progress": `${advice.goalProgress * 3.6}deg` }}
        >
            <span>{advice.goalProgress}%</span>
          </div>

          <div>
            <p>{advice.goalMetricLabel}</p>
            <strong>
              {formatCurrency(advice.goalCurrent)} /{" "}
              {formatCurrency(advice.goalTarget)}
            </strong>
          </div>
        </div>
      </section>

      <section className="snapshot-ribbon dashboard-reveal focus-section">
        <div>
          <span>Total Income</span>
          <strong>{formatCurrency(advice.totalIncome)}</strong>
          <small>Monthly after-tax income</small>
        </div>

        <div>
          <span>Monthly Costs</span>
          <strong>{formatCurrency(advice.totalExpenses)}</strong>
          <small>{advice.expenseRatio}% of income</small>
        </div>

        <div>
          <span>Money Left</span>
          <strong>{formatCurrency(advice.monthlyLeftover)}</strong>
          <small>{advice.savingsRate}% potential savings rate</small>
        </div>

        <div>
          <span>Health State</span>
          <strong>{advice.financialHealth}</strong>
          <small>Based on your profile</small>
        </div>
      </section>

      <section className="breakdown-section focus-section">
        <Card className="dashboard-reveal">
          <div className="card-title-row">
            <h3>Income Breakdown</h3>
            <Tooltip text="Your income includes salary, freelance work, side hustles, or any other monthly earnings." />
          </div>

          <div className="breakdown-row">
            <span>Salary</span>
            <strong>{formatCurrency(Number(user.monthlyIncome || 0))}</strong>
          </div>

          <div className="breakdown-row">
            <span>Side Income</span>
            <strong>{formatCurrency(Number(user.sideIncome || 0))}</strong>
          </div>

          <div className="breakdown-row total-row">
            <span>Total</span>
            <strong>{formatCurrency(advice.totalIncome)}</strong>
          </div>
        </Card>

        <Card className="dashboard-reveal">
          <div className="card-title-row">
            <h3>Fixed Costs Breakdown</h3>
            <Tooltip text="Fixed costs are the expenses you are likely to pay every month." />
          </div>

          <div className="breakdown-row">
            <span>Rent</span>
            <strong>{formatCurrency(Number(user.rent || 0))}</strong>
          </div>

          <div className="breakdown-row">
            <span>Car Payment</span>
            <strong>{formatCurrency(Number(user.carPayment || 0))}</strong>
          </div>

          <div className="breakdown-row">
            <span>Insurance</span>
            <strong>{formatCurrency(Number(user.insurance || 0))}</strong>
          </div>

          <div className="breakdown-row">
            <span>Medical Aid</span>
            <strong>{formatCurrency(Number(user.medicalAid || 0))}</strong>
          </div>

          <div className="breakdown-row">
            <span>Food & Eating Out</span>
            <strong>{formatCurrency(Number(user.food || 0))}</strong>
          </div>

          <div className="breakdown-row total-row">
            <span>Total Expenses</span>
            <strong>{formatCurrency(advice.totalExpenses)}</strong>
          </div>
        </Card>
      </section>

      <section
        className="money-editor-section dashboard-reveal focus-section"
        id="money-editor"
      >
        <div className="editor-intro">
          <p className="section-kicker">Money Profile Editor</p>
          <h2>Update the numbers behind your guidance.</h2>
          <p>
            This is not just a form. These values power your dashboard, profile,
            strategy recommendations, and simulation starting points.
          </p>
        </div>

        <Card className="money-editor-card">
          <div className="money-editor-grid">
            <div className="input-group floating-field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group floating-field">
              <label>Monthly Salary</label>
              <input
                type="number"
                name="monthlyIncome"
                value={user.monthlyIncome}
                onChange={handleChange}
              />
            </div>

            <div className="input-group floating-field">
              <label>Side Income</label>
              <input
                type="number"
                name="sideIncome"
                value={user.sideIncome}
                onChange={handleChange}
              />
            </div>

            <div className="input-group floating-field">
              <label>Rent</label>
              <input
                type="number"
                name="rent"
                value={user.rent}
                onChange={handleChange}
              />
            </div>

            <div className="input-group floating-field">
              <label>Car Payment</label>
              <input
                type="number"
                name="carPayment"
                value={user.carPayment}
                onChange={handleChange}
              />
            </div>

            <div className="input-group floating-field">
              <label>Insurance</label>
              <input
                type="number"
                name="insurance"
                value={user.insurance}
                onChange={handleChange}
              />
            </div>

            <div className="input-group floating-field">
              <label>Medical Aid</label>
              <input
                type="number"
                name="medicalAid"
                value={user.medicalAid}
                onChange={handleChange}
              />
            </div>

            <div className="input-group floating-field">
              <label>Subscriptions</label>
              <input
                type="number"
                name="subscriptions"
                value={user.subscriptions}
                onChange={handleChange}
              />
            </div>

            <div className="input-group floating-field">
              <label>Food</label>
              <input
                type="number"
                name="food"
                value={user.food}
                onChange={handleChange}
              />
            </div>

            <div className="input-group floating-field">
              <label>Debt</label>
              <input
                type="number"
                name="debt"
                value={user.debt}
                onChange={handleChange}
              />
            </div>

            <div className="input-group floating-field">
              <label>Current Savings</label>
              <input
                type="number"
                name="savings"
                value={user.savings}
                onChange={handleChange}
              />
            </div>

            <div className="input-group floating-field">
              <label>Current Goal</label>
              <select name="goal" value={user.goal} onChange={handleChange}>
                <option>Build an emergency fund</option>
                <option>Buy my first property</option>
                <option>Pay off debt</option>
                <option>Start investing consistently</option>
                <option>Balance lifestyle and investing</option>
              </select>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}

export default Dashboard;