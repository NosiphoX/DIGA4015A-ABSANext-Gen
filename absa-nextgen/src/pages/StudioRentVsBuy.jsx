import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Tooltip from "../components/Tooltip";
import { formatCurrency } from "../utils/formatters";
import useUser from "../context/useUser";

function StudioRentVsBuy() {
  const { user } = useUser();

  const [inputs, setInputs] = useState({
    monthlyIncome: user.monthlyIncome + user.sideIncome,
    propertyPrice: 1800000,
    monthlyRent: user.rent,
    depositPercent: 10,
    bondInterestRate: 11.5,
    investmentReturnRate: 8,
    yearlyPropertyGrowth: 5,
    years: 5,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputs((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const depositAmount = inputs.propertyPrice * (inputs.depositPercent / 100);
  const loanAmount = inputs.propertyPrice - depositAmount;

  const monthlyBond =
    (loanAmount * (inputs.bondInterestRate / 100)) / 12;

  const totalRentPaid = inputs.monthlyRent * 12 * inputs.years;
  const totalBondPaid = monthlyBond * 12 * inputs.years;

  const bondPercentOfIncome = Math.round(
    (monthlyBond / inputs.monthlyIncome) * 100
  );

  const rentPercentOfIncome = Math.round(
    (inputs.monthlyRent / inputs.monthlyIncome) * 100
  );

  const investableDifference = Math.max(monthlyBond - inputs.monthlyRent, 0);

  const futureInvestmentValue =
    investableDifference *
    12 *
    inputs.years *
    (1 + inputs.investmentReturnRate / 100);

  const futurePropertyValue =
    inputs.propertyPrice *
    Math.pow(1 + inputs.yearlyPropertyGrowth / 100, inputs.years);

  const estimatedBuyingOutcome = futurePropertyValue - loanAmount;

  const betterOption =
    futureInvestmentValue > estimatedBuyingOutcome
      ? "Renting + Investing"
      : "Buying";

  const difference = Math.abs(
    futureInvestmentValue - estimatedBuyingOutcome
  );

  const verdictMessage =
    betterOption === "Renting + Investing"
      ? `Renting and investing the difference may leave you ahead by about ${formatCurrency(
          difference
        )} after ${inputs.years} years.`
      : `Buying may leave you ahead by about ${formatCurrency(
          difference
        )} after ${inputs.years} years if property growth stays steady.`;

  let affordabilityMessage = "";
  let affordabilityType = "";

  if (bondPercentOfIncome > 35) {
    affordabilityType = "warning";
    affordabilityMessage =
      "This estimated bond is above 35% of your monthly income, which may place pressure on your cash flow.";
  } else if (bondPercentOfIncome > 25) {
    affordabilityType = "moderate";
    affordabilityMessage =
      "This bond may still be manageable, but it could reduce flexibility for saving, investing, and emergencies.";
  } else {
    affordabilityType = "good";
    affordabilityMessage =
      "This bond appears relatively manageable based on your current income assumptions.";
  }

  const recommendedTrack =
    betterOption === "Buying"
      ? "First Property Path"
      : "Balanced Lifestyle & Investing";

  return (
    <div>
      <section className="page-header">
        <p className="hero-label">Simulation Studio</p>
        <h1>Rent vs Buy in Johannesburg</h1>
        <p>
          These starting values were pulled from your Money Snapshot so this
          scenario begins closer to your real financial situation.
        </p>
      </section>

      <div className="context-banner">
        <div>
          <h4>Connected to your profile</h4>
          <p>
            Your current rent and income from the dashboard have already been
            used here as the starting point.
          </p>
        </div>
      </div>

      <div className="studio-detail-layout">
        <div className="studio-inputs">
          <Card>
            <div className="card-title-row">
              <h3>Scenario Inputs</h3>
              <Tooltip text="Adjust these assumptions to test how the outcome changes." />
            </div>

            <div className="input-grid">
              <div className="input-group">
                <label>Monthly Income</label>
                <input
                  type="number"
                  name="monthlyIncome"
                  value={inputs.monthlyIncome}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Property Price</label>
                <input
                  type="number"
                  name="propertyPrice"
                  value={inputs.propertyPrice}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Monthly Rent</label>
                <input
                  type="number"
                  name="monthlyRent"
                  value={inputs.monthlyRent}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Deposit %</label>
                <input
                  type="number"
                  name="depositPercent"
                  value={inputs.depositPercent}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Bond Interest Rate %</label>
                <input
                  type="number"
                  step="0.1"
                  name="bondInterestRate"
                  value={inputs.bondInterestRate}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Investment Return %</label>
                <input
                  type="number"
                  step="0.1"
                  name="investmentReturnRate"
                  value={inputs.investmentReturnRate}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Property Growth %</label>
                <input
                  type="number"
                  step="0.1"
                  name="yearlyPropertyGrowth"
                  value={inputs.yearlyPropertyGrowth}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Years</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  name="years"
                  value={inputs.years}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Card>

          <Card>
            <h3>Educational Notes</h3>

            <div className="education-stack">
              <div className="education-note">
                <h4>Deposit</h4>
                <p>
                  A larger deposit reduces the loan amount and can make a bond
                  more affordable over time.
                </p>
              </div>

              <div className="education-note">
                <h4>Bond vs Rent</h4>
                <p>
                  A cheaper rent can leave more room to invest monthly, while
                  buying may help you build asset value if property prices grow.
                </p>
              </div>

              <div className="education-note">
                <h4>Johannesburg Reality</h4>
                <p>
                  In Johannesburg, property decisions are often shaped by
                  deposit size, monthly affordability, bond rates, and whether
                  you want flexibility or long-term ownership.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="studio-results">
          <Card>
            <div className="card-title-row">
              <h3>Scenario Summary</h3>
              <Tooltip text="These figures are calculated from your current assumptions." />
            </div>

            <div className="breakdown-row">
              <span>Deposit Amount</span>
              <strong>{formatCurrency(depositAmount)}</strong>
            </div>

            <div className="breakdown-row">
              <span>Estimated Monthly Bond</span>
              <strong>{formatCurrency(monthlyBond)}</strong>
            </div>

            <div className="breakdown-row">
              <span>Rent as % of Income</span>
              <strong>{rentPercentOfIncome}%</strong>
            </div>

            <div className="breakdown-row">
              <span>Bond as % of Income</span>
              <strong>{bondPercentOfIncome}%</strong>
            </div>

            <div className="breakdown-row">
              <span>Total Rent Paid</span>
              <strong>{formatCurrency(totalRentPaid)}</strong>
            </div>

            <div className="breakdown-row">
              <span>Total Bond Paid</span>
              <strong>{formatCurrency(totalBondPaid)}</strong>
            </div>

            <div className="breakdown-row">
              <span>Future Property Value</span>
              <strong>{formatCurrency(futurePropertyValue)}</strong>
            </div>

            <div className="breakdown-row total-row">
              <span>Rent + Invest Outcome</span>
              <strong>{formatCurrency(futureInvestmentValue)}</strong>
            </div>
          </Card>

          <Card className={`affordability-card ${affordabilityType}`}>
            <h3>Affordability Check</h3>
            <p className="insight-text">{affordabilityMessage}</p>
          </Card>

          <Card>
            <h3>Studio Verdict</h3>
            <p className="verdict-badge">{betterOption}</p>
            <p className="insight-text">{verdictMessage}</p>
          </Card>

          <Card>
            <h3>Recommended Next Step</h3>
            <p className="recommendation-title">{recommendedTrack}</p>

            {recommendedTrack === "First Property Path" && (
              <p>
                This result suggests that ownership may fit your direction
                better, so the next useful step is to follow a structured path
                towards deposit savings and affordability planning.
              </p>
            )}

            {recommendedTrack === "Balanced Lifestyle & Investing" && (
              <p>
                This result suggests that flexibility plus investing may suit
                your current position better, especially if buying would put too
                much pressure on monthly cash flow.
              </p>
            )}

            <div className="quick-actions">
              <Link to="/tracks" className="primary-btn dashboard-btn">
                View Strategy Tracks
              </Link>

              <Link
                to="/dashboard"
                className="secondary-btn dashboard-btn secondary-dark"
              >
                Back to Money Snapshot
              </Link>
            </div>
          </Card>

          <Card>
            <h3>What This Means</h3>
            <p>
              This result is not a guarantee. It is a planning tool that helps
              you understand the trade-off between flexibility, ownership, and
              long-term growth based on your current assumptions.
            </p>
            <p>
              If renting is much cheaper than buying, investing the difference
              may strengthen your position. If you can comfortably manage the
              bond and property growth is steady, buying may become more
              attractive.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default StudioRentVsBuy;