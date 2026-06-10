import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Card from "../components/Card";
import useUser from "../context/useUser";
import { getFinancialAdvice } from "../utils/financialAdvice";
import { formatCurrency } from "../utils/formatters";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const tracks = [
  {
    title: "First Property Path",
    slug: "first-property",
    duration: "5 years",
    mood: "Ownership",
    description:
      "For users who want to prepare for a first home through deposit planning, affordability awareness, and realistic property trade-offs.",
    focus: ["Deposit saving", "Bond readiness", "Transfer costs"],
  },
  {
    title: "Balanced Lifestyle & Investing",
    slug: "balanced-lifestyle",
    duration: "5 years",
    mood: "Momentum",
    description:
      "For users who want to enjoy their income while still building consistent savings, investments, and long-term financial habits.",
    focus: ["Lifestyle balance", "Investing rhythm", "Flexible growth"],
  },
  {
    title: "Financial Reset & Foundation Builder",
    slug: "financial-reset",
    duration: "3–5 years",
    mood: "Stability",
    description:
      "For users who need to reduce pressure, manage debt, build an emergency fund, and create financial breathing room first.",
    focus: ["Debt control", "Emergency fund", "Budget stability"],
  },
];

function Tracks() {
  const tracksRef = useRef(null);
  const { user } = useUser();
  const advice = getFinancialAdvice(user);

  useGSAP(
    () => {
      gsap.from(".tracks-reveal", {
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.utils.toArray(".track-focus-section").forEach((section) => {
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
    { scope: tracksRef }
  );

  return (
    <main className="tracks-experience" ref={tracksRef}>
      <section className="tracks-hero tracks-reveal track-focus-section">
        <div>
          <p className="section-kicker">Strategy Tracks</p>
          <h1>Your money needs a path, not just a dashboard.</h1>
          <p>
            Choose a guided track that turns your current financial position into
            a practical five-year direction.
          </p>

          <div className="hero-action-row">
            <Link to={`/tracks/${tracks.find((track) => track.title === advice.recommendedTrack)?.slug || "financial-reset"}`} className="primary-btn">
              Open Recommended Track
            </Link>

            <Link to="/dashboard" className="secondary-btn secondary-dark">
              Update Money Snapshot
            </Link>
          </div>
        </div>

        <div className="track-orb">
          <span>Recommended</span>
          <strong>{advice.recommendedTrack}</strong>
          <small>{advice.financialHealth} profile</small>
        </div>
      </section>

      <section className="tracks-guidance-panel tracks-reveal track-focus-section">
        <div>
          <p className="section-kicker">Why this track?</p>
          <h2>{advice.recommendedTrack}</h2>
          <p>{advice.recommendedTrackMessage}</p>
        </div>

        <div className="tracks-mini-stats">
          <div>
            <span>Money Left</span>
            <strong>{formatCurrency(advice.monthlyLeftover)}</strong>
          </div>

          <div>
            <span>Debt Pressure</span>
            <strong>{advice.debtToIncomeRatio}%</strong>
          </div>

          <div>
            <span>Savings Rate</span>
            <strong>{advice.savingsRate}%</strong>
          </div>
        </div>
      </section>

      <section className="tracks-pathway track-focus-section">
        {tracks.map((track, index) => {
          const isRecommended = track.title === advice.recommendedTrack;

          return (
            <Card
              key={track.slug}
              className={`track-path-card tracks-reveal ${
                isRecommended ? "recommended-path" : ""
              }`}
            >
              <div className="track-path-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="track-path-content">
                <div className="track-card-top">
                  <span className="track-badge">{track.mood}</span>
                  <span className="track-duration">{track.duration}</span>
                </div>

                <h2>{track.title}</h2>
                <p>{track.description}</p>

                <div className="track-focus-tags">
                  {track.focus.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <Link to={`/tracks/${track.slug}`} className="primary-btn track-btn">
                  Explore Track
                </Link>
              </div>
            </Card>
          );
        })}
      </section>
    </main>
  );
}

export default Tracks;