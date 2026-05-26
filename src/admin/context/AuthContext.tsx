import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AdminUser } from "../types";
import { getToken, setToken, clearToken } from "../api/client";
import * as authApi from "../api/auth";

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_KEY = "admin_user";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // App ochilganda localStorage'dan user/token tiklab olamiz
    const token = getToken();
    const savedUser = localStorage.getItem(USER_KEY);
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        clearToken();
        localStorage.removeItem(USER_KEY);
      }
    }
    setLoading(false);
  }, []);

  async function login(username: string, password: string): Promise<void> {
    const res = await authApi.login(username, password);
    setToken(res.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    setUser(res.user);
  }

  async function logout(): Promise<void> {
    try {
      await authApi.logout();
    } catch (err) {
      console.warn("Logout API failed:", err);
    } finally {
      clearToken();
      localStorage.removeItem(USER_KEY);
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}