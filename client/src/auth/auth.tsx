import React, { createContext, useState } from "react";

const API_BASE_URL = 'http://localhost:8081/api';

// Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface AuthResponse {
  message: string;
  userId: number;
  role: string;
  email: string;
  name: string;
}

export interface User {
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

// Auth Service (inline)
class AuthService {
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed. Please check your credentials.');
    }
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Registration failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed. Please try again.');
    }
  }
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

// Provider Component
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
