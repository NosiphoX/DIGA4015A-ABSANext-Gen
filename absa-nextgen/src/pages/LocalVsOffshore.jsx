import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Card from "../components/Card";
import Tooltip from "../components/Tooltip";
import { formatCurrency } from "../utils/formatters";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function LocalVsOffshore() {
  const studioRef = useRef(null);

  const [values, setValues] = useState({
    monthlyInvestment: 2500,
    years: 5,
    localReturn: 9,
    offshoreReturn: 7,
    randWeakening: 4,
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

  const months = Math.max(values.years * 12, 1);

  const calculateFutureValue = (monthlyAmount, annualReturn) => {
    const monthlyReturn = annualReturn / 100 / 12;

    if (monthlyReturn === 0) {
      return monthlyAmount * months;
    }

    return (
      monthlyAmount *
      ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn)
    );
  };

  const localValue = calculateFutureValue(
    values.monthlyInvestment,
    values.localReturn
  );

  const offshoreGrowthValue = calculateFutureValue(
    values.monthlyInvestment,
    values.offshoreReturn
  );

  const currencyEffect =
    offshoreGrowthValue * Math.pow(1 + values.randWeakening / 100, values.years);

  const difference = currencyEffect - localValue;

  const verdict =
    difference > 0
      ? "The offshore scenario performs better in this setup, mainly because currency movement adds to the investment growth."
      : "The local scenario performs better in this setup, which means stronger local returns can outweigh offshore currency benefits.";

  return (
    <main className="studio-detail-experience" ref={studioRef}>
      <section className="studio-hero studio-reveal studio-focus-section">
        <div>
          <p className="section-kicker">Investing Simulation</p>
          <h1>Local vs Offshore Investing</h1>
          <p>
            Compare a local investment path with an offshore path by adjusting
            expected returns and the possible impact of rand weakness.
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
          <span>Difference</span>
          <strong>{formatCurrency(Math.abs(difference))}</strong>
          <small>{difference >= 0 ? "offshore ahead" : "local ahead"}</small>
        </div>
      </section>

      <section className="studio-detail-layout studio-focus-section">
        <div className="studio-inputs">
          <Card className="studio-reveal studio-control-card">
            <div className="card-title-row">
              <h3>Scenario Controls</h3>
              <Tooltip text="Adjust the assumptions to compare local and offshore investment outcomes." />
            </div>

            <div className="studio-control-grid">
              <div className="input-group floating-field">
                <label>Monthly Investment</label>
                <input
                  type="number"
                  name="monthlyInvestment"
                  value={values.monthlyInvestment}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group floating-field">
                <label>Years</label>
                <input
                  type="number"
                  name="years"
                  value={values.years}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group floating-field">
                <label>Local Return %</label>
                <input
                  type="number"
                  name="localReturn"
                  value={values.localReturn}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group floating-field">
                <label>Offshore Return %</label>
                <input
                  type="number"
                  name="offshoreReturn"
                  value={values.offshoreReturn}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group floating-field">
                <label>Rand Weakening % Per Year</label>
                <input
                  type="number"
                  name="randWeakening"
                  value={values.randWeakening}
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
            <h3>Projected Values</h3>

            <div className="breakdown-row">
              <span>Local investment</span>
              <strong>{formatCurrency(localValue)}</strong>
            </div>

            <div className="breakdown-row">
              <span>Offshore investment with currency effect</span>
              <strong>{formatCurrency(currencyEffect)}</strong>
            </div>

            <div className="breakdown-row total-row">
              <span>Difference</span>
              <strong>{formatCurrency(Math.abs(difference))}</strong>
            </div>
          </Card>

          <Card className="studio-reveal">
            <h3>What this means</h3>
            <p>
              Offshore investing can add diversification, but the outcome
              depends on returns, currency movement, costs, and your time
              horizon. This studio is a simplified comparison, not a prediction.
            </p>
          </Card>
        </aside>
      </section>
    </main>
  );
}

export default LocalVsOffshore;