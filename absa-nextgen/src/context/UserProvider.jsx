import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import {
  getActiveAccount,
  getActiveSessionEmail,
  updateAccount,
  logoutAccount,
} from "../utils/authService";

const defaultUser = {
  name: "",
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
  const [user, setUserState] = useState(() => {
    const activeAccount = getActiveAccount();

    if (activeAccount) {
      return {
        ...defaultUser,
        ...activeAccount,
      };
    }

    return defaultUser;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(getActiveSessionEmail());
  });

  useEffect(() => {
    const activeEmail = getActiveSessionEmail();

    if (activeEmail && user.email) {
      updateAccount(activeEmail, user);
    }
  }, [user]);

  const setUser = (updatedUser) => {
    setUserState((prevUser) => {
      if (typeof updatedUser === "function") {
        return updatedUser(prevUser);
      }

      return {
        ...prevUser,
        ...updatedUser,
      };
    });
  };

  const loadUserFromAccount = (account) => {
    setUserState({
      ...defaultUser,
      ...account,
    });

    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    logoutAccount();
    setUserState(defaultUser);
    setIsAuthenticated(false);
  };

  const resetUser = () => {
    const resetProfile = {
      ...defaultUser,
      name: user.name,
      email: user.email,
      onboardingComplete: false,
    };

    setUserState(resetProfile);

    if (user.email) {
      updateAccount(user.email, resetProfile);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        resetUser,
        isAuthenticated,
        setIsAuthenticated,
        loadUserFromAccount,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;