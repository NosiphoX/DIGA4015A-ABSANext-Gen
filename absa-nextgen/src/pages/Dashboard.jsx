import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Tooltip from "../components/Tooltip";
import { formatCurrency } from "../utils/formatters";
import { getFinancialAdvice } from "../utils/financialAdvice";
import useUser from "../context/useUser";

function Dashboard() {
  const [showBanner, setShowBanner] = useState(true);
  const { user, setUser } = useUser();

  const advice = getFinancialAdvice(user);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const textFields = ["name", "goal", "riskStyle", "financialPersonality"];

    setUser((prevUser) => ({
      ...prevUser,
      [name]: textFields.includes(name) ? value : Number(value),
    }));
  };

  const goalProgress = Math.max(
    0,
    Math.min(Math.round((advice.monthlyLeftover / 5000) * 100), 100)
  );

  return (
    <div>
      <Card className="input-card">
        <div className="page-header">
          <h2>Edit Your Financial Details</h2>
          <p>
            Update your monthly income, expenses, debt, savings, and goals to
            generate a more personalised financial snapshot.
          </p>
        </div>

        <div className="input-grid">
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Monthly Salary</label>
            <input
              type="number"
              name="monthlyIncome"
              value={user.monthlyIncome}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Side Income</label>
            <input
              type="number"
              name="sideIncome"
              value={user.sideIncome}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Rent</label>
            <input
              type="number"
              name="rent"
              value={user.rent}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Car Payment</label>
            <input
              type="number"
              name="carPayment"
              value={user.carPayment}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Insurance</label>
            <input
              type="number"
              name="insurance"
              value={user.insurance}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Medical Aid</label>
            <input
              type="number"
              name="medicalAid"
              value={user.medicalAid}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Subscriptions</label>
            <input
              type="number"
              name="subscriptions"
              value={user.subscriptions}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Food</label>
            <input
              type="number"
              name="food"
              value={user.food}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Debt</label>
            <input
              type="number"
              name="debt"
              value={user.debt}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Current Savings</label>
            <input
              type="number"
              name="savings"
              value={user.savings}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
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

      <div className="page-header dashboard-header">
        <div>
          <p className="dashboard-date">23 April 2026</p>
          <h2>Hello, {user.name}</h2>
          <p>
            Here is your current financial snapshot and what deserves your
            attention right now.
          </p>
        </div>
      </div>

      {showBanner && (
        <div className="context-banner">
          <div>
            <h4>Welcome to your Money Snapshot</h4>
            <p>
              This dashboard gives you a quick overview of your income,
              spending, savings, debt, and financial progress.
            </p>
          </div>

          <button onClick={() => setShowBanner(false)}>Dismiss</button>
        </div>
      )}

      <div className="snapshot-grid">
        <Card>
          <div className="card-title-row">
            <h3>Total Income</h3>
            <Tooltip text="This includes your salary and any extra monthly income after tax." />
          </div>
          <h2>{formatCurrency(advice.totalIncome)}</h2>
          <p>Monthly after-tax income</p>
        </Card>

        <Card>
          <div className="card-title-row">
            <h3>Monthly Costs</h3>
            <Tooltip text="These are your fixed monthly expenses like rent, transport, food, and insurance." />
          </div>
          <h2>{formatCurrency(advice.totalExpenses)}</h2>
          <p>{advice.expenseRatio}% of your income</p>
        </Card>

        <Card>
          <div className="card-title-row">
            <h3>Money Left Over</h3>
            <Tooltip text="This is the amount remaining after all your monthly expenses are paid." />
          </div>
          <h2>{formatCurrency(advice.monthlyLeftover)}</h2>
          <p>{advice.savingsRate}% potential savings rate</p>
        </Card>

        <Card>
          <div className="card-title-row">
            <h3>Financial Health</h3>
            <Tooltip text="This score is based on your savings rate, debt level, and monthly costs." />
          </div>
          <h2>{advice.financialHealth}</h2>
          <p>
            {advice.financialHealth === "Strong"
              ? "You are in a healthy position."
              : advice.financialHealth === "Moderate"
              ? "You are doing okay, but there is room to improve."
              : "Your finances may need attention."}
          </p>
        </Card>

        <Card>
          <div className="card-title-row">
            <h3>Current Goal</h3>
            <Tooltip text="Goals help you focus your money on a specific outcome instead of spending without direction." />
          </div>

          <h2>{user.goal}</h2>
          <p>{goalProgress}% of your monthly target reached</p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${goalProgress}%` }}
            ></div>
          </div>
        </Card>
      </div>

      <div className="dashboard-layout">
        <div className="dashboard-main">
          <Card>
            <div className="card-title-row">
              <h3>Income Breakdown</h3>
              <Tooltip text="Your income includes salary, freelance work, side hustles, or any other monthly earnings." />
            </div>

            <div className="breakdown-row">
              <span>Salary</span>
              <strong>{formatCurrency(user.monthlyIncome)}</strong>
            </div>

            <div className="breakdown-row">
              <span>Side Income</span>
              <strong>{formatCurrency(user.sideIncome)}</strong>
            </div>

            <div className="breakdown-row total-row">
              <span>Total</span>
              <strong>{formatCurrency(advice.totalIncome)}</strong>
            </div>
          </Card>

          <Card>
            <div className="card-title-row">
              <h3>Fixed Costs Breakdown</h3>
              <Tooltip text="Fixed costs are the expenses you are likely to pay every month." />
            </div>

            <div className="breakdown-row">
              <span>Rent</span>
              <strong>{formatCurrency(user.rent)}</strong>
            </div>

            <div className="breakdown-row">
              <span>Car Payment</span>
              <strong>{formatCurrency(user.carPayment)}</strong>
            </div>

            <div className="breakdown-row">
              <span>Insurance</span>
              <strong>{formatCurrency(user.insurance)}</strong>
            </div>

            <div className="breakdown-row">
              <span>Medical Aid</span>
              <strong>{formatCurrency(user.medicalAid)}</strong>
            </div>

            <div className="breakdown-row">
              <span>Food & Eating Out</span>
              <strong>{formatCurrency(user.food)}</strong>
            </div>

            <div className="breakdown-row total-row">
              <span>Total Expenses</span>
              <strong>{formatCurrency(advice.totalExpenses)}</strong>
            </div>
          </Card>
        </div>

        <div className="dashboard-sidebar">
          <Card className={`insight-card ${advice.insightState}`}>
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

          <Card className="recommended-track-card">
            <div className="card-title-row">
              <h3>Recommended Strategy Track</h3>
              <Tooltip text="This recommendation changes based on your current financial profile and goal." />
            </div>

            <p className="recommendation-title">{advice.recommendedTrack}</p>
            <p>{advice.recommendedTrackMessage}</p>
          </Card>

          <Card>
            <h3>Quick Actions</h3>

            <div className="quick-actions">
              <Link to="/tracks" className="primary-btn dashboard-btn">
                View Strategy Tracks
              </Link>

              <Link
                to="/simulation"
                className="secondary-btn dashboard-btn secondary-dark"
              >
                Open Simulation Lab
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;