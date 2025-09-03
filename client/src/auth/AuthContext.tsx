import React, { createContext, useState, useContext } from "react";
import { AuthService } from "../services/AuthService";
import type { LoginRequest, RegisterRequest, AuthResponse } from "../services/AuthService";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "recruiter" | "job-seeker" | "pre-university" | "user";
}

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginRequest) => Promise<AuthResponse>;
  register: (userData: RegisterRequest) => Promise<AuthResponse>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response: AuthResponse = await AuthService.login(credentials);
      
      const userData: User = {
        id: response.userId,
        name: response.name,
        email: response.email,
        role: response.role as User["role"],
      };
      
      setUser(userData);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response: AuthResponse = await AuthService.register(userData);
      
      const newUser: User = {
        id: response.userId,
        name: response.name,
        email: response.email,
        role: response.role as User["role"],
      };
      
      setUser(newUser);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
