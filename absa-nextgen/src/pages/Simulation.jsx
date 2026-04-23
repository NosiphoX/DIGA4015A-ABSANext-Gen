import { Link } from "react-router-dom";
import Card from "../components/Card";
import Tooltip from "../components/Tooltip";

function Simulation() {
  const studios = [
    {
      title: "Rent vs Buy in Johannesburg",
      description:
        "Compare whether renting and investing or buying a property could leave you in a better position over 5 years.",
      route: "/simulation/rent-vs-buy",
      status: "Featured",
      audience: "Best for users planning their first property journey",
    },
    {
      title: "Car Finance vs Invest",
      description:
        "Explore the long-term trade-off between financing a car and investing the difference instead.",
      route: "#",
      status: "Coming Soon",
      audience: "Best for users comparing lifestyle spending vs wealth building",
    },
    {
      title: "Local vs Offshore Investing",
      description:
        "Understand how local and offshore investing may affect your future portfolio growth.",
      route: "#",
      status: "Coming Soon",
      audience: "Best for users exploring long-term investing strategy",
    },
  ];

  return (
    <div>
      <section className="page-header">
        <p className="hero-label">Simulation Lab</p>
        <h1>Explore the “What If?” of Your Financial Decisions</h1>
        <p>
          The Simulation Lab helps you test real South African money decisions
          before committing to them. Adjust the inputs, compare the outcomes,
          and understand the trade-offs more clearly.
        </p>
      </section>

      <div className="context-banner">
        <div>
          <h4>Why this matters</h4>
          <p>
            Big decisions like renting, buying property, financing a car, or
            investing offshore can affect your next 3 to 5 years. These studios
            help you see what your choice may cost or unlock over time.
          </p>
        </div>
      </div>

      <div className="featured-banner">
        <div>
          <h3>Start with the Featured Studio</h3>
          <p>
            If property is one of your biggest goals, begin with{" "}
            <strong>Rent vs Buy in Johannesburg</strong> to see whether owning
            or renting may better support your wealth-building path.
          </p>
        </div>

        <Link to="/simulation/rent-vs-buy" className="primary-btn">
          Open Studio
        </Link>
      </div>

      <div className="simulation-layout">
        <div className="simulation-main">
          <div className="studio-grid">
            {studios.map((studio) => (
              <Card key={studio.title}>
                <div className="studio-card-top">
                  <span className="track-badge">{studio.status}</span>
                </div>

                <h3>{studio.title}</h3>
                <p>{studio.description}</p>

                <div className="studio-audience">
                  <strong>Who it is for:</strong> {studio.audience}
                </div>

                {studio.route === "#" ? (
                  <button className="secondary-btn track-btn disabled-btn" disabled>
                    Coming Soon
                  </button>
                ) : (
                  <Link to={studio.route} className="primary-btn track-btn">
                    Open Studio
                  </Link>
                )}
              </Card>
            ))}
          </div>
        </div>

        <aside className="simulation-sidebar">
          <Card>
            <div className="card-title-row">
              <h3>How to Use the Simulation Lab</h3>
              <Tooltip text="Use the lab to compare trade-offs, not to predict the future perfectly." />
            </div>

            <ul className="info-list">
              <li>Adjust one variable at a time so the trade-offs stay clear.</li>
              <li>Focus on the long-term outcome, not only monthly affordability.</li>
              <li>Read the verdict and the explainer together.</li>
              <li>Use the result to guide your Strategy Track decisions.</li>
            </ul>
          </Card>

          <Card>
            <h3>South African Context</h3>
            <p>
              The studios are framed around South African realities such as bond
              rates, Johannesburg rent levels, deposits, SARS pressure,
              medical aid costs, and the trade-off between lifestyle and wealth
              building.
            </p>
          </Card>

          <Card>
            <h3>Where to go next</h3>
            <div className="quick-actions">
              <Link to="/dashboard" className="secondary-btn dashboard-btn secondary-dark">
                Back to Money Snapshot
              </Link>

              <Link to="/tracks" className="primary-btn dashboard-btn">
                View Strategy Tracks
              </Link>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

export default Simulation;