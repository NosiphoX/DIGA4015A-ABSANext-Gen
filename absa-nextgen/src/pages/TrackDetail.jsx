import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Card from "../components/Card";
import Tooltip from "../components/Tooltip";
import useUser from "../context/useUser";
import { getFinancialAdvice } from "../utils/financialAdvice";
import { formatCurrency } from "../utils/formatters";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const trackData = {
  "first-property": {
    title: "First Property Path",
    mood: "Ownership",
    duration: "5 years",
    hero:
      "A guided route for preparing toward your first home without rushing into property before your finances are ready.",
    philosophy:
      "This track treats property as a long-term wealth decision, not just a purchase. It helps you think through deposit saving, monthly affordability, bond pressure, transfer costs, and lifestyle trade-offs.",
    bestFor:
      "Users with stable income, manageable debt, and a goal of buying their first home in the next few years.",
    milestones: [
      {
        year: "Year 1",
        title: "Build a clean affordability picture",
        description:
          "Understand your income, expenses, debt, and realistic monthly bond capacity before thinking about property price.",
        education:
          "Banks do not only look at salary. They also consider debt, expenses, credit behaviour, and affordability stress.",
        status: "Not Started",
      },
      {
        year: "Year 2",
        title: "Create a deposit and transfer-cost plan",
        description:
          "Start saving toward a deposit while also remembering transfer duties, legal costs, bond registration, and moving costs.",
        education:
          "A property deposit is not the only upfront cost. Many first-time buyers underestimate once-off buying costs.",
        status: "Not Started",
      },
      {
        year: "Year 3",
        title: "Reduce debt before applying",
        description:
          "Lower high-interest debt so your affordability and credit profile become stronger.",
        education:
          "Lower debt can improve your affordability position and leave more room for monthly property costs.",
        status: "Not Started",
      },
      {
        year: "Year 4",
        title: "Compare renting, buying, and investing",
        description:
          "Use simulations to test whether buying now is better than renting longer while investing the difference.",
        education:
          "Buying is not always automatically better. Timing, interest rates, location, and lifestyle flexibility matter.",
        status: "Not Started",
      },
      {
        year: "Year 5",
        title: "Prepare for a realistic purchase window",
        description:
          "Move from planning to readiness by comparing properties, monthly bond estimates, and long-term maintenance costs.",
        education:
          "A sustainable purchase is one that still leaves room for emergencies, insurance, repairs, and quality of life.",
        status: "Not Started",
      },
    ],
    tradeoffs: [
      "Buying can build ownership, but it reduces flexibility.",
      "A bigger deposit can lower monthly pressure, but takes longer to save.",
      "A cheaper property may feel less exciting, but could protect your lifestyle.",
    ],
  },

  "balanced-lifestyle": {
    title: "Balanced Lifestyle & Investing",
    mood: "Momentum",
    duration: "5 years",
    hero:
      "A flexible path for users who want to enjoy their income while still building long-term wealth habits.",
    philosophy:
      "This track is about balance. It does not shame lifestyle spending. Instead, it helps you create a system where enjoyment, saving, and investing can exist together.",
    bestFor:
      "Users with positive monthly breathing room who want to start investing consistently without feeling financially restricted.",
    milestones: [
      {
        year: "Year 1",
        title: "Define your lifestyle baseline",
        description:
          "Separate essential costs, meaningful lifestyle spending, and silent money leaks like unused subscriptions.",
        education:
          "The goal is not to remove joy. The goal is to spend intentionally and stop money disappearing unnoticed.",
        status: "Not Started",
      },
      {
        year: "Year 2",
        title: "Build a starter emergency buffer",
        description:
          "Create at least one month of expenses before increasing investing pressure.",
        education:
          "Investing without a buffer can force you to withdraw investments when emergencies happen.",
        status: "Not Started",
      },
      {
        year: "Year 3",
        title: "Create a monthly investing rhythm",
        description:
          "Choose a realistic amount you can invest consistently instead of waiting for a perfect month.",
        education:
          "Consistency often matters more than intensity. A smaller monthly habit can become powerful over time.",
        status: "Not Started",
      },
      {
        year: "Year 4",
        title: "Increase wealth-building percentage",
        description:
          "Slowly increase the portion of income going toward savings and investing as income grows.",
        education:
          "Lifestyle inflation can quietly absorb raises. This milestone protects your future income growth.",
        status: "Not Started",
      },
      {
        year: "Year 5",
        title: "Review long-term direction",
        description:
          "Decide whether your next phase is property, offshore investing, entrepreneurship, or deeper retirement planning.",
        education:
          "A balanced strategy should evolve as your income, responsibilities, and goals change.",
        status: "Not Started",
      },
    ],
    tradeoffs: [
      "Lifestyle spending creates quality of life, but can delay wealth if unmanaged.",
      "Investing early builds habits, but emergency savings must come first.",
      "Flexibility is valuable, but too much flexibility can become lack of direction.",
    ],
  },

  "financial-reset": {
    title: "Financial Reset & Foundation Builder",
    mood: "Stability",
    duration: "3–5 years",
    hero:
      "A stabilising path for users who need to reduce financial pressure before chasing bigger wealth goals.",
    philosophy:
      "This track focuses on breathing room first. It helps users manage debt, rebuild emergency savings, reduce financial stress, and create a stronger base.",
    bestFor:
      "Users with high debt, low savings, tight monthly cash flow, or a goal of rebuilding financial confidence.",
    milestones: [
      {
        year: "Phase 1",
        title: "Stabilise your monthly cash flow",
        description:
          "Understand what is coming in, what is going out, and where pressure is building each month.",
        education:
          "A reset starts with visibility. You cannot fix what you cannot see clearly.",
        status: "Not Started",
      },
      {
        year: "Phase 2",
        title: "Stop new unnecessary debt",
        description:
          "Pause commitments that add monthly pressure until your budget has breathing room again.",
        education:
          "The first goal is not perfection. It is stopping the situation from becoming heavier.",
        status: "Not Started",
      },
      {
        year: "Phase 3",
        title: "Pay down high-pressure debt",
        description:
          "Prioritise debts that carry high interest or cause the most monthly stress.",
        education:
          "Reducing debt can feel slow, but every reduced payment creates future flexibility.",
        status: "Not Started",
      },
      {
        year: "Phase 4",
        title: "Build a first emergency cushion",
        description:
          "Save a small starter buffer so every surprise cost does not become new debt.",
        education:
          "Even a small emergency fund can break the cycle of borrowing for every unexpected expense.",
        status: "Not Started",
      },
      {
        year: "Phase 5",
        title: "Move from recovery to growth",
        description:
          "Once debt and cash flow are under control, begin shifting toward investing, property, or balanced wealth building.",
        education:
          "The reset track is not the final destination. It is the foundation that makes future goals safer.",
        status: "Not Started",
      },
    ],
    tradeoffs: [
      "Debt repayment may slow lifestyle spending now, but increases freedom later.",
      "Emergency saving may feel boring, but protects you from setbacks.",
      "Stability first can delay investing, but it makes future investing more sustainable.",
    ],
  },
};

