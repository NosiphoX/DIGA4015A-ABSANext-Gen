import { useEffect, useState } from "react";
import UserContext from "./UserContext";

const defaultUser = {
  name: "Lerato",
  email: "",
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
  riskStyle: "Balanced",
  financialPersonality: "Foundation Builder",
  onboardingComplete: false,
  recommendedTrack: "Financial Reset & Foundation Builder",
};

function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("absa_nextgen_user");

    if (savedUser) {
      return JSON.parse(savedUser);
    }

    return defaultUser;
  });

  useEffect(() => {
    localStorage.setItem("absa_nextgen_user", JSON.stringify(user));
  }, [user]);

  const resetUser = () => {
    localStorage.removeItem("absa_nextgen_user");
    setUser(defaultUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;