import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Read from localStorage on mount
    const savedLogin = localStorage.getItem("isLoggedIn") === "true";
    const savedToken = localStorage.getItem("token");
    const savedAuth = savedLogin && savedToken !== null;
    setIsLoggedIn(savedAuth);
    setIsInitialized(true); // Mark initialization complete
  }, []);

  // Optional: Listen for localStorage changes in the same tab
  useEffect(() => {
    const checkAuthState = () => {
      const currentAuth = localStorage.getItem("isLoggedIn") === "true";
      if (currentAuth !== isLoggedIn) {
        setIsLoggedIn(currentAuth);
      }
    };

    // Check every second (adjust interval as needed)
    const interval = setInterval(checkAuthState, 1000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const login = (token) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isInitialized, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
