import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Card from "../components/Card";
import Tooltip from "../components/Tooltip";
import useUser from "../context/useUser";
import { getFinancialAdvice } from "../utils/financialAdvice";
import { formatCurrency } from "../utils/formatters";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Simulation() {
  const simulationRef = useRef(null);
  const { user } = useUser();
  const advice = getFinancialAdvice(user);

  const studios = [
    {
      title: "Rent vs Buy in Johannesburg",
      description:
        "Compare whether renting and investing or buying a property could leave you in a better position over 5 years.",
      route: "/simulation/rent-vs-buy",
      status: "Featured",
      audience: "Best for users planning their first property journey",
      theme: "Property",
      signal: "Live Studio",
    },
    {
      title: "Car Finance vs Invest",
      description:
        "Compare the long-term cost of financing a car against buying cheaper and investing the monthly difference.",
      route: "/simulation/car-finance-vs-invest",
      status: "Live Studio",
      audience: "Best for users comparing lifestyle spending vs wealth building",
      theme: "Lifestyle",
      signal: "Live Studio",
    },
    {
      title: "Local vs Offshore Investing",
      description:
        "Compare how local and offshore investing could grow over time using different return and exchange-rate assumptions.",
      route: "/simulation/local-vs-offshore",
      status: "Live Studio",
      audience: "Best for users exploring long-term investing strategy",
      theme: "Investing",
      signal: "Live Studio",
    },
  ];

  useGSAP(
    () => {
      gsap.from(".simulation-reveal", {
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.utils.toArray(".simulation-focus-section").forEach((section) => {
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
    { scope: simulationRef }
  );

  return (
    <main className="simulation-experience" ref={simulationRef}>
      <section className="simulation-hero simulation-reveal simulation-focus-section">
        <div>
          <p className="section-kicker">Simulation Lab</p>
          <h1>Test the future before you commit to it.</h1>
          <p>
            Explore the “what if?” behind major South African financial
            decisions. Use your current money profile to compare trade-offs,
            pressure points, and long-term outcomes.
          </p>

          <div className="hero-action-row">
            <Link to="/simulation/rent-vs-buy" className="primary-btn">
              Open Featured Studio
            </Link>

            <Link to="/dashboard" className="secondary-btn secondary-dark">
              Update My Snapshot
            </Link>
          </div>
        </div>

        <div className="simulation-orb">
          <span>Current Capacity</span>
          <strong>{formatCurrency(advice.monthlyLeftover)}</strong>
          <small>{advice.financialHealth} profile</small>
        </div>
      </section>

      <section className="simulation-guidance-panel simulation-reveal simulation-focus-section">
        <div>
          <p className="section-kicker">Why this matters</p>
          <h2>Big money decisions are not just about affordability.</h2>
          <p>
            A choice can look affordable today but still create pressure later.
            The Simulation Lab helps you compare ownership, flexibility, debt,
            investing, and lifestyle trade-offs before you commit.
          </p>
        </div>

        <div className="simulation-mini-stats">
          <div>
            <span>Money Left</span>
            <strong>{formatCurrency(advice.monthlyLeftover)}</strong>
          </div>

          <div>
            <span>Savings Rate</span>
            <strong>{advice.savingsRate}%</strong>
          </div>

          <div>
            <span>Debt Pressure</span>
            <strong>{advice.debtToIncomeRatio}%</strong>
          </div>
        </div>
      </section>

      <section className="featured-studio-panel simulation-reveal simulation-focus-section">
        <div>
          <p className="section-kicker">Featured Studio</p>
          <h2>Rent vs Buy in Johannesburg</h2>
          <p>
            If property is one of your biggest goals, start here. This studio
            compares the cost of renting and investing against the long-term
            pressure and potential benefit of buying.
          </p>
        </div>

        <Link to="/simulation/rent-vs-buy" className="primary-btn">
          Launch Studio
        </Link>
      </section>

      <section className="simulation-studio-path simulation-focus-section">
        {studios.map((studio, index) => (
          <Card
            key={studio.title}
            className={`simulation-studio-card simulation-reveal ${
              studio.status === "Featured" ? "featured-studio-card" : ""
            }`}
          >
            <div className="studio-number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="studio-card-content">
              <div className="studio-card-top">
                <span className="track-badge">{studio.status}</span>
                <span className="studio-theme">{studio.theme}</span>
              </div>

              <h2>{studio.title}</h2>
              <p>{studio.description}</p>

              <div className="studio-audience">
                <strong>Who it is for:</strong> {studio.audience}
              </div>

              <div className="studio-signal-row">
                <span>{studio.signal}</span>

                <Link to={studio.route} className="primary-btn track-btn">
                  Open Studio
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </section>

      <section className="simulation-help-layout simulation-focus-section">
        <Card className="simulation-reveal">
          <div className="card-title-row">
            <h3>How to Use the Simulation Lab</h3>
            <Tooltip text="Use the lab to compare trade-offs, not to predict the future perfectly." />
          </div>

          <ul className="info-list">
            <li>Adjust one variable at a time so the trade-offs stay clear.</li>
            <li>
              Focus on the long-term outcome, not only monthly affordability.
            </li>
            <li>Read the verdict and the explainer together.</li>
            <li>Use the result to guide your Strategy Track decisions.</li>
          </ul>
        </Card>

        <Card className="simulation-reveal">
          <h3>South African Context</h3>
          <p>
            The studios are framed around South African realities such as bond
            rates, Johannesburg rent levels, deposits, medical aid costs, and
            the trade-off between lifestyle and wealth building.
          </p>
        </Card>

        <Card className="simulation-reveal">
          <h3>Where to go next</h3>

          <div className="quick-actions">
            <Link
              to="/dashboard"
              className="secondary-btn dashboard-btn secondary-dark"
            >
              Back to Money Snapshot
            </Link>

            <Link to="/tracks" className="primary-btn dashboard-btn">
              View Strategy Tracks
            </Link>
          </div>
        </Card>
      </section>
    </main>
  );
}

export default Simulation;