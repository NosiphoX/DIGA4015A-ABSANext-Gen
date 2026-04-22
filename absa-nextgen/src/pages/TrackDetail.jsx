import { useState } from "react";
import Card from "../components/Card";

function TrackDetail() {
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
      status: "In Progress",
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
        <h3>Why This Track Works</h3>
        <p>
          Buying a property too early can place pressure on your finances,
          especially if you still have debt or no emergency savings. This track
          helps you prepare gradually so that when you buy, you can do it more
          sustainably.
        </p>
      </Card>
    </div>
  );
}

export default TrackDetail;