import Card from "../components/Card";
import useUser from "../context/useUser";
import { formatCurrency } from "../utils/formatters";

function Profile() {
  const { user } = useUser();

  const totalIncome = user.monthlyIncome + user.sideIncome;
  const totalExpenses =
    user.rent +
    user.carPayment +
    user.insurance +
    user.medicalAid +
    user.subscriptions +
    user.food;

  const monthlyLeftover = totalIncome - totalExpenses;

  return (
    <div>
      <section className="page-header">
        <p className="hero-label">Profile</p>
        <h1>Your Financial Profile</h1>
        <p>
          This page gives you a quick summary of the information currently being
          used across your Money Snapshot, Strategy Tracks, and Simulation Lab.
        </p>
      </section>

      <div className="profile-grid">
        <Card>
          <h3>Personal Details</h3>
          <div className="breakdown-row">
            <span>Name</span>
            <strong>{user.name}</strong>
          </div>
          <div className="breakdown-row">
            <span>Current Goal</span>
            <strong>{user.goal}</strong>
          </div>
        </Card>

        <Card>
          <h3>Income Summary</h3>
          <div className="breakdown-row">
            <span>Salary</span>
            <strong>{formatCurrency(user.monthlyIncome)}</strong>
          </div>
          <div className="breakdown-row">
            <span>Side Income</span>
            <strong>{formatCurrency(user.sideIncome)}</strong>
          </div>
          <div className="breakdown-row total-row">
            <span>Total Income</span>
            <strong>{formatCurrency(totalIncome)}</strong>
          </div>
        </Card>

        <Card>
          <h3>Financial Position</h3>
          <div className="breakdown-row">
            <span>Total Expenses</span>
            <strong>{formatCurrency(totalExpenses)}</strong>
          </div>
          <div className="breakdown-row">
            <span>Debt</span>
            <strong>{formatCurrency(user.debt)}</strong>
          </div>
          <div className="breakdown-row total-row">
            <span>Money Left Over</span>
            <strong>{formatCurrency(monthlyLeftover)}</strong>
          </div>
        </Card>
      </div>

      <Card>
        <h3>Why this page matters</h3>
        <p>
          Your profile acts as the foundation for the rest of the product. The
          values entered on your dashboard can influence your track guidance and
          your simulation starting points.
        </p>
      </Card>
    </div>
  );
}

export default Profile;