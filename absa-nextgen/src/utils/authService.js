const ACCOUNTS_KEY = "absa_nextgen_accounts";
const SESSION_KEY = "absa_nextgen_active_session";

export function getAccounts() {
  const savedAccounts = localStorage.getItem(ACCOUNTS_KEY);
  return savedAccounts ? JSON.parse(savedAccounts) : [];
}

export function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function findAccountByEmail(email) {
  const accounts = getAccounts();
  return accounts.find(
    (account) => account.email.toLowerCase() === email.toLowerCase()
  );
}

export function createAccount({ name, email, password }) {
  const accounts = getAccounts();
  const existingAccount = findAccountByEmail(email);

  if (existingAccount) {
    return {
      success: false,
      message: "An account with this email already exists. Please log in.",
    };
  }

  const newAccount = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
    onboardingComplete: false,
  };

  saveAccounts([...accounts, newAccount]);
  sessionStorage.setItem(SESSION_KEY, email);

  return {
    success: true,
    account: newAccount,
  };
}

export function loginAccount({ email, password }) {
  const account = findAccountByEmail(email);

  if (!account) {
    return {
      success: false,
      message: "No account found with this email. Please sign up first.",
    };
  }

  if (account.password !== password) {
    return {
      success: false,
      message: "Incorrect password. Please try again.",
    };
  }

  sessionStorage.setItem(SESSION_KEY, email);

  return {
    success: true,
    account,
  };
}

export function updateAccount(email, updatedData) {
  const accounts = getAccounts();

  const updatedAccounts = accounts.map((account) =>
    account.email.toLowerCase() === email.toLowerCase()
      ? { ...account, ...updatedData }
      : account
  );

  saveAccounts(updatedAccounts);

  return findAccountByEmail(email);
}

export function getActiveSessionEmail() {
  return sessionStorage.getItem(SESSION_KEY);
}

export function getActiveAccount() {
  const email = getActiveSessionEmail();

  if (!email) {
    return null;
  }

  return findAccountByEmail(email);
}

export function logoutAccount() {
  sessionStorage.removeItem(SESSION_KEY);
}