import React, { createContext, useContext, useState } from "react";

interface User {
  username: string;
  role: "admin" | "recruiter" | "job-seeker" | "pre-university";
}

interface AuthContextType {
  user: User | null;
  login: (username: string, role: User["role"]) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, role: User["role"]) => {
    setUser({ username, role });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