function TrackDetail() {
  const detailRef = useRef(null);
  const {trackSlug} = useParams();
  const { user } = useUser();
  const advice = getFinancialAdvice(user);

  const slug = trackSlug || "first-property";
  const track = trackData[slug] || trackData["first-property"];

  const storageKey = `absa_nextgen_${slug}_milestones`;

  const [milestones, setMilestones] = useState(() => {
    const savedMilestones = localStorage.getItem(storageKey);

    if (savedMilestones) {
      return JSON.parse(savedMilestones);
    }

    return track.milestones;
  });

  

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(milestones));
  }, [milestones, storageKey]);

  useGSAP(
    () => {
      gsap.from(".track-detail-reveal", {
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.utils.toArray(".track-detail-focus").forEach((section) => {
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
    { scope: detailRef, dependencies: [slug] }
  );

  const updateMilestoneStatus = (selectedIndex, newStatus) => {
    setMilestones((prevMilestones) =>
      prevMilestones.map((milestone, index) => {
        if (index !== selectedIndex) return milestone;

        return {
          ...milestone,
          status: newStatus,
        };
      })
    );
  };

  const completedMilestones = milestones.filter(
    (milestone) => milestone.status === "Done"
  ).length;

  const progress = Math.round((completedMilestones / milestones.length) * 100);

  return (
    <main className="track-detail-experience" ref={detailRef}>
      <section className="track-detail-hero track-detail-reveal track-detail-focus">
        <div>
          <p className="section-kicker">{track.mood} Track</p>
          <h1>{track.title}</h1>
          <p>{track.hero}</p>

          <div className="hero-action-row">
            <Link to="/tracks" className="secondary-btn secondary-dark">
              Back to Tracks
            </Link>

            <Link to="/simulation" className="primary-btn">
              Test a Scenario
            </Link>
          </div>
        </div>

        <div className="track-progress-orb">
          <span>Progress</span>
          <strong>{progress}%</strong>
          <small>
            {completedMilestones} of {milestones.length} complete
          </small>
        </div>
      </section>

      <section className="track-context-panel track-detail-reveal track-detail-focus">
        <div>
          <p className="section-kicker">Personal context</p>
          <h2>
            This track is being read against {user.name || "your"} current
            profile.
          </h2>
          <p>
            Your dashboard currently shows{" "}
            {formatCurrency(advice.monthlyLeftover)} left after monthly costs, a{" "}
            {advice.savingsRate}% potential savings rate, and{" "}
            {advice.debtToIncomeRatio}% debt pressure.
          </p>
        </div>

        <div className="track-context-stats">
          <div>
            <span>Recommended track</span>
            <strong>{advice.recommendedTrack}</strong>
          </div>

          <div>
            <span>Current goal</span>
            <strong>{user.goal || "Not selected"}</strong>
          </div>
        </div>
      </section>

      <section className="track-philosophy-section track-detail-focus">
        <Card className="track-detail-reveal">
          <div className="card-title-row">
            <h3>Track Philosophy</h3>
            <Tooltip text="This explains the thinking behind the strategy track." />
          </div>
          <p>{track.philosophy}</p>
        </Card>

        <Card className="track-detail-reveal">
          <div className="card-title-row">
            <h3>Best For</h3>
            <Tooltip text="This describes the type of user this track supports best." />
          </div>
          <p>{track.bestFor}</p>
        </Card>
      </section>

      <section className="track-progress-panel track-detail-reveal track-detail-focus">
        <div>
          <p className="section-kicker">Milestone Journey</p>
          <h2>{progress}% complete</h2>
          <p>
            Choose a status for each milestone below. Your progress updates
            automatically and stays saved on this device.
          </p>
        </div>

        <div className="track-progress-bar">
          <div style={{ width: `${progress}%` }}></div>
        </div>
      </section>

      <section className="milestone-timeline track-detail-focus">
        {milestones.map((milestone, index) => (
          <Card
            key={`${milestone.year}-${milestone.title}`}
            className={`milestone-card track-detail-reveal status-${milestone.status
              .toLowerCase()
              .replaceAll(" ", "-")}`}
          >
            <div className="milestone-index">{index + 1}</div>

            <div className="milestone-content">
              <div className="milestone-top-row">
                <div>
                  <p className="milestone-year">{milestone.year}</p>
                  <h3>{milestone.title}</h3>
                </div>

                <div className="milestone-status-controls">
                  {["Not Started", "In Progress", "Done"].map(
                    (statusOption) => (
                      <button
                        key={statusOption}
                        type="button"
                        className={`milestone-choice-btn ${
                          milestone.status === statusOption ? "active" : ""
                        } status-${statusOption
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                        onClick={() =>
                          updateMilestoneStatus(index, statusOption)
                        }
                      >
                        {statusOption}
                      </button>
                    )
                  )}
                </div>
              </div>

              <p>{milestone.description}</p>

              <details>
                <summary>Why this matters</summary>
                <p>{milestone.education}</p>
              </details>
            </div>
          </Card>
        ))}
      </section>

      <section className="track-tradeoff-section track-detail-focus">
        <div className="editor-intro">
          <p className="section-kicker">Trade-offs</p>
          <h2>Every path has a cost and a benefit.</h2>
          <p>
            This section helps the strategy track feel more realistic and less
            like generic advice.
          </p>
        </div>

        <div className="tradeoff-list">
          {track.tradeoffs.map((tradeoff) => (
            <Card key={tradeoff} className="track-detail-reveal">
              <p>{tradeoff}</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

export default TrackDetail;