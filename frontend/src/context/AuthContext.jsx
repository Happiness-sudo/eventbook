import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token     = localStorage.getItem("eb-token");
    const savedUser = localStorage.getItem("eb-user");
    if (token && savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch (_) {}
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("eb-token", token);
    localStorage.setItem("eb-user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("eb-token");
    localStorage.removeItem("eb-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);