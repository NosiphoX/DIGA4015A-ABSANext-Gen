import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Card from "../components/Card";
import Tooltip from "../components/Tooltip";
import { formatCurrency } from "../utils/formatters";
import useUser from "../context/useUser";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function StudioRentVsBuy() {
  const studioRef = useRef(null);
  const { user } = useUser();

  const [inputs, setInputs] = useState({
    monthlyIncome: Number(user.monthlyIncome || 0) + Number(user.sideIncome || 0),
    propertyPrice: 1800000,
    monthlyRent: Number(user.rent || 0),
    depositPercent: 10,
    bondInterestRate: 11.5,
    investmentReturnRate: 8,
    yearlyPropertyGrowth: 5,
    years: 5,
  });

  useGSAP(
    () => {
      gsap.from(".studio-reveal", {
        opacity: 0,
        y: 30,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.utils.toArray(".studio-focus-section").forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0.5,
            y: 34,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 86%",
              end: "top 45%",
              scrub: true,
            },
          }
        );

        gsap.to(section, {
          opacity: 0.4,
          y: -18,
          filter: "blur(2px)",
          scrollTrigger: {
            trigger: section,
            start: "bottom 35%",
            end: "bottom 10%",
            scrub: true,
          },
        });
      });
    },
    { scope: studioRef }
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: Number(value),
    }));
  };

  const depositAmount = inputs.propertyPrice * (inputs.depositPercent / 100);
  const loanAmount = Math.max(inputs.propertyPrice - depositAmount, 0);
  const months = Math.max(inputs.years * 12, 1);

  const monthlyBondRate = inputs.bondInterestRate / 100 / 12;

  const monthlyBond =
    loanAmount <= 0
      ? 0
      : monthlyBondRate === 0
      ? loanAmount / months
      : loanAmount *
        (monthlyBondRate * Math.pow(1 + monthlyBondRate, months)) /
        (Math.pow(1 + monthlyBondRate, months) - 1);

  const totalRentPaid = inputs.monthlyRent * months;
  const totalBondPaid = monthlyBond * months;

  const bondPercentOfIncome =
    inputs.monthlyIncome > 0
      ? Math.round((monthlyBond / inputs.monthlyIncome) * 100)
      : 0;

  const rentPercentOfIncome =
    inputs.monthlyIncome > 0
      ? Math.round((inputs.monthlyRent / inputs.monthlyIncome) * 100)
      : 0;

  const investableDifference = Math.max(monthlyBond - inputs.monthlyRent, 0);
  const monthlyInvestmentReturn = inputs.investmentReturnRate / 100 / 12;

  const futureInvestmentValue =
    monthlyInvestmentReturn === 0
      ? investableDifference * months
      : investableDifference *
        ((Math.pow(1 + monthlyInvestmentReturn, months) - 1) /
          monthlyInvestmentReturn);

  const futurePropertyValue =
    inputs.propertyPrice *
    Math.pow(1 + inputs.yearlyPropertyGrowth / 100, inputs.years);

  const estimatedBuyingOutcome = futurePropertyValue - loanAmount;
  const betterOption =
    futureInvestmentValue > estimatedBuyingOutcome
      ? "Renting + Investing"
      : "Buying";

  const difference = Math.abs(futureInvestmentValue - estimatedBuyingOutcome);

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
    <main className="studio-detail-experience" ref={studioRef}>
      <section className="studio-hero studio-reveal studio-focus-section">
        <div>
          <p className="section-kicker">Property Simulation</p>
          <h1>Rent vs Buy in Johannesburg</h1>
          <p>
            Compare the cost of renting and investing against buying a property.
            This studio uses your Money Snapshot as a starting point, then lets
            you test different property, rent, bond, and growth assumptions.
          </p>

          <div className="hero-action-row">
            <Link to="/simulation" className="secondary-btn secondary-dark">
              Back to Simulation Lab
            </Link>

            <Link to="/tracks" className="primary-btn">
              View Strategy Tracks
            </Link>
          </div>
        </div>

        <div className="simulation-orb">
          <span>Better Path</span>
          <strong>{betterOption}</strong>
          <small>{formatCurrency(difference)} difference</small>
        </div>
      </section>

      <section className="studio-profile-panel studio-reveal studio-focus-section">
        <div>
          <p className="section-kicker">Connected to your profile</p>
          <h2>Your starting values are personalised.</h2>
          <p>
            Your current rent and income from the dashboard have already been
            used as the starting point. You can still adjust every assumption to
            test different scenarios.
          </p>
        </div>

        <div className="simulation-mini-stats">
          <div>
            <span>Starting Income</span>
            <strong>{formatCurrency(inputs.monthlyIncome)}</strong>
          </div>

          <div>
            <span>Current Rent</span>
            <strong>{formatCurrency(inputs.monthlyRent)}</strong>
          </div>

          <div>
            <span>Deposit</span>
            <strong>{formatCurrency(depositAmount)}</strong>
          </div>
        </div>
      </section>

      <section className="studio-detail-layout studio-focus-section">
        <div className="studio-inputs">
          <Card className="studio-reveal studio-control-card">
            <div className="card-title-row">
              <h3>Scenario Controls</h3>
              <Tooltip text="Adjust these assumptions to test how the rent vs buy outcome changes." />
            </div>

            <div className="studio-control-grid">
              <div className="input-group floating-field">
                <label>Monthly Income</label>
                <input
                  type="number"
                  name="monthlyIncome"
                  value={inputs.monthlyIncome}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group floating-field">
                <label>Property Price</label>
                <input
                  type="number"
                  name="propertyPrice"
                  value={inputs.propertyPrice}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group floating-field">
                <label>Monthly Rent</label>
                <input
                  type="number"
                  name="monthlyRent"
                  value={inputs.monthlyRent}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group floating-field">
                <label>Deposit %</label>
                <input
                  type="number"
                  name="depositPercent"
                  value={inputs.depositPercent}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group floating-field">
                <label>Bond Interest Rate %</label>
                <input
                  type="number"
                  step="0.1"
                  name="bondInterestRate"
                  value={inputs.bondInterestRate}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group floating-field">
                <label>Investment Return %</label>
                <input
                  type="number"
                  step="0.1"
                  name="investmentReturnRate"
                  value={inputs.investmentReturnRate}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group floating-field">
                <label>Property Growth %</label>
                <input
                  type="number"
                  step="0.1"
                  name="yearlyPropertyGrowth"
                  value={inputs.yearlyPropertyGrowth}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group floating-field">
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

          <Card className="studio-reveal">
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

        <aside className="studio-results">
          <Card className="studio-reveal verdict-card">
            <p className="section-kicker">Studio Verdict</p>
            <h2>{verdictMessage}</h2>
          </Card>

          <Card className={`studio-reveal affordability-card ${affordabilityType}`}>
            <h3>Affordability Check</h3>
            <p className="insight-text">{affordabilityMessage}</p>
          </Card>

          <Card className="studio-reveal">
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

          <Card className="studio-reveal">
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

          <Card className="studio-reveal">
            <h3>What This Means</h3>
            <p>
              This result is not a guarantee. It is a planning tool that helps
              you understand the trade-off between flexibility, ownership, and
              long-term growth based on your current assumptions.
            </p>
          </Card>
        </aside>
      </section>
    </main>
  );
}

export default StudioRentVsBuy;