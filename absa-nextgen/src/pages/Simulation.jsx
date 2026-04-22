import { Link } from "react-router-dom";
import Card from "../components/Card";
import Tooltip from "../components/Tooltip";

function Simulation() {
  const studios = [
    {
      title: "Rent vs Buy in Johannesburg",
      description:
        "Compare whether renting and investing or buying a property could leave you in a better position over 5 years.",
      audience: "Best for users planning property decisions",
      route: "/simulation/rent-vs-buy",
      status: "Featured",
    },
    {
      title: "Car Finance vs Invest",
      description:
        "See the opportunity cost of financing an expensive car instead of investing the difference.",
      audience: "Coming soon",
      route: "#",
      status: "Coming Soon",
    },
    {
      title: "Local vs Offshore Investing",
      description:
        "Explore how local and offshore returns may affect your wealth over time.",
      audience: "Coming soon",
      route: "#",
      status: "Coming Soon",
    },
  ];

  return (
    <div>
      <section className="page-header">
        <p className="hero-label">Simulation Lab</p>
        <h1>Test Real Financial Decisions Before You Commit</h1>
        <p>
          The Simulation Lab helps you explore real-life South African money
          decisions over time. Adjust the numbers and see how your choices may
          affect your future wealth.
        </p>
      </section>

      <div className="featured-banner">
        <div>
          <h3>Featured Studio</h3>
          <p>
            Start with <strong>Rent vs Buy in Johannesburg</strong> to compare
            one of the biggest money decisions young professionals face.
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
              <h3>How to Use the Lab</h3>
              <Tooltip text="These tips help users understand how to interpret the simulation results." />
            </div>

            <p>
              Use the sliders and inputs to test different scenarios. The goal
              is not perfect prediction, but clearer understanding.
            </p>

            <ul className="info-list">
              <li>Change one variable at a time to compare trade-offs.</li>
              <li>Look beyond monthly cost and focus on long-term outcomes.</li>
              <li>Use the verdict to understand what the numbers mean.</li>
            </ul>
          </Card>

          <Card>
            <h3>South African Context</h3>
            <p>
              These studios use South African concepts like bond rates, rent
              levels, property deposits, medical aid pressure, and realistic
              urban cost assumptions.
            </p>
          </Card>
        </aside>
      </div>
    </div>
  );
}

export default Simulation;