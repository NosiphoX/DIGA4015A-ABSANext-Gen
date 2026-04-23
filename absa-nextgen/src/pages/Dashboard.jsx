import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Tooltip from "../components/Tooltip";
import { formatCurrency } from "../utils/formatters";
import  useUser from "../context/useUser";

function Dashboard() {
  const [showBanner, setShowBanner] = useState(true);
  const { user, setUser } = useUser();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: name === "name" || name === "goal" ? value : Number(value),
    }));
  };

  const totalIncome = user.monthlyIncome + user.sideIncome;

  const totalExpenses =
    user.rent +
    user.carPayment +
    user.insurance +
    user.medicalAid +
    user.subscriptions +
    user.food;

  const monthlyLeftover = totalIncome - totalExpenses;

  const savingsRate =
    totalIncome > 0 ? Math.round((monthlyLeftover / totalIncome) * 100) : 0;

  const expenseRatio =
    totalIncome > 0 ? Math.round((totalExpenses / totalIncome) * 100) : 0;

  const financialHealth =
    savingsRate >= 20
      ? "Strong"
      : savingsRate >= 10
      ? "Moderate"
      : "Needs Attention";

  const recommendedTrack =
    user.debt > 10000
      ? "Financial Reset & Foundation Builder"
      : user.rent > 10000
      ? "First Property Path"
      : "Balanced Lifestyle & Investing";

  const goalProgress = Math.max(
    0,
    Math.min(Math.round((monthlyLeftover / 5000) * 100), 100)
  );

  let insightMessage = "";
  let insightDetails = "";

  if (savingsRate < 10) {
    insightMessage =
      "You are saving less than 10% of your income. This could leave you financially vulnerable.";

    insightDetails =
      "A healthy starting point is to save at least 10% to 20% of your monthly income. Building an emergency fund should come before aggressive investing.";
  } else if (user.debt > 10000) {
    insightMessage =
      "Your debt level is high compared to your savings. Reducing debt should be a priority.";

    insightDetails =
      "High-interest debt such as credit cards can grow quickly over time and reduce your ability to invest or save for bigger goals.";
  } else {
    insightMessage =
      "You are making healthy progress and have a good balance between spending and saving.";

    insightDetails =
      "Keep building consistency by maintaining your savings habits and gradually increasing investment contributions.";
  }

  return (
    <div>
      <Card className="input-card">
        <div className="page-header">
          <h2>Edit Your Financial Details</h2>
          <p>
            Update your monthly income, expenses, debt, and goals to generate a
            more personalised financial snapshot.
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
            <label>Current Goal</label>
            <input
              type="text"
              name="goal"
              value={user.goal}
              onChange={handleChange}
            />
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
          <h2>{formatCurrency(totalIncome)}</h2>
          <p>Monthly after-tax income</p>
        </Card>

        <Card>
          <div className="card-title-row">
            <h3>Monthly Costs</h3>
            <Tooltip text="These are your fixed monthly expenses like rent, transport, food, and insurance." />
          </div>
          <h2>{formatCurrency(totalExpenses)}</h2>
          <p>{expenseRatio}% of your income</p>
        </Card>

        <Card>
          <div className="card-title-row">
            <h3>Money Left Over</h3>
            <Tooltip text="This is the amount remaining after all your monthly expenses are paid." />
          </div>
          <h2>{formatCurrency(monthlyLeftover)}</h2>
          <p>{savingsRate}% potential savings rate</p>
        </Card>

        <Card>
          <div className="card-title-row">
            <h3>Financial Health</h3>
            <Tooltip text="This score is based on your savings rate, debt level, and monthly costs." />
          </div>
          <h2>{financialHealth}</h2>
          <p>
            {financialHealth === "Strong"
              ? "You are in a healthy position."
              : financialHealth === "Moderate"
              ? "You are doing okay but could improve."
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
              <strong>{formatCurrency(totalIncome)}</strong>
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
              <strong>{formatCurrency(totalExpenses)}</strong>
            </div>
          </Card>
        </div>

        <div className="dashboard-sidebar">
          <Card>
            <div className="card-title-row">
              <h3>Financial Insight</h3>
              <Tooltip text="These insights are generated based on your savings rate, debt, and expenses." />
            </div>

            <p className="insight-text">{insightMessage}</p>

            <details>
              <summary>Learn More</summary>
              <p>{insightDetails}</p>
            </details>
          </Card>

          <Card>
            <h3>Recommended Strategy Track</h3>

            <p className="recommendation-title">{recommendedTrack}</p>

            {recommendedTrack === "Financial Reset & Foundation Builder" && (
              <p>
                Your debt levels are high relative to your savings. Focus on
                reducing debt and building an emergency fund first.
              </p>
            )}

            {recommendedTrack === "First Property Path" && (
              <p>
                Your rental costs are high, which may mean you are ready to
                start planning for a home deposit and future bond affordability.
              </p>
            )}

            {recommendedTrack === "Balanced Lifestyle & Investing" && (
              <p>
                Your spending is relatively balanced, which means you can begin
                focusing on long-term investing and wealth growth.
              </p>
            )}
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