import { useState } from "react";
import Card from "../components/Card";
import Tooltip from "../components/Tooltip";
import { formatCurrency } from "../utils/formatters";

function StudioRentVsBuy() {
  const [inputs, setInputs] = useState({
    monthlyIncome: 45000,
    propertyPrice: 1800000,
    monthlyRent: 12000,
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

  const rentInvestDifference = Math.max(monthlyBond - inputs.monthlyRent, 0);

  const investedDifference =
    rentInvestDifference *
    12 *
    inputs.years *
    (1 + inputs.investmentReturnRate / 100);

  const futurePropertyValue =
    inputs.propertyPrice *
    Math.pow(1 + inputs.yearlyPropertyGrowth / 100, inputs.years);

  const estimatedPropertyGain = futurePropertyValue - loanAmount;

  const betterOption =
    investedDifference > estimatedPropertyGain ? "Renting + Investing" : "Buying";

  const verdictMessage =
    betterOption === "Renting + Investing"
      ? `Renting and investing the monthly difference could leave you ahead by about ${formatCurrency(
          investedDifference - estimatedPropertyGain
        )} after ${inputs.years} years.`
      : `Buying could leave you ahead by about ${formatCurrency(
          estimatedPropertyGain - investedDifference
        )} after ${inputs.years} years if property growth stays steady.`;

  return (
    <div>
      <section className="page-header">
        <p className="hero-label">Simulation Studio</p>
        <h1>Rent vs Buy in Johannesburg</h1>
        <p>
          Compare the cost of renting versus buying a property over time and see
          which option may leave you in a stronger position.
        </p>
      </section>

      <div className="context-banner">
        <div>
          <h4>About this studio</h4>
          <p>
            This simulation compares two scenarios over {inputs.years} years.
            Adjust the values to see how your housing choice could affect your
            future wealth.
          </p>
        </div>
      </div>

      <div className="studio-detail-layout">
        <div className="studio-inputs">
          <Card>
            <div className="card-title-row">
              <h3>Scenario Inputs</h3>
              <Tooltip text="Adjust these values to explore different Johannesburg housing scenarios." />
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
                  name="years"
                  min="1"
                  max="10"
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
                  A larger deposit lowers the loan amount and can make buying
                  more affordable in the long run.
                </p>
              </div>

              <div className="education-note">
                <h4>Bond vs Rent</h4>
                <p>
                  A lower monthly rent may free up money to invest, but buying
                  may build long-term asset value if property prices grow.
                </p>
              </div>

              <div className="education-note">
                <h4>South African Reality</h4>
                <p>
                  In Johannesburg, property affordability depends heavily on
                  deposit size, bond rates, and whether your monthly cash flow
                  can absorb ownership costs.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="studio-results">
          <Card>
            <div className="card-title-row">
              <h3>Scenario Summary</h3>
              <Tooltip text="These are the main figures calculated from your current assumptions." />
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
              <span>Rent + Invest Value</span>
              <strong>{formatCurrency(investedDifference)}</strong>
            </div>
          </Card>

          <Card>
            <h3>Studio Verdict</h3>
            <p className="verdict-badge">{betterOption}</p>
            <p className="insight-text">{verdictMessage}</p>
          </Card>

          <Card>
            <h3>What This Means</h3>
            <p>
              This result does not mean one option is always better. It shows
              how your current assumptions affect the trade-off between
              flexibility, ownership, and long-term growth.
            </p>
            <p>
              If your rent is much lower than a bond, renting may leave more
              room to invest. If property growth is strong and you can manage
              the bond comfortably, buying may become more attractive.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default StudioRentVsBuy;