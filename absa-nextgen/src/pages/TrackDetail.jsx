import { useState } from "react";
import Card from "../components/Card";
import useUser from "../context/useUser";

function TrackDetail() {
  const { user } = useUser();

  const [milestones, setMilestones] = useState([
    {
      year: "Year 1",
      title: "Build an Emergency Fund",
      description:
        "Save at least three months of expenses before focusing on property.",
      status: "Done",
    },
    {
      year: "Year 2",
      title: "Pay Off High-Interest Debt",
      description:
        "Reduce credit card and personal loan debt to improve affordability.",
      status: user.debt > 10000 ? "In Progress" : "Done",
    },
    {
      year: "Year 3",
      title: "Save for a Home Deposit",
      description:
        "Aim to save at least 10% of a future home's value for your deposit.",
      status: "Not Started",
    },
    {
      year: "Year 4",
      title: "Improve Credit Score",
      description:
        "Maintain healthy debt levels and pay bills on time to improve bond approval chances.",
      status: "Not Started",
    },
    {
      year: "Year 5",
      title: "Buy Your First Property",
      description:
        "Use your savings and improved affordability to purchase your first home.",
      status: "Not Started",
    },
  ]);

  const totalIncome = user.monthlyIncome + user.sideIncome;

  const totalExpenses =
    user.rent +
    user.carPayment +
    user.insurance +
    user.medicalAid +
    user.subscriptions +
    user.food;

  const monthlyLeftover = totalIncome - totalExpenses;

  const toggleStatus = (index) => {
    const updatedMilestones = [...milestones];

    if (updatedMilestones[index].status === "Not Started") {
      updatedMilestones[index].status = "In Progress";
    } else if (updatedMilestones[index].status === "In Progress") {
      updatedMilestones[index].status = "Done";
    } else {
      updatedMilestones[index].status = "Not Started";
    }

    setMilestones(updatedMilestones);
  };

  const completedMilestones = milestones.filter(
    (milestone) => milestone.status === "Done"
  ).length;

  const progressPercentage = Math.round(
    (completedMilestones / milestones.length) * 100
  );

  return (
    <div>
      <section className="page-header">
        <p className="hero-label">First Property Path</p>
        <h1>Your Journey Towards Buying Your First Home</h1>
        <p>
          This track is designed for young South Africans who want to prepare
          for buying property without damaging their financial stability.
        </p>
      </section>

      <div className="context-banner">
        <div>
          <h4>Why this track fits your profile</h4>
          <p>
            Based on your current numbers, you have about{" "}
            <strong>R{monthlyLeftover.toLocaleString()}</strong> left after
            monthly expenses. This track helps turn that into a structured
            deposit and affordability plan.
          </p>
        </div>
      </div>

      <Card>
        <h3>Track Progress</h3>
        <p>{progressPercentage}% completed</p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </Card>

      <section className="milestones-section">
        {milestones.map((milestone, index) => (
          <Card key={milestone.title}>
            <div className="milestone-top-row">
              <div>
                <p className="milestone-year">{milestone.year}</p>
                <h3>{milestone.title}</h3>
              </div>

              <button
                className={`status-btn status-${milestone.status
                  .toLowerCase()
                  .replace(/\s/g, "-")}`}
                onClick={() => toggleStatus(index)}
              >
                {milestone.status}
              </button>
            </div>

            <p>{milestone.description}</p>
          </Card>
        ))}
      </section>

      <Card>
        <h3>Personalised Recommendation</h3>
        <p>
          With your current income and expenses, a realistic next step would be
          to prioritise debt control, then consistently direct leftover cash
          toward a deposit fund before taking on a bond.
        </p>
      </Card>
    </div>
  );
}

export default TrackDetail;