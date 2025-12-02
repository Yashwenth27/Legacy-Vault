// [ID: A9J2K1L] - Auth Context Provider
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (token: string, userData: any) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // [ID: B8M4N5P] - Check LocalStorage on Load
  useEffect(() => {
    const storedToken = localStorage.getItem("lv_token");
    const storedUser = localStorage.getItem("lv_user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // [ID: C3Q9R8T] - Login Action
  const login = (newToken: string, newUser: any) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("lv_token", newToken);
    localStorage.setItem("lv_user", JSON.stringify(newUser));
    router.push("/dashboard"); // Redirect to Dashboard
  };

  // [ID: D6S2T4V] - Logout Action
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("lv_token");
    localStorage.removeItem("lv_user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};