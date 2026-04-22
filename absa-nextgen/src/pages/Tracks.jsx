import { Link } from "react-router-dom";
import Card from "../components/Card";

function Tracks() {
  const tracks = [
    {
      title: "First Property Path",
      description:
        "Plan for your first property by building an emergency fund, saving for a deposit, and understanding future bond costs.",
      duration: "5 Year Track",
      progress: "In Progress",
      route: "/tracks/first-property",
    },
    {
      title: "Balanced Lifestyle & Investing",
      description:
        "Balance enjoying your lifestyle today while still building wealth through investing and long-term planning.",
      duration: "5 Year Track",
      progress: "Not Started",
      route: "/tracks/balanced-lifestyle",
    },
    {
      title: "Financial Reset & Foundation Builder",
      description:
        "Focus on reducing debt, building an emergency fund, and creating financial stability before investing aggressively.",
      duration: "3 Year Track",
      progress: "Recommended",
      route: "/tracks/financial-reset",
    },
  ];

  return (
    <div>
      <section className="page-header">
        <p className="hero-label">Strategy Tracks</p>
        <h1>Choose a Financial Path That Matches Your Goals</h1>
        <p>
          Strategy Tracks help you follow a structured financial journey over
          the next few years. Each path is designed for a different stage of
          life and financial readiness.
        </p>
      </section>

      <section className="tracks-overview-grid">
        <Card>
          <h3>Why Strategy Tracks Matter</h3>
          <p>
            Many young professionals try to do everything at once: pay debt,
            save for property, invest, travel, and support family. Strategy
            Tracks help you prioritise the right goals at the right time.
          </p>
        </Card>

        <Card>
          <h3>South African Context</h3>
          <p>
            These tracks include realistic South African financial ideas such as
            emergency funds, retirement annuities, medical aid, SARS tax, and
            property deposits.
          </p>
        </Card>
      </section>

      <section className="tracks-grid">
        {tracks.map((track) => (
          <Card key={track.title}>
            <div className="track-card-top">
              <span className="track-badge">{track.progress}</span>
              <span className="track-duration">{track.duration}</span>
            </div>

            <h3>{track.title}</h3>
            <p>{track.description}</p>

            <Link to={track.route} className="primary-btn track-btn">
              View Track
            </Link>
          </Card>
        ))}
      </section>
    </div>
  );
}

export default Tracks;