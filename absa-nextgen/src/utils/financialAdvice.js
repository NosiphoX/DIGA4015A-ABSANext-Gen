export function getFinancialAdvice(user) {
  const totalIncome =
    Number(user.monthlyIncome || 0) + Number(user.sideIncome || 0);

  const totalExpenses =
    Number(user.rent || 0) +
    Number(user.carPayment || 0) +
    Number(user.insurance || 0) +
    Number(user.medicalAid || 0) +
    Number(user.subscriptions || 0) +
    Number(user.food || 0);

  const monthlyLeftover = totalIncome - totalExpenses;
  const debt = Number(user.debt || 0);
  const savings = Number(user.savings || 0);

  const savingsRate =
    totalIncome > 0 ? Math.round((monthlyLeftover / totalIncome) * 100) : 0;

  const expenseRatio =
    totalIncome > 0 ? Math.round((totalExpenses / totalIncome) * 100) : 0;

  const debtToIncomeRatio =
    totalIncome > 0 ? Math.round((debt / totalIncome) * 100) : 0;

  let financialHealth = "Needs Attention";

  if (monthlyLeftover <= 0 || debtToIncomeRatio >= 50) {
    financialHealth = "Needs Attention";
  } else if (savingsRate >= 20 && debtToIncomeRatio < 30) {
    financialHealth = "Strong";
  } else if (savingsRate >= 10 || monthlyLeftover > 0) {
    financialHealth = "Moderate";
  }

  let insightState = "";
  let insightTitle = "";
  let insightMessage = "";
  let insightDetails = "";
  let recommendedTrack = "";
  let recommendedTrackMessage = "";

  if (totalIncome <= 0) {
    insightState = "neutral";
    insightTitle = "Your profile needs income data";
    insightMessage =
      "Add your monthly income so the app can understand your financial position more accurately.";
    insightDetails =
      "Income is the starting point for calculating your savings rate, expense pressure, debt position, and recommended strategy track.";

    recommendedTrack = "Financial Reset & Foundation Builder";
    recommendedTrackMessage =
      "Start by completing your Money Snapshot. Once your income and expenses are added, the app can recommend a more accurate path.";
  } else if (monthlyLeftover <= 0) {
    insightState = "risk";
    insightTitle = "Your monthly budget is under pressure";
    insightMessage =
      "Your expenses are currently equal to or higher than your income, which means your goals may be difficult to maintain right now.";
    insightDetails =
      "The first priority is to create breathing room. Review fixed costs, reduce non-essential spending, and avoid taking on new commitments until your leftover money becomes positive.";

    recommendedTrack = "Financial Reset & Foundation Builder";
    recommendedTrackMessage =
      "This track fits because your immediate focus should be stability, debt control, and rebuilding monthly breathing room.";
  } else if (debtToIncomeRatio >= 50) {
    insightState = "risk";
    insightTitle = "Debt is taking up too much financial space";
    insightMessage =
      "Your debt is high compared to your monthly income. Even with money left over, debt may slow down saving, investing, or property planning.";
    insightDetails =
      "Focus on reducing high-interest debt first. Once debt becomes more manageable, your leftover income can work harder toward long-term wealth goals.";

    recommendedTrack = "Financial Reset & Foundation Builder";
    recommendedTrackMessage =
      "This track is recommended because it helps you rebuild a stronger base before moving into bigger commitments.";
  } else if (savings < totalExpenses && monthlyLeftover > 0) {
    insightState = "caution";
    insightTitle = "You are stable, but your safety net is still thin";
    insightMessage =
      "You have room in your monthly budget, but your savings may not yet cover one month of expenses.";
    insightDetails =
      "Before pushing heavily toward property or investing, build a basic emergency buffer. A good first target is one month of expenses, then three months over time.";

    recommendedTrack = "Financial Reset & Foundation Builder";
    recommendedTrackMessage =
      "This track is useful because it helps you strengthen your emergency fund and protect yourself from unexpected costs.";
  } else if (savingsRate < 10) {
    insightState = "caution";
    insightTitle = "Your finances are moving, but slowly";
    insightMessage =
      "You are not in immediate danger, but your current savings rate may make long-term goals take longer than expected.";
    insightDetails =
      "Try increasing your monthly surplus gradually. Even small improvements in savings rate can make property, investment, or emergency goals easier to reach.";

    recommendedTrack = "Balanced Lifestyle & Investing";
    recommendedTrackMessage =
      "This track is recommended because it helps you balance your current lifestyle while improving your saving and investing habits.";
  } else if (
    user.goal === "Buy my first property" &&
    savingsRate >= 15 &&
    debtToIncomeRatio < 30
  ) {
    insightState = "strong";
    insightTitle = "You may be ready to plan toward property";
    insightMessage =
      "Your savings rate and debt position suggest that you may have room to start thinking seriously about a future property deposit.";
    insightDetails =
      "This does not mean you should buy immediately. It means you can start planning deposit targets, bond affordability, transfer costs, and lifestyle trade-offs.";

    recommendedTrack = "First Property Path";
    recommendedTrackMessage =
      "This track fits because your profile shows enough stability to begin exploring property planning in a structured way.";
  } else if (
    user.goal === "Start investing consistently" ||
    user.goal === "Balance lifestyle and investing"
  ) {
    insightState = "strong";
    insightTitle = "You have room to build wealth intentionally";
    insightMessage =
      "Your profile suggests you may be ready to balance lifestyle choices with consistent saving and investing.";
    insightDetails =
      "At this stage, the goal is consistency. You can explore investing while protecting your emergency fund and keeping lifestyle spending under control.";

    recommendedTrack = "Balanced Lifestyle & Investing";
    recommendedTrackMessage =
      "This track fits because your goal is about building sustainable financial momentum, not only recovering from pressure.";
  } else {
    insightState = "strong";
    insightTitle = "Your financial base is becoming stronger";
    insightMessage =
      "You have positive monthly breathing room and your debt does not appear to be overwhelming your income.";
    insightDetails =
      "Keep strengthening your savings, avoid unnecessary debt, and choose a strategy track that matches the next life goal you want to pursue.";

    recommendedTrack = "Balanced Lifestyle & Investing";
    recommendedTrackMessage =
      "This track is a good next step because it helps you grow wealth without ignoring your current lifestyle needs.";
  }

  return {
    totalIncome,
    totalExpenses,
    monthlyLeftover,
    savingsRate,
    expenseRatio,
    debtToIncomeRatio,
    financialHealth,
    insightState,
    insightTitle,
    insightMessage,
    insightDetails,
    recommendedTrack,
    recommendedTrackMessage,
  };
}