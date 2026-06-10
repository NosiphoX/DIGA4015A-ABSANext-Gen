import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Card from "../components/Card";
import Tooltip from "../components/Tooltip";
import { formatCurrency } from "../utils/formatters";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function CarFinanceVsInvest() {
  const studioRef = useRef(null);

  const [values, setValues] = useState({
    carPrice: 350000,
    deposit: 50000,
    interestRate: 14,
    financeYears: 5,
    cheaperCarPrice: 180000,
    investmentReturn: 10,
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

    setValues((prevValues) => ({
      ...prevValues,
      [name]: Number(value),
    }));
  };

  const months = Math.max(values.financeYears * 12, 1);
  const monthlyInterestRate = values.interestRate / 100 / 12;

  const loanAmount = Math.max(values.carPrice - values.deposit, 0);
  const cheaperLoanAmount = Math.max(
    values.cheaperCarPrice - values.deposit,
    0
  );

  const calculateMonthlyPayment = (amount) => {
    if (amount <= 0) return 0;

    if (monthlyInterestRate === 0) {
      return amount / months;
    }

    return (
      amount *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) /
      (Math.pow(1 + monthlyInterestRate, months) - 1)
    );
  };

  const premiumCarPayment = calculateMonthlyPayment(loanAmount);
  const cheaperCarPayment = calculateMonthlyPayment(cheaperLoanAmount);
  const monthlyDifference = Math.max(premiumCarPayment - cheaperCarPayment, 0);

  const monthlyReturn = values.investmentReturn / 100 / 12;

  const investedDifference =
    monthlyReturn === 0
      ? monthlyDifference * months
      : monthlyDifference *
        ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn);

  const premiumTotalPaid = premiumCarPayment * months + values.deposit;
  const cheaperTotalPaid = cheaperCarPayment * months + values.deposit;
  const totalCostDifference = Math.max(premiumTotalPaid - cheaperTotalPaid, 0);

  const wealthGap = investedDifference + totalCostDifference;

  const verdict =
    wealthGap > 100000
      ? "The cheaper car plus investing path may create much stronger long-term flexibility."
      : wealthGap > 30000
      ? "The cheaper car path still gives you a meaningful advantage over time."
      : "The difference is smaller, so lifestyle preference may matter more in this scenario.";

  return (
    <main className="studio-detail-experience" ref={studioRef}>
      <section className="studio-hero studio-reveal studio-focus-section">
        <div>
          <p className="section-kicker">Lifestyle Simulation</p>
          <h1>Car Finance vs Invest</h1>
          <p>
            Test the trade-off between financing a more expensive car and
            choosing a cheaper car while investing the monthly difference.
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
          <span>Possible Wealth Gap</span>
          <strong>{formatCurrency(wealthGap)}</strong>
          <small>over {values.financeYears} years</small>
        </div>
      </section>

      <section className="studio-detail-layout studio-focus-section">
        <div className="studio-inputs">
          <Card className="studio-reveal studio-control-card">
            <div className="card-title-row">
              <h3>Scenario Controls</h3>
              <Tooltip text="Adjust the values to compare a car finance decision against investing the difference." />
            </div>

            <div className="studio-control-grid">
              <div className="input-group floating-field">
                <label>Premium Car Price</label>
                <input
                  type="number"
                  name="carPrice"
                  value={values.carPrice}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group floating-field">
                <label>Deposit</label>
                <input
                  type="number"
                  name="deposit"
                  value={values.deposit}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group floating-field">
                <label>Interest Rate %</label>
                <input
                  type="number"
                  name="interestRate"
                  value={values.interestRate}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group floating-field">
                <label>Finance Years</label>
                <input
                  type="number"
                  name="financeYears"
                  value={values.financeYears}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group floating-field">
                <label>Cheaper Car Price</label>
                <input
                  type="number"
                  name="cheaperCarPrice"
                  value={values.cheaperCarPrice}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group floating-field">
                <label>Investment Return %</label>
                <input
                  type="number"
                  name="investmentReturn"
                  value={values.investmentReturn}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Card>
        </div>

        <aside className="studio-results">
          <Card className="studio-reveal verdict-card">
            <p className="section-kicker">Verdict</p>
            <h2>{verdict}</h2>
          </Card>

          <Card className="studio-reveal">
            <h3>Monthly Comparison</h3>

            <div className="breakdown-row">
              <span>Premium car payment</span>
              <strong>{formatCurrency(premiumCarPayment)}</strong>
            </div>

            <div className="breakdown-row">
              <span>Cheaper car payment</span>
              <strong>{formatCurrency(cheaperCarPayment)}</strong>
            </div>

            <div className="breakdown-row total-row">
              <span>Monthly difference invested</span>
              <strong>{formatCurrency(monthlyDifference)}</strong>
            </div>
          </Card>

          <Card className="studio-reveal">
            <h3>Projected Investment Value</h3>
            <h2>{formatCurrency(investedDifference)}</h2>
            <p>
              This estimates the future value of investing the monthly car
              payment difference over the finance period.
            </p>
          </Card>
        </aside>
      </section>
    </main>
  );
}

export default CarFinanceVsInvest;