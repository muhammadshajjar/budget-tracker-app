import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext({
  token: "",
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const value = {
    token,
    login,
    logout,
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
