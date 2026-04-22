import { Link } from "react-router-dom";
import Card from "../components/Card";

function Home() {
  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-label">ABSA NextGen Wealth Studio</p>

          <h1>
            Your First Five Years of Wealth Building, Planned Properly.
          </h1>

          <p className="hero-description">
            A financial planning companion designed for young South African
            professionals. Understand your money, reduce financial stress, and
            make smarter decisions around property, savings, debt, retirement,
            and investing.
          </p>

          <div className="hero-buttons">
            <Link to="/dashboard" className="primary-btn">
              Open Money Snapshot
            </Link>

            <Link to="/tracks" className="secondary-btn">
              Explore Strategy Tracks
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="page-header">
          <h2>What You Can Do</h2>
          <p>
            ABSA NextGen helps you understand where your money is going and
            what you should do next.
          </p>
        </div>

        <div className="card-grid">
          <Card>
            <h3>Money Snapshot</h3>
            <p>
              See your income, expenses, savings, debt, and net worth in one
              place with clear financial insights.
            </p>
          </Card>

          <Card>
            <h3>Strategy Tracks</h3>
            <p>
              Choose a structured 5-year financial path such as buying your
              first property or building your emergency fund.
            </p>
          </Card>

          <Card>
            <h3>Simulation Lab</h3>
            <p>
              Explore realistic South African scenarios like renting versus
              buying in Johannesburg or financing a car versus investing.
            </p>
          </Card>
        </div>
      </section>

      <section className="learn-section">
        <div className="page-header">
          <h2>Built for South Africans</h2>
          <p>
            The platform uses realistic South African financial concepts and
            figures so the advice feels relevant to your life.
          </p>
        </div>

        <div className="learn-grid">
          <Card>
            <h3>SARS Tax & Take-Home Pay</h3>
            <p>
              Learn how PAYE affects your real monthly income and why your
              salary increase may not always feel bigger.
            </p>
          </Card>

          <Card>
            <h3>Retirement Annuities & TFSA</h3>
            <p>
              Understand the difference between retirement annuities and
              tax-free savings accounts and when to use each.
            </p>
          </Card>

          <Card>
            <h3>Medical Aid, Insurance & Emergency Funds</h3>
            <p>
              Protect yourself from unexpected financial shocks by building a
              strong foundation first.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default Home;