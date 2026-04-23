import { useState } from "react";
import UserContext from "./UserContext";

function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "Lerato",
    monthlyIncome: 38000,
    sideIncome: 2000,
    rent: 12000,
    carPayment: 5500,
    insurance: 1800,
    medicalAid: 2200,
    subscriptions: 1000,
    food: 4000,
    debt: 15000,
    savings: 0,
    goal: "Build an emergency fund",
    recommendedTrack: "Financial Reset & Foundation Builder",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;