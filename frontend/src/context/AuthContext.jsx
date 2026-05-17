import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("eb-user"))
  );

  const login = (user, token) => {
    localStorage.setItem(
      "eb-user",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "eb-token",
      token
    );

    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("eb-user");
    localStorage.removeItem("eb-token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}